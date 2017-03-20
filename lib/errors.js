'use strict'

const createError = require('create-error')

module.exports = {
  SizeError: createError('SizeError'),
  PermissionDeniedError: createError('PermissionDeniedError'),
  NotFoundError: createError('NotFoundError'),
  InvalidInputError: createError('InvalidInputError'),
  TimeoutError: createError('TimeoutError'),
  AlreadyExistsError: createError('AlreadyExistsError'),
  NotImplementedError: createError('AlreadyExistsError'),
  ConnectionRefusedError: createError('ConnectionRefusedError'),
  AddressInUseError: createError('AddressInUseError'),
  ConnectionResetError: createError('ConnectionResetError'),
  BrokenPipeError: createError('BrokenPipeError'),

  /**
   * Thrown when the user tries to perform a transaction with a reached credit limit
   */
  CreditLimitReachedError: createError('CreditLimitReachedError')
}
