'use strict';

const assert = require('chai').assert;
const rp = require('request-promise');

/**
 * Factory
 */
module.exports = function(apiUrl){
    assert.isOk(apiUrl, 'apiUrl should be defined');

    return api;

    /**
     * Request api path
     * @params {String} method HTTP verb
     * @params {String} path
     * @params {Object} req
     * @params {Object} req.headers Normally used to set authorization header
     * @params {Object} req.body
     * @params {Object} req.qs
     * @return {Object} Response body
     */
    function *api(method, path, req){

        const options = {
            json: true,
            method,
            uri: `${apiUrl}${path}`
        };
        if(req && req.headers) options.headers = req.headers;
        if(req && req.body) options.body = req.body;
        if(req && req.qs) options.qs = req.qs;

        return yield rp(options);
    }
    Object.defineProperty(api, 'success', { value: apiSuccess });
    Object.defineProperty(api, 'notSuccess', { value: apiNotSuccess });

};

/**
 * Request api path and expect to have isSuccess=true
 * @example Raw response and the returning result object
 * {
 *  result: {
 *      isSuccess: true,
 *      result: { ... } // return this
 *  }
 * }
 *
 * @params {String} method HTTP verb
 * @params {String} path
 * @params {Object} req
 * @params {Object} req.headers
 * @params {Object} req.body
 * @params {Object} req.qs
 * @return {Object} result object
 */
function *apiSuccess(method, path, req){
    const api = this;
    const ret = yield api(method, path, req);

    assert.isOk(ret.result.isSuccess, 'api return isSuccess = true');
    return ret.result.result;
}

/**
 * Request api path and expect to have isSuccess=false
 * @example Raw response and the returning result object
 * {
 *  result: { // return this
 *      isSuccess: true,
 *      errorMessage: 'some message',
 *      errorData: 'some data',
 *      errorCode: 450
 *  }
 * }
 * @params {String} method HTTP verb
 * @params {String} path
 * @params {Object} req
 * @params {Object} req.headers
 * @params {Object} req.body
 * @params {Object} req.qs
 * @return {Object} With attributes errorMessage, errorData, errorCode
 */
function *apiNotSuccess(method, path, req){
    const api = this;
    const ret = yield api(method, path, req);

    assert.isNotOk(ret.result.isSuccess, 'api return isSuccess = false');
    return ret.result;
}
