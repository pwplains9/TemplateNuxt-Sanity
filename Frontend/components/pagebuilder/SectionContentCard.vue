<template>
  <section class="content-block content-block--card">
    <div class="container">
      <article class="content-card">
        <img
          v-if="section.image?.url"
          :src="section.image.url"
          :alt="section.image.alt || section.title || ''"
          class="content-card__image"
        >
        <div class="content-card__body">
          <VTitle v-if="section.title" tag="h3" size="md" weight="semibold" class="content-card__title">
            {{ section.title }}
          </VTitle>
          <VText v-if="section.text" size="md" class="content-card__text">
            {{ section.text }}
          </VText>
          <VButton
            v-if="section.button?.text"
            :href="section.button.link?.startsWith('http') ? section.button.link : undefined"
            :to="section.button.link?.startsWith('/') ? section.button.link : undefined"
            :variant="section.button.variant === 'orange' ? 'orange' : 'primary'"
            :size="(section.button.size as 'sm' | 'md' | 'lg') || 'sm'"
            :target="section.button.openInNewTab ? '_blank' : undefined"
            :rel="section.button.openInNewTab ? 'noopener noreferrer' : undefined"
          >
            {{ section.button.text }}
          </VButton>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import VTitle from '~/components/ui/VTitle/VTitle.vue'
import VText from '~/components/ui/VText/VText.vue'
import VButton from '~/components/ui/VButton/VButton.vue'
import type { ContentBlockCard } from '~/types/sanity'

defineProps<{
  section: ContentBlockCard
}>()
</script>

<style scoped lang="scss">
.content-block--card {
  padding: vc(24) 0;
}

.container {
  max-width: vc(1200);
  margin: 0 auto;
  padding: 0 vc(20);
}

.content-card {
  background: $color-gray-50;
  border-radius: vc(16);
  overflow: hidden;
  padding: vc(24);
}

.content-card__image {
  width: 100%;
  height: auto;
  max-height: vc(240);
  object-fit: cover;
  border-radius: vc(12);
  margin-bottom: vc(16);
}

.content-card__title {
  margin-bottom: vc(8);
}

.content-card__text {
  margin-bottom: vc(16);
}
</style>
