<template>
  <div class="page-builder">
    <template v-for="(section, index) in sectionsList" :key="section._key ?? `section-${index}`">
      <PagebuilderSectionContentHeading
        v-if="section._type === 'contentBlockHeading'"
        :section="section"
      />
      <PagebuilderSectionContentText
        v-else-if="section._type === 'contentBlockText'"
        :section="section"
      />
      <PagebuilderSectionContentButton
        v-else-if="section._type === 'contentBlockButton'"
        :section="section"
      />
      <PagebuilderSectionContentCard
        v-else-if="section._type === 'contentBlockCard'"
        :section="section"
      />
      <PagebuilderSectionContentCards
        v-else-if="section._type === 'contentBlockCards'"
        :section="section"
      />
      <PagebuilderSectionHero v-else-if="section._type === 'hero'" :section="section" />
      <PagebuilderSectionCallToAction
        v-else-if="section._type === 'callToAction'"
        :section="section"
      />
      <div v-else class="unknown-section">
        <p>Unknown section: {{ section._type }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PageBuilderSection } from '~/types/sanity'

const props = defineProps<{
  sections: PageBuilderSection[] | unknown
}>()

const sectionsList = computed(() => {
  const s = props.sections
  if (Array.isArray(s)) return s as PageBuilderSection[]
  if (s && typeof s === 'object' && Array.isArray((s as { pageBuilder?: unknown }).pageBuilder)) {
    return (s as { pageBuilder: PageBuilderSection[] }).pageBuilder
  }
  return []
})
</script>

<style scoped lang="scss">
.page-builder {
  width: 100%;
}

.unknown-section {
  padding: vc(40);
  background: $color-gray-100;
  text-align: center;
  color: $color-gray-600;
}
</style>
