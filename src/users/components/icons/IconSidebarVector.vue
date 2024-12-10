<script setup lang="ts">

withDefaults(defineProps<{'isOpen': boolean}>(), {'isOpen': true})
</script>
<template>
<svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg"
  :class="[$style.vector, {[$style.open]: isOpen}]"
>
  <path d="M1 14L7 7.5L1 1" stroke="#4E4E4E" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</template>
<style module lang="css">
.vector.open {
  transform: rotate(-180deg);
}
</style>