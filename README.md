# chai-api
Assertion helper for api testing.

### Features
- Use [chai](http://chaijs.com/api) and [request-promise](https://github.com/request/request-promise).
- Require [mocha-generators](https://www.npmjs.com/package/mocha-generators)
- ES6 generator

### Pre-install
`npm install mocha-generators`

### How to use

```javascript
require('mocha-generators').install();

const assert = require('chai').assert;
const api = require('chai-api')('http://some/api/url');

describe('API tests', function(){
    it('should get result', function*(){
        const req = {
            body: { data: 'value'}
        };
        const result = yield api('GET', '/some/path', req);
        assert.isOk(result, 'result should be defined');
    });

    it('should return isSuccess true', function*(){
        const req = {
            body: { data: 'value'}
        };
        yield api.success('GET', '/some/path', req);
    });
});
```

### APIs

##### api(method, path, req)
A generator to do api call.

##### api.success(method, path, req)
Do api call and assert for `result.isSuccess` be `true`.

##### api.notSuccess(method, path, req)
Do api call and assert for `result.isSuccess` be `false`.

### ToDo
- Able to define expected result schema
