# @c8/errors
Common error types and utils for use in our components

## Usage
```javascript
'use strict'

const Errors = require('@c8/errors')
```

### Throw a custom Error with parameters
```javascript
throw new Errors.TypeError('Error message', {
  myParam1: 'Foo',
  myParam2: 'Bar'
})
```

### Translate your error to Boom error

#### With defaut mapping
```javascript
let myError = new Errors.TypeError('Message')
let boomErr = Errors.utils.toBoom(myError)
```

#### With custom mapping
```javascript
// mapping format: { BoomError: ['CustomError1', 'CustomError2'] }
let myError = new Errors.TypeError('Message', {
  param1: 'foo'
})

let boomErr = Errors.utils.toBoom(myError, {
  entityTooLarge: ['FileTooLargeError', 'OtherCustomError'],
  unsupportedMediaType: ['TypeError']
})
```

