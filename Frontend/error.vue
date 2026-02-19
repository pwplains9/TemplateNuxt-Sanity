<template>
  <div class="error-page">
    <div class="error-page__content">
      <h1 class="error-page__title">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
      </h1>
      <p class="error-page__message">
        {{ error?.statusCode === 404 ? 'The page you are looking for does not exist.' : error?.message || 'An unexpected error occurred.' }}
      </p>
      <NuxtLink to="/" class="error-page__link">Go to Home</NuxtLink>
      <button v-if="error" class="error-page__retry" @click="handleError">
        Try again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: { statusCode?: number; message?: string } | null
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped lang="scss">
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: vc(20);
  text-align: center;
}

.error-page__content {
  max-width: vc(500);
}

.error-page__title {
  font-size: vc(28);
  font-weight: 700;
  margin-bottom: vc(16);
  color: $color-black;
}

.error-page__message {
  color: $color-gray-600;
  margin-bottom: vc(24);
  line-height: 1.6;
}

.error-page__link {
  display: inline-block;
  padding: vc(12) vc(24);
  background: $color-primary;
  color: white;
  font-weight: 600;
  border-radius: vc(8);
  text-decoration: none;
  margin-right: vc(12);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.error-page__retry {
  padding: vc(12) vc(24);
  background: $color-gray-200;
  color: $color-gray-800;
  font-weight: 600;
  border-radius: vc(8);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: $color-gray-300;
  }
}
</style>
