<template>
  <AppLayout>
    <div class="post-page">
      <div class="container">
        <NuxtLink to="/blog" class="back-link">← Back to Blog</NuxtLink>

        <article v-if="pending" class="loading">
          <div class="loading__spinner" />
          <p>Loading...</p>
        </article>

        <article v-else-if="error" class="error">
          <p>Error loading post</p>
        </article>

        <article v-else-if="post" class="post">
          <header class="post-header">
            <h1>{{ post.title }}</h1>
            <div class="post-meta">
              <span>{{ post.author || 'Author' }}</span>
              <span>{{ formatDate(post.publishedAt) }}</span>
            </div>
          </header>

          <div v-if="imageUrl" class="post-image">
            <img :src="imageUrl" :alt="post.mainImage?.alt || post.title || ''">
          </div>

          <div v-if="post.body?.length" class="post-body">
            <SanityContent :blocks="post.body" :serializers="serializers" />
          </div>
          <div v-else-if="post.excerpt" class="post-body">
            <p>{{ post.excerpt }}</p>
          </div>
        </article>

        <article v-else class="not-found">
          <h2>Post not found</h2>
          <NuxtLink to="/blog">Return to Blog</NuxtLink>
        </article>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { h } from 'vue'

const route = useRoute()
const slug = route.params.slug as string

const { post, pending, error } = useSanityPost(slug)

const serializers = {
  types: {
    image: (props: { asset?: { url?: string }; alt?: string }) =>
      props.asset?.url
        ? h('img', { src: props.asset.url, alt: props.alt || '', class: 'post-body__image' })
        : null,
  },
}

const imageUrl = computed(() => {
  const img = post.value?.mainImage
  if (img?.asset?.url) return img.asset.url
  if (img && 'url' in img && typeof (img as { url?: string }).url === 'string') {
    return (img as { url: string }).url
  }
  return null
})

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

useHead({
  title: () => `${post.value?.title || 'Post'} | Blog`,
})
</script>

<style scoped lang="scss">
.post-page {
  min-height: 100vh;
  padding: vc(40) 0;
}

.back-link {
  display: inline-block;
  margin-bottom: vc(32);
  font-size: vc(14);
  color: $color-gray-600;
  text-decoration: none;
  &:hover {
    color: $color-primary;
  }
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: vc(60) vc(20);
  color: $color-gray-600;
}

.loading__spinner {
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

.post {
  max-width: vc(720);
  margin: 0 auto;
}

.post-header {
  margin-bottom: vc(24);
}

.post-header h1 {
  font-size: vc(32);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: vc(12);
}

.post-meta {
  font-size: vc(14);
  color: $color-gray-500;
}

.post-image {
  margin-bottom: vc(32);
  border-radius: vc(12);
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: auto;
  display: block;
}

.post-body {
  font-size: vc(16);
  line-height: 1.7;
  color: $color-gray-800;
}

.post-body :deep(p) {
  margin-bottom: vc(20);
}

.post-body :deep(h2) {
  font-size: vc(24);
  font-weight: 600;
  margin-top: vc(32);
  margin-bottom: vc(12);
}

.post-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: vc(8);
  margin: vc(24) 0;
}

.post-body :deep(blockquote) {
  margin: vc(24) 0;
  padding: vc(16) vc(20);
  background: $color-gray-100;
  border-left: 4px solid $color-primary;
  border-radius: 0 vc(8) vc(8) 0;
}
</style>
