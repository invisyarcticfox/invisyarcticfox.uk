export const prerender = false
import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'


export const GET:APIRoute = async () => {
  const result = await env.DB.prepare('SELECT count FROM boops').first<{count:number}>()
  return Response.json({ count: result?.count ?? 0 })
}

export const POST:APIRoute = async ({ request }) => {
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown'
  const limited = await env.BOOP_RATELIMIT.limit({ key: `boop:${ip}` })
  if (!limited.success) return Response.json({ error: 'Slow down :3' }, { status: 429 })

  const result = await env.DB.prepare('UPDATE boops SET count = count + 1 RETURNING count').first<{count:number}>()
  return Response.json({ count: result?.count ?? 0 })
}