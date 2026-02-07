<template>
  <section class="hero-section">
    <div class="hero-content">
      <p v-if="section.accentText?.trim()" class="hero-accent">{{ section.accentText }}</p>
      <h1 v-if="section.title" class="hero-title">{{ section.title }}</h1>
      <p v-if="section.subtext" class="hero-subtitle">{{ section.subtext }}</p>
      <div v-if="section.buttons?.length" class="hero-buttons">
        <template v-for="btn in section.buttons" :key="btn._key">
          <a
            :href="btn.link || '#'"
            :class="[
              'hero-button',
              `hero-button--${btn.variant || 'primary'}`,
              `hero-button--${btn.size || 'md'}`,
            ]"
            :target="btn.openInNewTab ? '_blank' : undefined"
            :rel="btn.openInNewTab ? 'noopener noreferrer' : undefined"
          >
            {{ btn.text }}
          </a>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroSection } from '~/types/sanity'

defineProps<{
  section: HeroSection
}>()
</script>

<style scoped lang="scss">
.hero-section {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  text-align: center;
  padding: vc(60) vc(20);
}

.hero-content {
  max-width: vc(800);
}

.hero-accent {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #667eea;
  margin-bottom: vc(16);
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: vc(20);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  opacity: 0.9;
  margin-bottom: vc(40);
  line-height: 1.6;
  color: #b0b0c0;
}

.hero-buttons {
  display: flex;
  gap: vc(16);
  justify-content: center;
  flex-wrap: wrap;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: vc(8);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.hero-button--sm {
  padding: vc(8) vc(16);
  font-size: 0.875rem;
}

.hero-button--md {
  padding: vc(12) vc(24);
  font-size: 1rem;
}

.hero-button--lg {
  padding: vc(14) vc(28);
  font-size: 1.05rem;
}

.hero-button--primary,
.hero-button--orange {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-button--secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
}

.hero-button--primary:hover,
.hero-button--orange:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}
</style>
