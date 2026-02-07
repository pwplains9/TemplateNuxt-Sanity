<script setup lang="ts">
interface Props {
  tag?: 'button' | 'a'
  href?: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'orange' | 'white'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'button',
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
})

const componentTag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return props.tag
})

const componentProps = computed(() => {
  const base: Record<string, unknown> = {}
  if (props.to) {
    base.to = props.to
  } else if (props.href) {
    base.href = props.href
    base.target = props.href.startsWith('http') ? '_blank' : undefined
    base.rel = props.href.startsWith('http') ? 'noopener noreferrer' : undefined
  } else if (props.tag === 'button') {
    base.type = props.type
    base.disabled = props.disabled
  }
  return base
})

const classes = computed(() => [
  'v-button',
  `v-button--variant-${props.variant}`,
  `v-button--size-${props.size}`,
  { 'v-button--disabled': props.disabled, 'v-button--full-width': props.fullWidth },
])
</script>

<template>
  <component :is="componentTag" v-bind="componentProps" :class="classes">
    <slot />
  </component>
</template>

<style lang="scss" src="./index.scss" />
