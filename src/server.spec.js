'use strict'

const Request = require('supertest')
const Nock = require('nock')
const Config = require('./config')
const Server = require('./server')
const Stubs = require('./__stubs')

describe('WebHook Server', () => {
  beforeAll(() => {
    Nock.disableNetConnect()
    Nock.enableNetConnect('127.0.0.1')
    Config.hooks.config = JSON.stringify(Stubs.Hooks)
    Server.prepare()
  })

  afterAll(() => {
    Nock.enableNetConnect()
    expect(Nock.isDone()).toBeTruthy()
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
      .send(Stubs.Pr1)
      .expect(204)
  })

  it('should skip all processes when PR User is in skip list from configurations', () =>
    Request(Server.listener())
      .post('/java/prs')
      .send(Stubs.Pr2)
      .expect(204))
})
