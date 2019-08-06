'use strict'

const Request = require('supertest')
const Nock = require('nock')
const Config = require('./config')
const Server = require('./server')

const HooksStub = require('./__stubs/hooks.sample')
const PrStub = require('./__stubs/pr')

describe('WebHook Server', () => {
  beforeAll(() => {
    Nock.disableNetConnect()
    Nock.enableNetConnect('127.0.0.1')
    Config.hooks.config = JSON.stringify(HooksStub)
    Server.prepare()
  })

  afterAll(() => {
    Nock.enableNetConnect()
    Nock.cleanAll()
  })

  it('should return 200 (OK) when GET /health', () =>
    Request(Server.listener())
      .get('/health')
      .expect(200))

  it('should return 204(No Content) when POST with Open/Reopened PR', () => {
    Nock('https://api.github.com')
      .post('/repos/vitorsalgado/backend-code-challenge-proposal/issues/4/labels')
      .reply(200)

    Nock('https://test-slack-webhook')
      .post('/')
      .reply(200)

    return Request(Server.listener())
      .post('/java/prs')
      .send(PrStub)
      .expect(204)
  })
})
