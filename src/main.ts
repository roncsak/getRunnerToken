import * as core from '@actions/core'
import * as github from '@actions/github'
import {getOwnerAndRepo} from './tools/utils'
import {Scope} from './tools/utils'

const [owner, repo] = getOwnerAndRepo(process.env.GITHUB_REPOSITORY as string)
const token: string = core.getInput('token', {required: true})
const scope: string = core.getInput('scope', {required: true})
const octokit = github.getOctokit(token, {
  log: console
})

async function run(): Promise<void> {
  try {
    if (scope == Scope.ORG) {
      const {data} = await octokit.rest.actions.createRegistrationTokenForOrg({org: owner})
      octokit.log.debug(JSON.stringify(data, null, 2))
    } else if (scope == Scope.ORG) {
      const {data} = await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
      octokit.log.debug(JSON.stringify(data, null, 2))
    } else {
      core.setFailed('Invalid scope!')
    }
  } catch (error) {
    octokit.log.debug(`${error}`)
  }
  core.setOutput('token', 'sometoken')
  octokit.log.debug(`${owner}, ${repo}`)
  octokit.log.debug('The token is valid for: hh:mm')
}

run()
