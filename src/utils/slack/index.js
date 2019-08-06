'use strict'

const Request = require('request-promise')

module.exports.sendMessage = (hook, pr) =>
  Request(
    {
      url: hook.slack_webhook,
      method: 'POST',
      json: true,
      body: {
        mrkdwn: true,
        attachments: [
          {
            color: 'good',
            pretext: hook.title,
            author_name: pr.sender.login,
            author_link: pr.sender.html_url,
            author_icon: pr.sender.avatar_url,
            title: `Pull Request from ${pr.sender.login}`,
            title_link: pr.pull_request.html_url,
            mrkdwn_in: ['text', 'pretext'],
            text: `Please, review this as soon as possible so we can provide a fast feedback to the candidate.\n*Title*: ${pr.pull_request.title}\n*Branch*: ${pr.pull_request.head.repo.default_branch}\n*Clone*: \`git clone ${pr.pull_request.head.repo.ssh_url}\``
          }
        ]
      }
    })
