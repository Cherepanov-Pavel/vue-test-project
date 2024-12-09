<script lang="ts" setup>
import {
	computed,
	useAttrs
} from 'vue'
import {
	RouterLink,
	type RouterLinkProps
} from 'vue-router'

defineOptions({'inheritAttrs': false})
const attrs = useAttrs()

interface Props {
	'isDisabled'?: boolean
	'to'?: RouterLinkProps['to']
}
const props = withDefaults(defineProps<Props & RouterLinkProps>(), {'to': ''})

const externalLink = computed<false | string>(() =>
	typeof props.to === 'string' && props.to.startsWith('http') ? props.to : ''
)
</script>

<template>
  <a
    v-if="externalLink"
    :class="[$style['app-link'], {disabled: isDisabled}]"
    target="_blank"
    v-bind="attrs"
    :href="externalLink"
  >
    <slot />
  </a>
  <RouterLink
    v-else
    v-slot="{ href, navigate }"
    v-bind="props"
    custom
  >
    <a
      :class="[$style['app-link'], {disabled: isDisabled}]"
      v-bind="attrs"
      :href
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>
<style module lang="css">
.app-link{
	text-decoration: none;
	color: inherit;
	width: 100%;
}
</style>