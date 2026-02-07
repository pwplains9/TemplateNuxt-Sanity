<template>
  <template v-if="pending">
    <div class="template-page__loading">
      <div class="template-page__spinner" />
      <p>Loading...</p>
    </div>
  </template>

  <template v-else-if="error">
    <div class="template-page__error">
      <p>Failed to load page.</p>
    </div>
  </template>

  <template v-else-if="page?.pageBuilder?.length">
    <PageBuilder :sections="page.pageBuilder" />
  </template>

  <div v-else class="template-page__not-found">
    <h1>Page not found</h1>
    <p>This page doesn't exist or has no content.</p>
    <NuxtLink to="/" class="template-page__link">Go to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  slug: string
}>()

const { page, pending, error } = useSanityPage(props.slug || '')

useSeoMeta({
  title: () => page.value?.metadata?.title || page.value?.name || 'Page',
  description: () => page.value?.metadata?.description || '',
})

useHead({
  title: () => page.value?.metadata?.title || page.value?.name || 'Page',
})
</script>

<style scoped lang="scss">
.template-page__loading,
.template-page__error,
.template-page__not-found {
  max-width: vc(600);
  margin: 0 auto;
  padding: vc(60) vc(20);
  text-align: center;
}

.template-page__spinner {
  width: vc(40);
  height: vc(40);
  border: vc(3) solid $color-gray-300;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto vc(16);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.template-page__not-found {
  h1 {
    font-size: vc(24);
    font-weight: 600;
    margin-bottom: vc(8);
  }

  p {
    color: $color-gray-600;
    margin-bottom: vc(24);
  }
}

.template-page__link {
  font-weight: 500;
  color: $color-primary;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>
