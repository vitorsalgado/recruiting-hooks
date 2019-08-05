'use strict'

const Github = require('octonode')
const Config = require('../../config')
const GithubApi = Github.client(Config.github.token)

module.exports.addIssueLabel = pr =>
  GithubApi
    .issue(Config.hooks.java.repo, pr.number)
    .addLabelsAsync(Config.hooks.java.labels)
