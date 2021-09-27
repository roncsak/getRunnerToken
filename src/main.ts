import * as core from '@actions/core'
import * as github from '@actions/github'
import {getOwnerAndRepo, scopeIsValid, Scope} from './tools/utils'
import {RegistrationResponse} from './types/main'

const [owner, repo] = getOwnerAndRepo(process.env.GITHUB_REPOSITORY as string)
const token: string = core.getInput('token', {required: true})
const scope: string = core.getInput('scope', {required: true})
const octokit = github.getOctokit(token, {
  log: console
})

async function run(): Promise<void> {
  if (!scopeIsValid(scope)) {
    core.setFailed('Invalid scope!')
  }
  const response: RegistrationResponse = await getRegistrationToken()
  // try {
  //   if (scope == Scope.ORG) {
  //     const {data} = await octokit.rest.actions.createRegistrationTokenForOrg({org: owner})
  //     octokit.log.debug(JSON.stringify(data, null, 2))
  //   } else if (scope == Scope.REPO) {
  //     const {data} = await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
  //     octokit.log.debug(JSON.stringify(data, null, 2))
  //   } else {
  //     core.setFailed('Invalid scope!')
  //   }
  // } catch (error) {
  //   octokit.log.debug(`${error}`)
  // }
  core.setOutput('token', response.token)
  core.setOutput('expires_at', response.expires_at)
  octokit.log.debug('The token is valid for: hh:mm')
}

async function getRegistrationToken(): Promise<RegistrationResponse> {
  // const data: RegistrationResponse = { token: "", expires_at: "" }
  try {
    const {data} =
      scope === Scope.ORG
        ? await octokit.rest.actions.createRegistrationTokenForOrg({org: owner})
        : await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
    return data
  } catch (error) {
    core.setFailed('Invalid scope!')
    return {token: '', expires_at: ''}
  }

  // switch (scope) {

  //   case Scope.ORG:
  //     const {data} = await octokit.rest.actions.createRegistrationTokenForOrg({org: owner})
  //     // data.token = response.t
  //     return data
  //   case Scope.REPO:
  //     const {data} = await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
  //     return data
  //   default:
  //     core.setFailed("Invalid scope!")
  //     break;
  // }
  // return data
}

run()
