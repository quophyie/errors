'use strict'

const createError = require('create-error')

module.exports = {
  FileTooLargeError: createError('FileTooLargeError'),
  TypeError: createError('TypeError'),
  ReadError: createError('ReadError'),
  InvalidIdError: createError('InvalidIdError'),
  TokenNotFoundError: createError('TokenNotFoundError'),
  TokenTypeError: createError('TokenTypeError'),
  EmailAlreadyRegisteredError: createError('EmailAlreadyRegisteredError'),
  NotFoundError: createError('NotFoundError'),
  NotUpdatedError: createError('NotUpdatedError'),
  NotRemovedError: createError('NotRemovedError'),
  UserActivatedError: createError('UserActivatedError'),
  UserDeActivatedError: createError('UserDeActivatedError'),
  UserPendingError: createError('UserPendingError'),
  InvalidDataError: createError('InvalidDataError'),
  RecordCreationError: createError('RecordCreationError'),
  InvalidTokenError: createError('InvalidTokenError'),
  TokenExpiredOrRevokedError: createError('ExpiredOrRevokedTokenError'),
  NullOrUndefinedReferenceError: createError('NullOrUndefinedReferenceError'),
  PasswordError: createError('PasswordError'),
  ReactivationPeriodNotElapsedError: createError('ReactivationPeriodNotElapsedError'),
  PermissionNotFoundError: createError('PermissionNotFoundError'),
  InvalidEmail: createError('InvalidEmail'),
  InvalidPasswordError: createError('InvalidPasswordError'),
  InvalidLoginAttempt: createError('InvalidLoginAttempt'),
  ActivationCodeGenerationError: createError('ActivationCodeGenerationError'),
  ActivationCodeError: createError('ActivationCodeError'),
  UnauthorizedError: createError('UnauthorizedError'),
  ConnectionRefused: createError('ConnectionRefused'),

  // ppl-marketplace
  PurseAlreadyExists: createError('PurseAlreadyExists')
}
