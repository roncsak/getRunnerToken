import * as core from '@actions/core'
import {Scope, oAuthHasOrgScope, oAuthHasRepoScope} from './utils'

// let oAuthScopes: string[]

export function returnCalculatedScope(scope: string, oAuthScopes: string[]): string {
  switch (scope) {
    case 'automatic':
      if (oAuthHasOrgScope(oAuthScopes)) {
        return Scope.ORG
      } else if (oAuthHasRepoScope(oAuthScopes)) {
        return Scope.REPO
      } else {
        core.setFailed('Invalid scope!')
        return ''
      }
    case Scope.ORG:
      if (oAuthHasOrgScope(oAuthScopes)) {
        return Scope.ORG
      } else {
        core.setFailed('Invalid scope! PAT must have the following scope turned on: admin:org')
        return ''
      }

    case Scope.REPO:
      if (oAuthHasRepoScope(oAuthScopes)) {
        return Scope.REPO
      } else {
        core.setFailed('Invalid scope! PAT must have the following scope turned on: repo')
        return ''
      }
    default:
      core.setFailed('Invalid scope!')
      return ''
  }
}
