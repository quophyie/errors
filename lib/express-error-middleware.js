'use strict'
const utils = require('./utils')
const _ = require('lodash')

/**
 * Maps an err to boom errors
 // will map custom errors to boom errors
 // This should be the last middleware in the chain
 /**
 * For example
 *
 * customErrors = {
 *   MyCustomError: createError('MyCustomError')
 * }
 * customMappings = {
 *   badRequest: ['MyCustomError']
 * }
 * @param customErrors
 * @param customMappings
 * @returns {function(*=, *, *, *)}
 */
module.exports = (customErrors, customMappings) => {
  return (err, req, res, next) => {
      // will map custom errors to boom errors
      // This should be the last middleware in the chain
      /**
       * For example
       *
       * customErrors = {
       *   MyCustomError: createError('MyCustomError')
       * }
       * customMappings = {
       *   badRequest: ['MyCustomError']
       * }
       */
    const boomErr = utils.toBoom(err, customErrors, customMappings)
    res.status(boomErr.output.statusCode).json(_.omit(boomErr.output.payload, ['params']))
  }
}
