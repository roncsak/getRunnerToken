import * as core from '@actions/core'
import * as github from '@actions/github'
import {getOwnerAndRepo} from './tools/utils'

const [owner, repo] = getOwnerAndRepo(process.env.GITHUB_REPOSITORY as string)
const token: string = core.getInput('token', {required: true})
const scope: string = core.getInput('scope', {required: true})
const octokit = github.getOctokit(token)

async function run(): Promise<void> {
  // try {
  console.log(`${owner}, ${repo}`)
  const {data} = await octokit.rest.actions.createRegistrationTokenForRepo({owner, repo})
  console.log(JSON.stringify(data, null, 2))
  // } catch() {

  // }
  core.setOutput('token', 'sometoken')
  console.log(`${owner}, ${repo}`)
  console.log(JSON.stringify(data, null, 2))
  console.log('The token is valid for: hh:mm')
}

run()
