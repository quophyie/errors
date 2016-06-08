'use strict'

const createError = require('create-error')

module.exports = {
  SizeError: createError('SizeError'),
  TypeError: createError('TypeError'),
  ReadError: createError('ReadError'),
  PermissionDeniedError: createError('PermissionDeniedError'),
  NotFoundError: createError('NotFoundError'),
  NotUpdatedError: createError('NotUpdatedError'),
  NotRemovedError: createError('NotRemovedError'),
  InvalidInputError: createError('InvalidInputError'),
  TimeoutError: createError('TimeoutError'),
  AlreadyExistsError: createError('AlreadyExistsError')
}
