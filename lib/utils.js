'use strict'

const Errors = require('./errors')
const Boom = require('./boom')

const defaultBoomMapping = {
  entityTooLarge: ['FileTooLargeError'],
  unsupportedMediaType: ['TypeError']
}

module.exports = {
  /**
   * Translates c8 error to boom error based defined mapping or default mapping
   * @param {Error} err Service error
   * @param {object} mapping c8 -> Boom mapping
   * @return {Error} Boom error
   */
  toBoom: (err, mapping) => {
    if (typeof mapping !== 'object') mapping = defaultBoomMapping

    let errData = _.cloneDeep(err)
    delete errData.message

    let boomError = (() => {
      for (let boomErr of Object.keys(mapping)) {
        for (let serviceErr of mapping[boomErr]) {
          if (err instanceof Errors[serviceErr]) {
            return Boom[boomErr](err.message, errData)
          }
        }
      }
    })()

    if (!boomError) {
      boomError = Boom.wrap(err)
      boomError.data = errData
    }

    return boomError
  }
}
