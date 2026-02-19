<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <NuxtLink to="/" class="footer__logo">
          <img v-if="logoPath" :src="logoPath" :alt="logoAlt || 'Logo'">
          <span v-else class="footer__site-name">{{ siteName }}</span>
        </NuxtLink>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-if="description" class="footer__description" v-html="formattedDescription" />
      </div>

      <nav class="footer__nav">
        <div v-for="column in footerColumns" :key="column.title" class="footer__nav-column">
          <h4 class="footer__nav-title">{{ column.title }}</h4>
          <ul class="footer__nav-list">
            <li v-for="link in column.links" :key="link.url" class="footer__nav-item">
              <NuxtLink
                v-if="!link.isExternal"
                :to="link.url || '/'"
                class="footer__nav-link"
              >
                {{ link.label }}
              </NuxtLink>
              <a
                v-else
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="footer__nav-link"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <p v-if="copyright" class="footer__copyright">{{ copyright }}</p>
  </footer>
</template>

<script setup lang="ts">
import type { FooterColumn } from '~/types/sanity'

const { siteSettings } = useSanitySiteSettings()

const defaultFooterColumns: FooterColumn[] = [
  {
    title: 'Links',
    links: [
      { label: 'Blog', url: '/blog', isExternal: false },
    ],
  },
]

const siteName = computed(() => siteSettings.value?.siteName || 'Site')
const logoPath = computed(() => siteSettings.value?.logoPath || '')
const logoAlt = computed(() => siteSettings.value?.logoAlt || 'Logo')
const description = computed(() => siteSettings.value?.footerDescription || '')
const formattedDescription = computed(() => description.value.replace(/\n/g, '<br>'))
const footerColumns = computed(() =>
  siteSettings.value?.footerColumns?.length
    ? siteSettings.value.footerColumns
    : defaultFooterColumns
)
const copyright = computed(() => siteSettings.value?.footerCopyright || '')
</script>

<style lang="scss" src="./index.scss" scoped />
