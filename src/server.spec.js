'use strict'

const Request = require('supertest')
const Server = require('./server').listener()

describe('WebHook Server', () => {
  it('ensure server is online', () =>
    Request(Server)
      .get('/health')
      .expect(204)
  )
})
