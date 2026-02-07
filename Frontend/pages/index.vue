<template>
  <AppLayout>
    <TemplatePageContent :key="'home'" slug="/" />
  </AppLayout>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Home',
  description: 'Nuxt + Sanity template — edit content in Sanity Studio.',
})
</script>
