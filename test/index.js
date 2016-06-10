/* eslint-env mocha */
'use strict'

const chai = require('chai')
const Errors = require('../index')
const createError = require('create-error')
const Boom = require('boom')
const expect = require('chai').expect

chai.should()

const MyCustomErrors = {
  ForbiddenErr: createError('ForbiddenErr'),
  Unauthorized1: createError('Unauthorized1'),
  Unauthorized2: createError('Unauthorized2')
}

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
  unauthorized: ['Unauthorized1', 'Unauthorized2']
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
      expect(boomErr.output.payload.params).to.contain(testParams)
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
})
