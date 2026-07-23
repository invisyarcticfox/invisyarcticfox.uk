// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import sitemap from '@astrojs/sitemap'


// https://astro.build/config
export default defineConfig({
  build: { format: 'preserve' },
  trailingSlash: 'never',
  site: 'https://itaf.uk',
  server: { port: 4321, host: true, open: '/' },

  adapter: cloudflare({ imageService: 'compile' }),
  integrations: [ sitemap() ],
  
  fonts: [
    {
      name: 'Roboto',
      cssVariable: '--font-roboto',
      provider: fontProviders.google(),
      fallbacks: [ 'sans-serif' ]
    },
    {
      name: 'Roboto Mono',
      cssVariable: '--font-roboto-mono',
      provider: fontProviders.google(),
      fallbacks: [ 'monospace' ]
    }
  ],

  image: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.itaf.uk' }] }
})