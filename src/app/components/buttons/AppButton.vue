<script lang="ts" setup>
interface Props {
	'isDisabled'?: boolean
	'isLoading'?: boolean
}
withDefaults(defineProps<Props>(), {
	'isDisabled': false,
	'isLoading': false
})
</script>
<template>
  <button
    ref="refButton"
    type="button"
    :class="[$style['app-button'], {[$style.loading]: isLoading}]"
    :disabled="isDisabled || isLoading"
  >
    <!-- <img
      v-if="isLoading"
      :class="$style['app-button-loader']"
    > -->
    <div>
      <slot />
    </div>
  </button>
</template>
<style module lang="css">
.app-button {
  position: relative;
  padding: 14px 40px;
  font-weight: 500;
  font-size: 16px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
	cursor: pointer;
	width: 100%;
}

.app-button:disabled {
	pointer-events: none;
}

.app-button-loader {
	position: absolute;
	top: 0;
	left: 50%;
	height: 50%;
	width: auto;
	transform: translate(-50%, 50%);
}

.loading{
	position: absolute;
}
</style>