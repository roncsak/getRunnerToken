import {escapeSpecialHtmlCharacters, getOwnerAndRepo} from '../src/tools/utils'

test('getOwnerAndRepo(octokit/core)', async () => {
  const testString = 'octokit/core'
  const [owner, repo] = getOwnerAndRepo(testString)

  expect(owner).toBe('octokit')
  expect(repo).toBe('core')
})
