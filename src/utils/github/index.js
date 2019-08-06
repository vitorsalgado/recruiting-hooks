'use strict'

const Github = require('octonode')
const Config = require('../../config')
const GithubApi = Github.client(Config.github.token)

module.exports.addIssueLabel = (hook, pr) =>
  GithubApi
    .issue(hook.repository, pr.number)
    .addLabelsAsync(Config.hooks.java.labels)
