'use strict'

const createError = require('create-error')

module.exports = {
  SizeError: createError('SizeError'),
  PermissionDeniedError: createError('PermissionDeniedError'),
  NotFoundError: createError('NotFoundError'),
  InvalidInputError: createError('InvalidInputError'),
  TimeoutError: createError('TimeoutError'),
  AlreadyExistsError: createError('AlreadyExistsError'),
  NotImplementedError: createError('AlreadyExistsError')
}
