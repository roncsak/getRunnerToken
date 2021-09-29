import * as core from '@actions/core'
import {getRegistrationToken} from './tools/octokit'
import {getOwnerAndRepo} from './tools/utils'
import type {RegistrationResponse} from './types/main'

async function run(): Promise<void> {
  const [owner, repo] = getOwnerAndRepo(process.env.GITHUB_REPOSITORY as string)
  const response: RegistrationResponse = await getRegistrationToken(owner, repo)
  core.setOutput('token', response.token)
  core.setOutput('expires_at', response.expires_at)
}

run()
