<template>
  <section class="content-block content-block--button">
    <div class="container" :class="`content-block--align-${section.align || 'left'}`">
      <VButton
        v-if="section.button?.text"
        :href="section.button.link?.startsWith('http') ? section.button.link : undefined"
        :to="section.button.link?.startsWith('/') ? section.button.link : undefined"
        :variant="mapVariant(section.button.variant)"
        :size="(section.button.size as 'sm' | 'md' | 'lg') || 'md'"
        :target="section.button.openInNewTab ? '_blank' : undefined"
        :rel="section.button.openInNewTab ? 'noopener noreferrer' : undefined"
      >
        {{ section.button.text }}
      </VButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import VButton from '~/components/ui/VButton/VButton.vue'
import type { ContentBlockButton } from '~/types/sanity'

defineProps<{
  section: ContentBlockButton
}>()

function mapVariant(v?: string): 'primary' | 'secondary' | 'outline' | 'ghost' | 'orange' | 'white' {
  if (v === 'orange' || v === 'white' || v === 'ghost' || v === 'black') return v as 'orange' | 'white' | 'ghost'
  return 'primary'
}
</script>

<style scoped lang="scss">
.content-block--button {
  padding: vc(24) 0;
}

.container {
  &.content-block--align-center {
    text-align: center;
  }
  &.content-block--align-right {
    text-align: right;
  }
}
</style>
