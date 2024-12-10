<script setup lang="ts">
withDefaults(defineProps<{'multiline'?: boolean}>(), {'multiline': false})

const model = defineModel<string>({
	'default': '',
	'required': false
})
</script>

<template>
	<input
		v-if="!multiline"
		v-model="model"
		:class="$style['app-input']"
	>
	<textarea
		v-else
		v-model="model"
		:class="[$style['app-input'], $style.textarea]"
	/>
</template>

<style module lang="css">
.app-input{
	width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  font-size: 16px;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.textarea{
	resize: none;
}
</style>