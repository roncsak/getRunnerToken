enum OAuthScope {
  ADMINORG = 'admin:org',
  REPO = 'repo'
}

export enum ScopeInput {
  ORG = 'organization',
  REPO = 'repository',
  AUTO = 'automatic'
}

export function getOwnerAndRepo(str: string): [string, string] {
  const [owner, repo] = str.split('/', 2)
  return [owner, repo]
}

export function oAuthHasOrgScope(scopes: string[]): boolean {
  return scopes.includes(OAuthScope.ADMINORG)
}

export function oAuthHasRepoScope(scopes: string[]): boolean {
  return scopes.includes(OAuthScope.REPO)
}

export function scopeInputIsValid(scope: string): boolean {
  return Object.values(ScopeInput).includes(scope as ScopeInput)
}
