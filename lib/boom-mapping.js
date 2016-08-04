module.exports = {
  forbidden: ['PermissionDeniedError'],
  notFound: ['NotFoundError'],
  conflict: ['AlreadyExistsError'],
  serverTimeout: ['TimeoutError'],
  badRequest: ['InvalidInputError', 'SizeError'],
  notImplemented: ['NotImplementedError'],
  badGateway: ['ConnectionRefusedError', 'AddressInUseError', 'ConnectionResetError', 'BrokenPipeError']
}
