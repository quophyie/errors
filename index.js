'use strict'

const Errors = require('./lib/errors')
const utils = require('./lib/utils')
const errorMiddleware = require('./lib/express-error-middleware')

let exp = Errors
exp.utils = utils
exp.expressErrorMiddleware = errorMiddleware

module.exports = exp
