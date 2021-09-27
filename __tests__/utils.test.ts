import {getOwnerAndRepo, scopeIsValid, Scope} from '../src/tools/utils'

test('getOwnerAndRepo(octokit/core)', async () => {
  const testString = 'octokit/core'
  const [owner, repo] = getOwnerAndRepo(testString)

  expect(owner).toBe('octokit')
  expect(repo).toBe('core')
})

test('scopeIsValid(organization)', async () => {
  const testString = 'organization'
  const isValid = await scopeIsValid(testString)

  expect(isValid).toBe(true)
})

test('scopeIsValid(repository)', async () => {
  const testString = 'repository'
  const isValid = await scopeIsValid(testString)

  expect(isValid).toBe(true)
})

test('scopeIsValid(Repository)', async () => {
  const testString = 'Repository'
  const isValid = await scopeIsValid(testString)

  expect(isValid).toBe(false)
})

test('scopeIsValid()', async () => {
  const testString = ''
  const isValid = await scopeIsValid(testString)

  expect(isValid).toBe(false)
})
