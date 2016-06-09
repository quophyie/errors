'use strict'

const Boom = require('boom')
const _ = require('lodash')
const Errors = require('./errors')
const defaultMapping = require('./boom-mapping')

/**
Native errors in Node.js:
=========================
<EvalError> : thrown when a call to eval() fails.
<SyntaxError> : thrown in response to improper JavaScript language syntax.
<RangeError> : thrown when a value is not within an expected range
<ReferenceError> : thrown when using undefined variables
<TypeError> : thrown when passing arguments of the wrong type
<URIError> : thrown when a global URI handling function is misused.

// We probably just want to convert these to standard 500
if (
  origErr instanceof EvalError ||
  origErr instanceof SyntaxError ||
  origErr instanceof RangeError ||
  origErr instanceof ReferenceError ||
  origErr instanceof TypeError ||
  origErr instanceof URIError
) {
  return Boom.badImplementation(origErr.message, errParams)
}
*/

/**
 * Merge two error mappings
 * @param  {object} m1
 * @param  {object} m2
 * @returns {object} mergedMappings
 */
const mergeMappings = (m1, m2) => {
  const m1Keys = Object.keys(m1)

  for (let m1Key of m1Keys) {
    if (m2[m1Key]) {
      m2[m1Key] = _.union(m2[m1Key], m1[m1Key])
    } else {
      m2[m1Key] = m1[m1Key]
    }
  }

  return m2
}

module.exports = {
  /**
   * Translates c8 error to boom error based defined mapping or default mapping
   * @param {Error} err Service error
   * @param {object} mapping c8 -> Boom mapping
   * @return {Error} Boom error
   */
  toBoom: (err, customErrors, customMapping) => {
    let mapping = defaultMapping

    // add custom errors, if any. Overwrites default custom errors if duplicate key is specified
    if (typeof customErrors === 'object') _.assignIn(Errors, customErrors)

    // add custom mapping, if any. Overwrites default mapping if duplicate keys are specified
    if (typeof customMapping === 'object') mapping = mergeMappings(defaultMapping, customMapping)

    const origErr = _.cloneDeep(err)
    const errParams = _.omit(err, 'message')

    let boomError = (() => {
      for (let boomErr of Object.keys(mapping)) {
        for (let customErr of mapping[boomErr]) {
          if (Errors[customErr] && origErr instanceof Errors[customErr]) {
            return Boom[boomErr](origErr.message, errParams)
          }
        }
      }
    })() || Boom.wrap(origErr) // defaults to HTTP 500 status

    // Make err.data publicly available so we can send extra intel like custom error codes.
    // err.data can be filled in the last parameter of any Boom function.
    boomError.output.payload.params = errParams

    return boomError
  }
}
