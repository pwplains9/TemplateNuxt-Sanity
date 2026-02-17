<template>
  <div class="v-loading-spinner">
    <div class="v-loading-spinner__icon" />
    <p v-if="message" class="v-loading-spinner__message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  { message: 'Loading...' },
)
</script>

<style scoped lang="scss">
.v-loading-spinner {
  max-width: vc(600);
  margin: 0 auto;
  padding: vc(60) vc(20);
  text-align: center;
  color: $color-gray-600;
}

.v-loading-spinner__icon {
  width: vc(40);
  height: vc(40);
  border: vc(3) solid $color-gray-300;
  border-top-color: $color-primary;
  border-radius: 50%;
  animation: v-loading-spin 1s linear infinite;
  margin: 0 auto vc(16);
}

.v-loading-spinner__message {
  font-size: vc(14);
}

@keyframes v-loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
