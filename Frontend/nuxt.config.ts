export default defineNuxtConfig({
  compatibilityDate: '2024-01-01',
  devtools: { enabled: true },
  ssr: true,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      const projectId = process.env.NUXT_PUBLIC_SANITY_PROJECT_ID
      const dataset = process.env.NUXT_PUBLIC_SANITY_DATASET || 'production'
      const apiVersion = process.env.NUXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
      if (!projectId) return
      nitroConfig.prerender = nitroConfig.prerender || {}
      const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`

      try {
        const [pagesRes, postsRes] = await Promise.all([
          globalThis.fetch(`${baseUrl}?query=${encodeURIComponent('*[_type=="page" && defined(slug.current)]{ "slug": slug.current }')}`).then((r) => r.json()),
          globalThis.fetch(`${baseUrl}?query=${encodeURIComponent('*[_type=="post" && defined(slug.current)]{ "slug": slug.current }')}`).then((r) => r.json()),
        ])

        const pageSlugs = ((pagesRes as { result?: { slug: string }[] })?.result || [])
          .map((d) => d?.slug)
          .filter((s): s is string => Boolean(s) && s !== '/' && s !== 'index')

        const postSlugs = ((postsRes as { result?: { slug: string }[] })?.result || [])
          .map((d) => d?.slug)
          .filter((s): s is string => Boolean(s))

        const routes = [
          ...(nitroConfig.prerender.routes || []),
          ...pageSlugs.map((s) => `/${s}`),
          ...postSlugs.map((s) => `/blog/${s}`),
        ]
        nitroConfig.prerender.routes = routes
      } catch (e) {
        console.warn('[nuxt] Could not fetch Sanity routes for prerender:', e)
      }
    },
  },

  modules: ['@nuxtjs/sanity', '@nuxt/eslint'],

  sanity: {
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
  },

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['assets/styles'],
          additionalData: (source: string, ctx: { filename?: string }) => {
            const path = ctx?.filename ?? ''
            if (path.includes('assets/styles')) return source
            return `@use "variables" as *;\n@use "functions" as *;\n@use "mixins" as *;\n${source}`
          },
        },
      },
    },
  },

  app: {
    head: {
      title: 'Nuxt + Sanity Template',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
        },
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
})
