<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <NuxtLink to="/" class="footer__logo">
          <img v-if="logoPath" :src="logoPath" :alt="logoAlt || 'Logo'">
          <span v-else class="footer__site-name">{{ siteName }}</span>
        </NuxtLink>
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

<style scoped lang="scss">
.footer {
  margin-top: auto;
  padding: vc(48) vc(20);
  border-top: 1px solid $color-border;
}

.footer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: vc(40);
  max-width: vc(1200);
  margin: 0 auto;

  @include devices {
    grid-template-columns: 1fr;
  }
}

.footer__brand {
  max-width: vc(320);
}

.footer__logo {
  display: inline-block;
  margin-bottom: vc(16);
  font-weight: 600;
  color: $color-black;
  text-decoration: none;
}

.footer__site-name {
  color: $color-black;
}

.footer__description {
  font-size: vc(14);
  line-height: 1.6;
  color: $color-gray-600;
  margin: 0;
}

.footer__nav {
  display: flex;
  gap: vc(40);
}

.footer__nav-title {
  font-size: vc(14);
  font-weight: 600;
  color: $color-black;
  margin: 0 0 vc(12);
}

.footer__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__nav-item {
  margin-bottom: vc(8);
}

.footer__nav-link {
  font-size: vc(14);
  color: $color-gray-600;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: $color-primary;
  }
}

.footer__copyright {
  max-width: vc(1200);
  margin: vc(24) auto 0;
  padding-top: vc(24);
  border-top: 1px solid $color-border;
  font-size: vc(12);
  color: $color-gray-500;
  text-align: center;
}
</style>
