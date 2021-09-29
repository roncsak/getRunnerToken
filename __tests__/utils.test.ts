// import * as core from '@actions/core'
import {
  getOwnerAndRepo,
  scopeInputIsValid,
  oAuthHasRepoScope,
  oAuthHasOrgScope
} from '../src/tools/utils'

// test.each([
//   {testString: 'organization', expected: true},
//   {testString: 'repository', expected: true},
//   {testString: 'automatic', expected: true},
//   {testString: 'Repository', expected: false},
//   {testString: '', expected: false}
// ])('testFn()', ({testString, expected}) => {
//   jest.spyOn(core, 'setFailed').mockImplementation(() => {
//     console.log('core setFailed were called')
//   })

//   const isValid = someFn()
//   expect(isValid).toBe(expected)
// })

test('getOwnerAndRepo(octokit/core)', async () => {
  const testString = 'octokit/core'
  const [owner, repo] = getOwnerAndRepo(testString)

  expect(owner).toBe('octokit')
  expect(repo).toBe('core')
})

test.each([
  {testString: 'organization', expected: true},
  {testString: 'repository', expected: true},
  {testString: 'automatic', expected: true},
  {testString: 'Repository', expected: false},
  {testString: '', expected: false}
])('scopeIsValid($testString)', async ({testString, expected}) => {
  const isValid = await scopeInputIsValid(testString)
  expect(isValid).toBe(expected)
})

test.each([
  {testString: ['admin:org', 'repo'], expected: true},
  {testString: ['repo'], expected: true},
  {testString: ['admin:org'], expected: false},
  {testString: [], expected: false}
])('oAuthHasRepoScope($testString)', ({testString, expected}) => {
  const isValid = oAuthHasRepoScope(testString)
  expect(isValid).toBe(expected)
})

test.each([
  {testString: ['admin:org', 'repo'], expected: true},
  {testString: ['repo'], expected: false},
  {testString: ['admin:org'], expected: true},
  {testString: [], expected: false}
])('oAuthHasOrgScope($testString)', ({testString, expected}) => {
  const isValid = oAuthHasOrgScope(testString)
  expect(isValid).toBe(expected)
})
