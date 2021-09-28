import * as core from '@actions/core'
import * as utils from '../src/tools/utils'
import {returnCalculatedScope} from '../src/tools/octokit'

test.each([
  {
    testString: 'automatic',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'automatic',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'automatic',
    isOrgExists: true,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'automatic',
    isOrgExists: true,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'automatic',
    isOrgExists: false,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'automatic',
    isOrgExists: false,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'automatic',
    isOrgExists: false,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'automatic',
    isOrgExists: false,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'organization',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 0,
    expected: 'organization'
  },
  {
    testString: 'organization',
    isOrgExists: true,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    isOrgExists: true,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    isOrgExists: false,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    isOrgExists: false,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    isOrgExists: false,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'organization',
    isOrgExists: false,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'repository',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'repository',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'repository',
    isOrgExists: true,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'repository',
    isOrgExists: true,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'repository',
    isOrgExists: false,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'repository',
    isOrgExists: false,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: 'repository',
    isOrgExists: false,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: true,
    setFailedCalled: 0,
    expected: 'repository'
  },
  {
    testString: 'repository',
    isOrgExists: false,
    oAuthHasOrgScope: false,
    oAuthHasRepoScope: false,
    setFailedCalled: 1,
    expected: ''
  },
  {
    testString: '',
    isOrgExists: true,
    oAuthHasOrgScope: true,
    oAuthHasRepoScope: true,
    setFailedCalled: 1,
    expected: ''
  }
])(
  'returnCalculatedScope($testString) - [existingOrg: $isOrgExists, org:admin: $oAuthHasOrgScope, repo: $oAuthHasRepoScope] => $expected',
  ({testString, isOrgExists, oAuthHasOrgScope, oAuthHasRepoScope, setFailedCalled, expected}) => {
    const spy = jest.spyOn(core, 'setFailed')
    spy.mockImplementation(() => {})
    jest.spyOn(core, 'getInput').mockImplementation(() => {
      return 'ABC'
    })
    jest.spyOn(utils, 'oAuthHasOrgScope').mockReturnValue(oAuthHasOrgScope)
    jest.spyOn(utils, 'oAuthHasRepoScope').mockReturnValue(oAuthHasRepoScope)

    const isValid = returnCalculatedScope(testString, ['mocked out'], isOrgExists)
    expect(isValid).toBe(expected)
    expect(spy).toBeCalledTimes(setFailedCalled)
  }
)
