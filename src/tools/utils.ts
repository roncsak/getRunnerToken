import * as core from '@actions/core'

export enum Scope {
  ORG = 'organization',
  REPO = 'repository',
  AUTO = 'automatic'
}

enum OAuthScope {
  ADMINORG = 'admin:org',
  REPO = 'repo'
}

// let oAuthScopes: string[]

export function oAuthHasRepoScope(scopes: string[]): boolean {
  return scopes.includes(OAuthScope.REPO)
}

export function oAuthHasOrgScope(scopes: string[]): boolean {
  return scopes.includes(OAuthScope.ADMINORG)
}

export function getOwnerAndRepo(str: string): [string, string] {
  const [owner, repo] = str.split('/', 2)
  return [owner, repo]
}

export async function scopeIsValid(scope: string): Promise<boolean> {
  return Object.values(Scope).includes(scope as Scope)
}

export function someFn(): string {
  core.setFailed('invalid scope')
  return ''
}
