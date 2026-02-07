<script setup lang="ts">
interface Props {
  tag?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  color?: 'default' | 'muted'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  size: 'md',
  weight: 'normal',
  align: 'left',
  color: 'default',
})

const classes = computed(() => [
  'v-text',
  `v-text--size-${props.size}`,
  `v-text--weight-${props.weight}`,
  `v-text--align-${props.align}`,
  `v-text--color-${props.color}`,
])
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" src="./index.scss" />
