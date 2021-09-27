export enum Scope {
  ORG = 'organization',
  REPO = 'repository'
}

export function getOwnerAndRepo(str: string): [string, string] {
  const [owner, repo] = str.split('/', 2)
  return [owner, repo]
}

export async function scopeIsValid(scope: string): Promise<boolean> {
  return Object.values(Scope).includes(scope as Scope)
}
