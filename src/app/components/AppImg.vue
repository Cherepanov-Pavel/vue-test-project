<script lang="ts" setup>
import {ref} from 'vue'

interface Props {
	'imgSrc'?: string
	'isLoading'?: boolean
}
withDefaults(defineProps<Props>(), {'isLoading': false})

const imageVersion = ref('1')
const onError = (event: Event) => {
	console.error(event)
}

</script>
<template>
	<img
		v-if="imgSrc"
		:src="`${imgSrc}?v=${imageVersion}`"
		referrerpolicy="no-referrer"
		draggable="false"
		@error="onError"
	>
	<!-- <Loader
		v-else
	/> -->
</template>
<style module lang="css">
</style>