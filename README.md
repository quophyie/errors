# @c8/errors
Common error type in our components

## Usage
- `npm i --save @c8/errors`

- ```javascript
const Errors = require('@c8/errors')

// You will typically be fine just keeping the default mapping
let boomErr = Errors.utils.toBoom(err)

// But you can also specify the second parameter of toBoom() if I don't like the default mapping
let boomErr = Errors.utils.toBoom(err, {
  entityTooLarge: ['FileTooLargeError'],
  unsupportedMediaType: ['TypeError']
})
```

