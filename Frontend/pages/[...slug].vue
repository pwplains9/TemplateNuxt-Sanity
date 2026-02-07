<template>
  <AppLayout>
    <div class="template-page">
      <TemplatePageContent :key="pageSlug" :slug="pageSlug" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const route = useRoute()

const slugParam = route.params.slug
const pageSlug = computed(() => {
  if (!slugParam) return ''
  const parts = Array.isArray(slugParam) ? slugParam : [String(slugParam)]
  return parts.filter(Boolean).join('/').replace(/\/+$/, '').replace(/^\/+/, '') || ''
})
</script>

<style scoped lang="scss">
.template-page {
  min-height: 60vh;
  padding: vc(40) 0;
}
</style>
