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
let boomErr = Errors.utils.toBoom(err)
```

#### With custom mapping
```javascript
let boomErr = Errors.utils.toBoom(err, {
  entityTooLarge: ['FileTooLargeError'],
  unsupportedMediaType: ['TypeError']
})
```

