<template>
  <section class="content-block content-block--text">
    <div class="container">
      <VText
        :size="section.size || 'md'"
        :align="section.align || 'left'"
        tag="p"
      >
        {{ section.text }}
      </VText>
    </div>
  </section>
</template>

<script setup lang="ts">
import VText from '~/components/ui/VText/VText.vue'
import type { ContentBlockText } from '~/types/sanity'

defineProps<{
  section: ContentBlockText
}>()
</script>

<style scoped lang="scss">
.content-block--text {
  padding: vc(24) 0;
}

.container {
  max-width: vc(1200);
  margin: 0 auto;
  padding: 0 vc(20);
}
</style>
