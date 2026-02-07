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

<style scoped lang="scss">
.navigation {
  background: $color-white;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid $color-border;
}

.navigation__container {
  max-width: vc(1240);
  margin: 0 auto;
  padding: 0 vc(20);
}

.navigation__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: vc(16) 0;
}

.navigation__logo {
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: $color-black;
}

.navigation__site-name {
  color: $color-black;
}

.navigation__menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: vc(8);
  list-style: none;
  margin: 0;
  padding: 0;

  &--mobile {
    display: none;
    position: static;
    transform: none;
    flex-direction: column;
    padding: vc(16) 0;
    border-top: 1px solid $color-border;

    @media (max-width: 768px) {
      display: flex;
    }
  }

  @media (max-width: 768px) {
    &:not(&--mobile) {
      display: none;
    }
  }
}

.navigation__menu-link {
  font-size: vc(14);
  padding: vc(8) vc(16);
  color: $color-gray-600;
  border-radius: vc(8);
  transition: color 0.2s;

  &:hover,
  &.router-link-active {
    color: $color-black;
  }
}

.navigation__right {
  display: flex;
  align-items: center;
  gap: vc(16);
}

.navigation__toggle {
  display: none;
  flex-direction: column;
  gap: vc(4);
  background: none;
  border: none;
  cursor: pointer;
  padding: vc(8);

  @media (max-width: 768px) {
    display: flex;
  }
}

.navigation__toggle-line {
  width: vc(24);
  height: 2px;
  background: $color-black;
}
</style>
