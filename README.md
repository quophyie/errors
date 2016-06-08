# @c8/errors
Common error types and utils for use in our components

## Usage
```javascript
'use strict'

const Errors = require('@c8/errors')
const createError = require('create-error')
```

### Throw a custom Error with parameters
```javascript
throw new Errors.TypeError('Error message', {
  myParam1: 'Foo',
  myParam2: 'Bar'
})
```

### Translate your error to Boom error

#### With default mapping
```javascript
let myError = new Errors.TypeError('Message')
let boomErr = Errors.utils.toBoom(myError)
```

#### With custom error and mapping
```javascript
const MyCustomErrors = {
  Err1: createError('Err1'),
  Err2: createError('Err2'),
  Err3: createError('Err3')
}

let myError = new MyCustomErrors.Err1('Message', {
  param1: 'foo'
})

// mapping format: { BoomError: ['CustomError1', 'CustomError2'] }
let boomErr = Errors.utils.toBoom(myError, MyCustomErrors, {
  entityTooLarge: ['Err1', 'Err2'],
  unsupportedMediaType: ['Err3']
})
```

