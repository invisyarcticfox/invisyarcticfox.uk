import { Octokit } from 'octokit'


const octokit = new Octokit({
  auth: import.meta.env.GH_API_TOKEN,
  userAgent: 'invisyarcticfox/website/getCommitInfo',
  timeZone: 'Europe/London'
})

export async function getCommitInfo():Promise<{sha:string, url:string} | null> {
  try {
    const { data:[d] } = await octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: 'invisyarcticfox',
      repo: 'website',
      headers: { 'X-Github-Api-Version': '2022-11-28' }
    })

    checkAuth()
    return { sha:d.sha.slice(0,7), url:d.html_url }
  } catch (error) { console.error(error); return null }
}

async function checkAuth() {
  try {
    const { data } = await octokit.request('GET /user')
    console.log(`Authed as ${data.login}.`)
  } catch (error) { console.error(error) }
}