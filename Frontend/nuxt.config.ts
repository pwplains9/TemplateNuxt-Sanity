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
      const query = '*[_type=="page" && defined(slug.current)]{ "slug": slug.current }'
      const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`
      try {
        const data = (await globalThis.fetch(url).then((r) => r.json())) as { result?: { slug: string }[] }
        const slugs = (data?.result || [])
          .map((d) => d?.slug)
          .filter((s): s is string => Boolean(s) && s !== '/' && s !== 'index')
        nitroConfig.prerender = nitroConfig.prerender || {}
        nitroConfig.prerender.routes = [...(nitroConfig.prerender.routes || []), ...slugs.map((s) => `/${s}`)]
      } catch (e) {
        console.warn('[nuxt] Could not fetch Sanity pages for prerender:', e)
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

  css: ['~/assets/css/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/css/styles/_variables.scss";
            @import "@/assets/css/styles/_functions.scss";
            @import "@/assets/css/styles/_mixins.scss";
          `,
        },
      },
    },
  },

  app: {
    head: {
      title: 'Nuxt + Sanity Template',
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
