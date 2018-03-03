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
 * @param logger - a logger that can be used to log errors
 * @returns {function(*=, *, *, *)}
 */
module.exports = (customErrors, customMappings, logger) => {
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
    const boomErr = utils.toBoom(err, customErrors, customMappings, logger)
    res.status(boomErr.output.statusCode).json(_.omit(boomErr.output.payload, ['params']))
  }
}
