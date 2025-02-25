import * as core from '@actions/core'
import {context} from '@actions/github'
import {readFileSync} from 'fs'

export const pullRequestNumber =
  context?.payload?.pull_request?.number ||
  +core.getInput('number', {required: false})

export const repo = buildRepo()
export const header = core.getInput('header', {required: false})
export const append = core.getInput('append', {required: true}) === 'true'
export const recreate = core.getInput('recreate', {required: true}) === 'true'
export const deleteOldComment =
  core.getInput('delete', {required: true}) === 'true'
export const githubToken = core.getInput('GITHUB_TOKEN', {required: true})

export const body = buildBody()

function buildRepo(): {repo: string; owner: string} {
  return {
    owner: context.repo.owner,
    repo: core.getInput('repo', {required: false}) || context.repo.repo
  }
}

function buildBody(): string {
  const path = core.getInput('path', {required: false})
  if (path) {
    try {
      return readFileSync(path, 'utf-8')
    } catch (error) {
      core.setFailed(error.message)
      return ''
    }
  } else {
    return core.getInput('message', {required: false})
  }
}
