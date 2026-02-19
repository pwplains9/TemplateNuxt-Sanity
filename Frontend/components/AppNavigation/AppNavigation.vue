<template>
  <nav class="navigation">
    <div class="navigation__container">
      <div class="navigation__content">
        <NuxtLink to="/" class="navigation__logo">
          <img v-if="logoPath" :src="logoPath" :alt="logoAlt || 'Logo'">
          <span v-else class="navigation__site-name">{{ siteName }}</span>
        </NuxtLink>

        <ul class="navigation__menu">
          <li v-for="item in navItems" :key="item.url" class="navigation__menu-item">
            <NuxtLink
              v-if="!item.isExternal"
              :to="item.url || '/'"
              class="navigation__menu-link"
            >
              {{ item.label }}
            </NuxtLink>
            <a
              v-else
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="navigation__menu-link"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <div class="navigation__right">
          <VButton
            v-if="ctaText"
            :to="ctaLink?.startsWith('/') ? ctaLink : undefined"
            :href="ctaLink && !ctaLink.startsWith('/') ? ctaLink : undefined"
            variant="ghost"
            size="sm"
          >
            {{ ctaText }}
          </VButton>
          <button class="navigation__toggle" aria-label="Toggle menu" @click="toggleMobileMenu">
            <span class="navigation__toggle-line" />
            <span class="navigation__toggle-line" />
            <span class="navigation__toggle-line" />
          </button>
        </div>
      </div>

      <ul v-if="mobileMenuOpen" class="navigation__menu navigation__menu--mobile">
        <li v-for="item in navItems" :key="`mobile-${item.url}`" class="navigation__menu-item">
          <NuxtLink
            v-if="!item.isExternal"
            :to="item.url || '/'"
            class="navigation__menu-link"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </NuxtLink>
          <a
            v-else
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="navigation__menu-link"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import VButton from '~/components/ui/VButton/VButton.vue'
import type { NavItem } from '~/types/sanity'

const { siteSettings } = useSanitySiteSettings()

const mobileMenuOpen = ref(false)

const defaultNavItems: NavItem[] = [
  { label: 'Blog', url: '/blog', isExternal: false },
]

const siteName = computed(() => siteSettings.value?.siteName || 'Site')
const logoPath = computed(() => siteSettings.value?.logoPath || '')
const logoAlt = computed(() => siteSettings.value?.logoAlt || 'Logo')
const navItems = computed(() =>
  siteSettings.value?.mainNavigation?.length
    ? siteSettings.value.mainNavigation
    : defaultNavItems
)
const ctaText = computed(() => siteSettings.value?.headerCtaText || '')
const ctaLink = computed(() => siteSettings.value?.headerCtaLink || '/')

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style lang="scss" src="./index.scss" scoped />
