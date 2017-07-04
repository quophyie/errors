/**
 * Created by dman on 03/07/2017.
 */
'use strict'
const utils = require('./utils')
const _ = require('lodash')

module.exports = (customErrors, customMappings) => {
  return (err, req, res, next) => {
    const boomErr = utils.toBoom(err, customErrors, customMappings)
    res.status(boomErr.output.statusCode).json(_.omit(boomErr.output.payload, ['params']))
  }
}
