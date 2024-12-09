<script setup lang="ts">
</script>

<template>
	<div class="app">
		<RouterView v-slot="{ Component }">
			<KeepAlive>
				<component :is="Component" />
			</KeepAlive>
		</RouterView>
	</div>
</template>

<style module lang="css">
.app{
	color: black
}
</style>