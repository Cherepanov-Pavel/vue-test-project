<script lang="ts" setup>
import {
	ref, watch
} from 'vue'

const props = defineProps<{'src': string}>()

const imageDivRef = ref<HTMLDivElement | null>(null)
const isImgLoaded = ref(false)

watch(() => props.src, () => {
	const img = new Image()
	img.src = props.src
	img.onload = () => {
		if (!imageDivRef.value) return
		imageDivRef.value.style.backgroundImage = `url(${props.src})`
		isImgLoaded.value = true
	}
}, {'immediate': true})

defineExpose({
	imageDivRef,
	isImgLoaded
})
</script>

<template>
  <div :class="$style['background-img-container']">
    <div
      ref="imageDivRef"
      :class="$style['background-img']"
    >
      <slot />
    </div>
  </div>
</template>

<style module lang="css">
.background-img-container {
  width: 100%;
  position: relative;
  display: flex;
}
.background-img {
  width: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  max-height: 100%;
  display: flex;
}
.background-img > * {
	width: 100%;
}
</style>