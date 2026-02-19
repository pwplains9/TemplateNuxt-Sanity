<template>
  <ClientOnly>
    <template v-if="pending">
      <VLoadingSpinner message="Loading..." />
    </template>

    <template v-else-if="error">
      <div class="template-page__error">
        <p>Failed to load page.</p>
        <button class="template-page__retry" @click="() => refresh()">Try again</button>
      </div>
    </template>

    <template v-else-if="page?.pageBuilder?.length">
      <PageBuilder :sections="sectionsList" />
    </template>

    <template v-else />

    <template #fallback>
      <VLoadingSpinner message="Loading..." />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import PageBuilder from '~/components/pagebuilder/PageBuilder.vue'
import VLoadingSpinner from '~/components/ui/VLoadingSpinner/VLoadingSpinner.vue'

const props = defineProps<{
  slug: string
}>()

const { page, pending, error, refresh } = useSanityPage(props.slug || '')

const sectionsList = computed(() => {
  const p = page.value
  const list = p?.pageBuilder
  return Array.isArray(list) ? list : []
})

watch([page, pending, error], ([p, isPending, err]) => {
  if (err || isPending) return
  if (!p || !p?.pageBuilder?.length) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
}, { immediate: true })

useSeoMeta({
  title: () => page.value?.metadata?.title || page.value?.name || 'Page',
  description: () => page.value?.metadata?.description || '',
  ogTitle: () => page.value?.metadata?.openGraph?.title || page.value?.metadata?.title || page.value?.name || 'Page',
  ogDescription: () => page.value?.metadata?.openGraph?.description || page.value?.metadata?.description || '',
  ogImage: () => page.value?.metadata?.openGraph?.image?.url || undefined,
  twitterCard: 'summary_large_image',
})

useHead({
  title: () => page.value?.metadata?.title || page.value?.name || 'Page',
})
</script>

<style scoped lang="scss">
.template-page__error {
  max-width: vc(600);
  margin: 0 auto;
  padding: vc(60) vc(20);
  text-align: center;
  color: $color-gray-600;
}

.template-page__retry {
  margin-top: vc(16);
  padding: vc(10) vc(20);
  background: $color-primary;
  color: white;
  font-weight: 500;
  border-radius: vc(8);
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.9;
  }
}
</style>
