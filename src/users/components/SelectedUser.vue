<script setup lang="ts">
import type {UserWithAdditionalData} from '@/users/shared/consts'

import AppImg from '@/app/components/AppImg.vue'

// const styleTypes = ['primary', 'secondary'] as const

const {
	avatar,
	comment,
	first_name,
	last_name,
	rating
} = defineProps<{
	'avatar': UserWithAdditionalData['avatar']
	'comment': UserWithAdditionalData['comment']
	'first_name': UserWithAdditionalData['first_name']
	'last_name': UserWithAdditionalData['last_name']
	'rating': UserWithAdditionalData['rating']
}>()
</script>

<template>
	<div :class="$style['selected-user']">
		<div :class="$style['selected-user-details']">
		<AppImg v-if="avatar" :imgSrc="avatar" :class="$style['user-avatar']"/>
		<div class=""
		<span v-else-if="Number.isFinite(rating)" :class="$style.rating">{{rating }}</span>
		<span>{{ first_name }}, {{ last_name }}</span>
		<span :class="$style.arrow">→</span>
		</div>
	</div>
</template>

<style module lang="css">
.selected-user{
	background-color: white;
	padding: 30px;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.selected-user-details{
	display: flex;
	gap: 10px;
}

.selected-user-details-column{
	display: flex;
	flex-direction: column;
}
</style>