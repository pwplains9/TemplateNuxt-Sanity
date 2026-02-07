<script setup lang="ts">
interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'h2',
  size: 'md',
  weight: 'bold',
  align: 'left',
})

const classes = computed(() => [
  'v-title',
  `v-title--size-${props.size}`,
  `v-title--weight-${props.weight}`,
  `v-title--align-${props.align}`,
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" src="./index.scss" />
