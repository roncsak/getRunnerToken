import * as core from '@actions/core'
import * as github from '@actions/github'
import {returnCalculatedScope} from './tools/octokit'
import {getOwnerAndRepo, scopeIsValid, Scope} from './tools/utils'
import {RegistrationResponse} from './types/main'

var oAuthScopes: string[]
const [owner, repo] = getOwnerAndRepo(process.env.GITHUB_REPOSITORY as string)
const token: string = core.getInput('token', {required: true})
const scope: string = core.getInput('scope', {required: true})
const octokit = github.getOctokit(token, {
  log: console
})

async function run(): Promise<void> {
  await getOAuthScopes()
  if (!scopeIsValid(scope)) {
    core.setFailed('Invalid scope!')
  }
  const response: RegistrationResponse = await getRegistrationToken()
  core.setOutput('token', response.token)
  core.setOutput('expires_at', response.expires_at)
}

async function getOAuthScopes(): Promise<void> {
  let scopes: any
  const {headers} = await octokit.request('HEAD /')
  scopes = headers['x-oauth-scopes']?.split(', ')
  if (scopes !== undefined) {
    oAuthScopes = scopes
  }
}

async function getRegistrationToken(): Promise<RegistrationResponse> {
  await getOAuthScopes()
  const calculatedScope = returnCalculatedScope(scope, oAuthScopes)
  try {
    const {data} =
      calculatedScope === Scope.ORG
        ? await octokit.rest.actions.createRegistrationTokenForOrg({org: owner})
        : await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
    return data
  } catch (error) {
    core.setFailed('Invalid scope!')
    return {token: '', expires_at: ''}
  }
}

run()
