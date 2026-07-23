import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { Octokit } from 'octokit'
import type { Gitea } from '~/types/ext'


export const GET:APIRoute = async () => {
  const octokit = new Octokit({ auth: env.GITEA_API_KEY, baseUrl: 'https://git.itaf.uk/api/v1' })
  
  const [latest]:Gitea.Commit[] = (await octokit.request('GET /repos/{owner}/{repo}/commits?sha=v3&limit=5', { owner: 'lucas', repo: 'itaf.uk' })).data
  const [title, ...rest] = latest.commit.message.split(/\n\n+/)

  const formatted = {
    sha: latest.sha,
    url: latest.html_url,
    created: latest.created,
    title: title.trim(),
    description: rest.length > 0 ? rest.join('\n\n').trim() : null
  }
  return Response.json(formatted)
}