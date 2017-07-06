/* eslint-env mocha */
'use strict'

const chai = require('chai')
const Errors = require('../index')
const createError = require('create-error')
const Boom = require('boom')
const RequestPromiseErrors = require('request-promise/errors')
const httpStatus = require('http-status')

chai.should()

const MyCustomErrors = {
  ForbiddenErr: createError('ForbiddenErr'),
  Unauthorized1: createError('Unauthorized1'),
  Unauthorized2: createError('Unauthorized2')
}

// Passport JWT Error
function AuthenticationError (message, status) {
  Error.call(this)
  // Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticationError'
  this.message = message
  this.status = status || 401
}
AuthenticationError.prototype.__proto__ = Error.prototype
// ----------------------------

const testParams = {
  param1: 'test1',
  param2: 'test2'
}

const CustomForbiddenErr = new MyCustomErrors.ForbiddenErr('My forbidden error', testParams)
const CustomUnauthorized1Err = new MyCustomErrors.Unauthorized1('My forbidden error', testParams)
const CustomUnauthorized2Err = new MyCustomErrors.Unauthorized2('My forbidden error', testParams)
const DefaultPermDeniedErr = new Errors.PermissionDeniedError('Test message', testParams)
const BoomGatewayError = new Boom.badGateway('Test message 1', testParams)

const customMapping = {
  forbidden: ['ForbiddenErr'],
  unauthorized: ['Unauthorized1', 'Unauthorized2', 'AuthenticationError']
}

describe('Custom errors', () => {
  describe('Forbidden', () => {
    let boomErr

    before(() => {
      boomErr = Errors.utils.toBoom(CustomForbiddenErr, MyCustomErrors, customMapping)
    })

    it('should be an Error object', () => {
      boomErr.should.be.instanceOf(Error)
    })

    it('should be a Boom error', () => {
      boomErr.should.have.a.property('isBoom', true)
    })

    it('should output 403 status code', () => {
      boomErr.should.have.a.deep.property('output.statusCode', 403)
    })

    it('should output all custom params', () => {
      chai.expect(boomErr.output.payload.params).to.contain(testParams)
    })
  })

  describe('Unauthorized', () => {
    let boomErr1, boomErr2

    before(() => {
      boomErr1 = Errors.utils.toBoom(CustomUnauthorized1Err, MyCustomErrors, customMapping)
      boomErr2 = Errors.utils.toBoom(CustomUnauthorized2Err, MyCustomErrors, customMapping)
    })

    it('should output 401 status code for the first error', () => {
      boomErr1.should.have.a.deep.property('output.statusCode', 401)
    })

    it('should output 401 status code for the second error too', () => {
      boomErr2.should.have.a.deep.property('output.statusCode', 401)
    })
  })

  describe('Default permission denied', () => {
    let boomErr

    before(() => {
      boomErr = Errors.utils.toBoom(DefaultPermDeniedErr, MyCustomErrors, customMapping)
    })

    it('should output 403 status code', () => {
      boomErr.should.have.a.deep.property('output.statusCode', 403)
    })
  })

  describe('Error that is already a Boom error', () => {
    let newBoomErr

    before(() => {
      newBoomErr = Errors.utils.toBoom(BoomGatewayError, MyCustomErrors, customMapping)
    })

    it('should not be changed during conversion', () => {
      newBoomErr.should.be.deep.equal(BoomGatewayError)
    })
  })

  describe('Celebrate ValidationError that is not Boom Error', () => {
    let newBoomErr

    it('should return 400 Forbidden', () => {
      const ValidationError = createError('ValidationError')
      const err = new ValidationError()
      err.isJoi = true
      err.isBoom = false
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', httpStatus.BAD_REQUEST)
      newBoomErr.should.have.a.deep.property('message', `ValidationError`)
    })

    it('should return 401 Unauthorised', () => {
      const err = new RequestPromiseErrors.StatusCodeError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', httpStatus.UNAUTHORIZED)
      newBoomErr.should.have.a.deep.property('message', `401 - "Unauthorized"`)
    })

    it('should return 401 Unauthorised', () => {
      const err = new RequestPromiseErrors.StatusCodeError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', httpStatus.UNAUTHORIZED)
      newBoomErr.should.have.a.deep.property('message', `401 - "Unauthorized"`)
    })
  })

  describe('Request Promise RequestError Conversion', () => {
    let newBoomErr, cause

    it('should return 502 for "ECONNREFUSED" errors', () => {
      cause = {
        code: 'ECONNREFUSED'
      }
      const err = new RequestPromiseErrors.RequestError(cause)
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', 502)
    })

    it('should return 502 Bad Gateway for "EADDRINUSE" errors', () => {
      cause = {
        code: 'EADDRINUSE'
      }
      const err = new RequestPromiseErrors.RequestError(cause)
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', 502)
    })

    it('should return 502 Bad Gateway for "ECONNRESET" errors', () => {
      cause = {
        code: 'ECONNRESET'
      }
      const err = new RequestPromiseErrors.RequestError(cause)
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', 502)
    })

    it('should return 502 Bad Gateway for "EPIPE" errors', () => {
      cause = {
        code: 'EPIPE'
      }
      const err = new RequestPromiseErrors.RequestError(cause)
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', 502)
    })

    it('should return 503, Timeout for "ETIMEDOUT" errors', () => {
      cause = {
        code: 'ETIMEDOUT'
      }
      const err = new RequestPromiseErrors.RequestError(cause)
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', 503)
    })
  })

  describe('Request Promise StatusCodeError Error conversions', () => {
    let newBoomErr

    it('should return 403 Forbidden', () => {
      const err = new RequestPromiseErrors.StatusCodeError(httpStatus.FORBIDDEN, 'Forbidden')
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', httpStatus.FORBIDDEN)
      newBoomErr.should.have.a.deep.property('message', `403 - "Forbidden"`)
    })

    it('should return 401 Unauthorised', () => {
      const err = new RequestPromiseErrors.StatusCodeError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', httpStatus.UNAUTHORIZED)
      newBoomErr.should.have.a.deep.property('message', `401 - "Unauthorized"`)
    })

    it('should return 401 Unauthorised', () => {
      const err = new RequestPromiseErrors.StatusCodeError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      newBoomErr = Errors.utils.toBoom(err)
      newBoomErr.should.have.a.deep.property('output.statusCode', httpStatus.UNAUTHORIZED)
      newBoomErr.should.have.a.deep.property('message', `401 - "Unauthorized"`)
    })
  })

  describe('Passport JWT Auth error handling', () => {
    let err

    before(() => {
      err = Errors.utils.toBoom(new AuthenticationError(401), MyCustomErrors, customMapping)
    })

    it('should return 401', () => {
      err.should.have.a.deep.property('output.statusCode', 401)
    })
  })
})
