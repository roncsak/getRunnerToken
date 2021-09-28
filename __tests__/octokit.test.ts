import * as core from '@actions/core'
import * as utils from '../src/tools/utils'
import {returnCalculatedScope} from '../src/tools/octokit'

test.each([
  {
    testString: 'automatic',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'automatic',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'automatic',
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'automatic',
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'organization',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'organization',
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'repository',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'repository',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'repository',
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'repository',
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: '',
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 1,
    expected: ''
  }
])(
  'returnCalculatedScope($testString) - [org:admin: $oAuthHasOrgScope, repo: $oAuthHasRepoScope] => $expected',
  ({testString, oAuthHasOrgScope, oAuthHasRepoScope, setFailedCalled, expected}) => {
    const spy = jest.spyOn(core, 'setFailed')
    spy.mockImplementation(() => {})
    jest.spyOn(utils, 'oAuthHasOrgScope').mockReturnValue(oAuthHasOrgScope)
    jest.spyOn(utils, 'oAuthHasRepoScope').mockReturnValue(oAuthHasRepoScope)

    const isValid = returnCalculatedScope(testString, ['mocked out'])
    expect(isValid).toBe(expected)
    expect(spy).toBeCalledTimes(setFailedCalled)
  }
)
