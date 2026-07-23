export namespace Gitea {
  type Commit = {
    sha: string
    url: string
    created: string
    title: string
    description: string|null
  }

  type Project = {
    title: string
    summary: string
    created: string
    version: string
    branch: string
    languages: string[]
  }
}