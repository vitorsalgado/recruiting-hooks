/* eslint-disable global-require */

'use strict'

describe('Config', () => {
  it('should correctly load configuration', () => {
    const conf = require('./')

    expect(conf.isProduction).toBeFalsy()
    expect(conf.isTest).toBeTruthy()
  })
})
