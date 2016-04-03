'use strict';

const assert = require('chai').assert;
const rp = require('request-promise');

let apiUrl;

module.exports = function(url){
    apiUrl = url;
    return api;

};

/**
 * Request api path
 * @params {String} method HTTP verb
 * @params {String} path
 * @params {Object} req
 * @params {Object} req.headers Normally used to set authorization header
 * @params {Object} req.body
 * @return {Object} Response body
 */
function *api(method, path, req){
    assert.isOk(apiUrl, 'apiUrl should be defined');

    const options = {
        json: true,
        method,
        uri: `${apiUrl}${path}`
    };
    if(req && req.headers) options.headers = req.headers;
    if(req && req.body) options.body = req.body;

    return yield rp(options);
}
Object.defineProperty(api, 'success', { value: apiSuccess });
Object.defineProperty(api, 'notSuccess', { value: apiNotSuccess });


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
 * @return {Object} result object
 */
function *apiSuccess(method, path, req){
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
 * @return {Object} With attributes errorMessage, errorData, errorCode
 */
function *apiNotSuccess(method, path, req){
    const ret = yield api(method, path, req);

    assert.isNotOk(ret.result.isSuccess, 'api return isSuccess = false');
    return ret.result;
}
