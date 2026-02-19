<template>
  <AppLayout>
    <div class="post-page">
      <div class="container">
        <NuxtLink to="/blog" class="back-link">← Back to Blog</NuxtLink>

        <VLoadingSpinner v-if="pending" message="Loading..." />

        <article v-else-if="error" class="post-error">
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

        <template v-else />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { h } from 'vue'
import VLoadingSpinner from '~/components/ui/VLoadingSpinner/VLoadingSpinner.vue'
import { getImageUrl as getImageUrlUtil } from '~/utils/sanity'
import { formatDate } from '~/utils/date'

const route = useRoute()
const slug = route.params.slug as string

const { post, pending, error } = useSanityPost(slug)

watch([post, pending, error], ([p, isPending, err]) => {
  if (err || isPending) return
  if (!p) {
    throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
  }
}, { immediate: true })

const serializers = {
  types: {
    image: (props: { asset?: { url?: string }; alt?: string }) =>
      props.asset?.url
        ? h('img', { src: props.asset.url, alt: props.alt || '', class: 'post-body__image' })
        : null,
  },
}

const imageUrl = computed(() => post.value ? getImageUrlUtil(post.value) : null)

const siteName = 'Blog'
useSeoMeta({
  title: () => `${post.value?.title || 'Post'} | ${siteName}`,
  description: () => post.value?.excerpt || '',
  ogTitle: () => post.value?.title || 'Post',
  ogDescription: () => post.value?.excerpt || '',
  ogImage: () => (post.value ? getImageUrlUtil(post.value) : undefined) || undefined,
  twitterCard: 'summary_large_image',
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

.post-error {
  text-align: center;
  padding: vc(60) vc(20);
  color: $color-gray-600;
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
