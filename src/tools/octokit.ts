import * as core from '@actions/core'
import * as github from '@actions/github'
import {ScopeInput, oAuthHasOrgScope, oAuthHasRepoScope, scopeInputIsValid} from './utils'
import {RegistrationResponse} from '../types/main'

let oAuthScopes: string[]
const tokenInput: string = core.getInput('token', {required: true})
const scopeInput: string = core.getInput('scope', {required: true})
const octokit = github.getOctokit(tokenInput, {
  log: console
})

export async function getRegistrationToken(
  owner: string,
  repo: string
): Promise<RegistrationResponse> {
  oAuthScopes = await getOAuthScopes()
  const isOrgExists = await isOrganizationExists(owner)
  const calculatedScope = returnCalculatedScope(scopeInput, oAuthScopes, isOrgExists)
  try {
    const {data} =
      calculatedScope === ScopeInput.ORG
        ? await octokit.rest.actions.createRegistrationTokenForOrg({org: owner})
        : await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
    return data
  } catch (error) {
    core.setFailed(`${error} err2`)
    return {token: '', expires_at: ''}
  }
}

async function getOAuthScopes(): Promise<string[]> {
  const {headers} = await octokit.request('HEAD /')
  return headers['x-oauth-scopes']?.split(', ') ?? []
}

async function isOrganizationExists(org: string): Promise<boolean> {
  try {
    await octokit.rest.orgs.get({org})
    return true
  } catch (error) {
    return false
  }
}

export function returnCalculatedScope(
  scope: string,
  tokenScopes: string[],
  isOrganization: boolean
): string {
  if (!scopeInputIsValid(scope)) {
    core.setFailed(`Invalid scope (${scope}) err1!`)
    return ''
  }
  if (isOrganization && oAuthHasOrgScope(tokenScopes) && scope !== ScopeInput.REPO) {
    return ScopeInput.ORG
  } else if (oAuthHasRepoScope(tokenScopes) && scope !== ScopeInput.ORG) {
    return ScopeInput.REPO
  } else {
    core.setFailed(`Invalid scope ${scope}! err2`)
    return ''
  }
}
