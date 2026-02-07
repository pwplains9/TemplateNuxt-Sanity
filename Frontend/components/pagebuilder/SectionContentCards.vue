<template>
  <section class="content-block content-block--cards">
    <div class="container">
      <VTitle
        v-if="section.sectionHeading"
        tag="h2"
        size="xl"
        weight="bold"
        class="content-block__heading"
      >
        {{ section.sectionHeading }}
      </VTitle>
      <div class="content-cards-grid">
        <article
          v-for="(card, i) in section.cards"
          :key="card._key || i"
          class="content-card"
        >
          <img
            v-if="card.image?.url"
            :src="card.image.url"
            :alt="card.image.alt || card.title || ''"
            class="content-card__image"
          >
          <div class="content-card__body">
            <VTitle v-if="card.title" tag="h3" size="md" weight="semibold" class="content-card__title">
              {{ card.title }}
            </VTitle>
            <VText v-if="card.text" size="md" class="content-card__text">
              {{ card.text }}
            </VText>
            <VButton
              v-if="card.button?.text"
              :href="card.button.link?.startsWith('http') ? card.button.link : undefined"
              :to="card.button.link?.startsWith('/') ? card.button.link : undefined"
              :variant="card.button.variant === 'orange' ? 'orange' : 'primary'"
              :size="(card.button.size as 'sm' | 'md' | 'lg') || 'sm'"
              :target="card.button.openInNewTab ? '_blank' : undefined"
              :rel="card.button.openInNewTab ? 'noopener noreferrer' : undefined"
            >
              {{ card.button.text }}
            </VButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import VTitle from '~/components/ui/VTitle/VTitle.vue'
import VText from '~/components/ui/VText/VText.vue'
import VButton from '~/components/ui/VButton/VButton.vue'
import type { ContentBlockCards } from '~/types/sanity'

defineProps<{
  section: ContentBlockCards
}>()
</script>

<style scoped lang="scss">
.content-block--cards {
  padding: vc(48) 0;
}

.container {
  max-width: vc(1200);
  margin: 0 auto;
  padding: 0 vc(20);
}

.content-block__heading {
  margin-bottom: vc(32);
}

.content-cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: vc(24);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
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
  max-height: vc(200);
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
