'use strict'

require('dotenv').config()

const Express = require('express')
const BodyParser = require('body-parser')
const Github = require('octonode')
const Request = require('request-promise')
const Config = require('./src/config')

const WebHookServer = Express()
const GithubApi = Github.client(Config.github.token)

WebHookServer.use(BodyParser.json())

WebHookServer
  .post('/java/prs', (req, res) => {
    const pr = req.body
    const user = pr.sender

    const addLabel = GithubApi
      .issue(Config.hooks.java.repo, pr.number)
      .addLabelsAsync(Config.hooks.java.labels)

    const title = 'Java Recruiting Challenge Submission'

    const slackMessage = Request(
      {
        url: Config.slack.hook,
        method: 'POST',
        json: true,
        body: {
          mrkdwn: true,
          attachments: [
            {
              color: 'good',
              pretext: title,
              author_name: user.login,
              author_link: user.html_url,
              author_icon: user.avatar_url,
              title: `Java Challenge PR from ${user.login}`,
              title_link: pr.pull_request.html_url,
              mrkdwn_in: ['text', 'pretext'],
              text: `Please review this as soon possible so we can provide a fast feedback to the candidate.\n*Title*: ${pr.pull_request.title}\n*Branch*: ${pr.pull_request.head.repo.default_branch}\n*Clone*: \`git clone ${pr.pull_request.head.repo.ssh_url}\``
            }
          ]
        }
      })

    return Promise
      .all([addLabel, slackMessage])
      .then(() => res.sendStatus(204))
  })

WebHookServer
  .listen(Config.application.port, () =>
    console.info(`WebHook Server is online on: ${Config.application.port}`))
