# Assertion helper for api testing

Use chai and request-promise.

## How to use

```javascript
var api = require('chai-api');

describe('API test', function(){
    it('should return isSuccess true', function(){
        var req = {
            body: { data: 'value'}
        };
        yiels api.success('GET', '/some/path', req);
    });
});
```
