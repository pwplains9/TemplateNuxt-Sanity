<template>
  <AppLayout>
    <div class="blog-page">
      <div class="container">
        <header class="blog-header">
          <VTitle tag="h1" size="xxl" weight="bold">Blog</VTitle>
          <VText size="md" color="muted" class="blog-subtitle">
            Latest posts
          </VText>
        </header>

        <VLoadingSpinner v-if="pending" message="Loading posts..." />

        <div v-else-if="error" class="blog-error">
          <p>Error loading posts.</p>
        </div>

        <div v-else-if="posts?.length" class="blog-grid">
          <NuxtLink
            v-for="post in posts"
            :key="post._id"
            :to="`/blog/${post.slug?.current || ''}`"
            class="blog-card"
          >
            <div v-if="getImageUrl(post)" class="blog-card__image-wrap">
              <img :src="getImageUrl(post)!" :alt="post.mainImage?.alt || post.title || ''" class="blog-card__image">
            </div>
            <div class="blog-card__body">
              <h2 class="blog-card__title">{{ post.title }}</h2>
              <VText size="sm" color="muted">
                {{ post.excerpt || '' }}
              </VText>
              <div class="blog-card__meta">
                <span>{{ post.author || 'Author' }}</span>
                <span>{{ formatDate(post.publishedAt) }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="blog-empty">
          <p>No posts yet.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import VTitle from '~/components/ui/VTitle/VTitle.vue'
import VText from '~/components/ui/VText/VText.vue'
import { getImageUrl } from '~/utils/sanity'
import { formatDate } from '~/utils/date'

const { posts, pending, error } = useSanityData()

useSeoMeta({
  title: 'Blog',
  description: 'Blog — latest posts',
  ogTitle: 'Blog',
  ogDescription: 'Blog — latest posts',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped lang="scss">
.blog-page {
  min-height: 100vh;
  padding: vc(48) 0;
}

.blog-header {
  margin-bottom: vc(32);
}

.blog-subtitle {
  margin-top: vc(8);
}

.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: vc(24);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.blog-card {
  display: block;
  background: $color-gray-50;
  border-radius: vc(16);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }
}

.blog-card__image-wrap {
  aspect-ratio: 16/10;
  background: $color-gray-200;
}

.blog-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-card__body {
  padding: vc(20);
}

.blog-card__title {
  font-size: vc(18);
  font-weight: 600;
  margin-bottom: vc(8);
  color: $color-black;
}

.blog-card__meta {
  display: flex;
  gap: vc(12);
  margin-top: vc(12);
  font-size: vc(12);
  color: $color-gray-500;
}

.blog-error,
.blog-empty {
  text-align: center;
  padding: vc(60) vc(20);
  color: $color-gray-600;
}
</style>
