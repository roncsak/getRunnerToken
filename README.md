[![build-test](https://github.com/roncsak/getRunnerToken/workflows/build-test/badge.svg)](https://github.com/roncsak/getRunnerToken/actions?query=workflow:"build-test")
[![GitHub tag](https://img.shields.io/github/tag/roncsak/getRunnerToken?include_prereleases=&sort=semver&color=2ea44f)](https://github.com/roncsak/getRunnerToken/releases/)
[![License](https://img.shields.io/badge/License-MIT-2ea44f)](#license)
[![issues - getRunnerToken](https://img.shields.io/github/issues/roncsak/getRunnerToken)](https://github.com/roncsak/getRunnerToken/issues)

# Get GitHub Action registration token for self-hosted runners

## Synopsis
To create a self-hosted GitHub Runner it is needed to run a custom script provided by GitHub which registers
a machine as a Runner. For that registration a `registration token` is needed. You can obtain such token
manually in the Settings menu of a repository (or organization).  
However I needed a solution where I can fully automate the process of Runner deployment so I needed a way to
automate token retrieval too.

This GitHub Action retrives a registration token via [Octokit](https://octokit.github.io/) API so you can use
it on your GitHub Action workflow.

## Usage
It is possible to create self-hosted runners for a specific repository or an organization. In latter case
every repository of the given organization can utilize the runner.
This action acquires a registration token based on the scope of your Personal Access Token (PAT). If your PAT
have scopes of both `repo` and `admin:org`, this action will provide a registration token that can be used for
organization level registration. You have to place your PAT to GitHub Secrets of your repository. In case you
want to specify the scope for some reason, you can do it by providing the `scope` in the action.

(One could ask the question: Is it possible to use this with `secrets.GITHUB_TOKEN`? Unfortunately it is not
possible! `GITHUB_TOKEN` has repository level scope, so it can't be used to create organization level runner
registration. Furthermore, this token has no privilage to acquire repository level registration token
neither.)

## Inputs

### `scope`
Specify scope of registration token. Possible values: `automatic`, `organization` or `repository`
**Default:** `automatic`

### `token` (required)
A Personal Access Token (PAT) with the full scope of `repo` OR `admin:org`.

## Outputs

### `expires_at`
The expiration time of the token (usually it expires in one hour).

### `token`
The runner registration token (in the scope provided in input paramaters).

## Example usage

```yaml
- name: Get token for self-hosted runner registration
  uses: roncsak/getRunnerToken@v1.0.0
  id  : runnerRegistration 
  with:
    token: ${{ secrets.PAT }}

- name: Use the token in subsequent steps
  run : |
    echo ${{ steps.runnerRegistration.outputs.token }}
    echo "Your token expire at: ${{ steps.runnerRegistration.outputs.expires_at }}"
```
