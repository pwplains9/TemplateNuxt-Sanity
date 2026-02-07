<template>
  <section :class="['cta-section', `cta-section--${section.variant || 'primary'}`]">
    <div class="container">
      <div class="cta-content">
        <h2 v-if="section.heading" class="cta-title">{{ section.heading }}</h2>
        <p v-if="section.supportingText" class="cta-subtitle">{{ section.supportingText }}</p>
        <div v-if="section.actions?.length" class="cta-buttons">
          <template v-for="action in section.actions" :key="action._key">
            <a
              :href="action.link || '#'"
              :class="[
                'cta-button',
                `cta-button--${action.variant || 'primary'}`,
                `cta-button--${action.size || 'md'}`,
              ]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ action.text }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CallToActionSection } from '~/types/sanity'

defineProps<{
  section: CallToActionSection
}>()
</script>

<style scoped lang="scss">
.cta-section {
  padding: vc(80) vc(20);
}

.cta-section--primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cta-section--secondary {
  background: #1a1a2e;
  color: white;
}

.container {
  max-width: vc(800);
  margin: 0 auto;
}

.cta-content {
  text-align: center;
}

.cta-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: vc(16);
}

.cta-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: vc(32);
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: vc(16);
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: vc(8);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.cta-button--sm {
  padding: vc(8) vc(16);
  font-size: 0.875rem;
}

.cta-button--md {
  padding: vc(12) vc(24);
  font-size: 1rem;
}

.cta-button--lg {
  padding: vc(14) vc(28);
  font-size: 1.05rem;
}

.cta-section--primary .cta-button--primary,
.cta-section--primary .cta-button--orange {
  background: white;
  color: #667eea;
}

.cta-section--secondary .cta-button--primary,
.cta-section--secondary .cta-button--orange {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}
</style>
