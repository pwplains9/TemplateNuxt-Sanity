<template>
  <section class="content-block content-block--heading">
    <div class="container">
      <VTitle
        :tag="(section.tag as 'h1' | 'h2' | 'h3' | 'h4') || 'h2'"
        :size="section.size || 'lg'"
        :align="section.align || 'left'"
        weight="bold"
      >
        {{ section.title }}
      </VTitle>
    </div>
  </section>
</template>

<script setup lang="ts">
import VTitle from '~/components/ui/VTitle/VTitle.vue'
import type { ContentBlockHeading } from '~/types/sanity'

defineProps<{
  section: ContentBlockHeading
}>()
</script>

<style scoped lang="scss">
.content-block--heading {
  padding: vc(32) 0;
}
</style>
