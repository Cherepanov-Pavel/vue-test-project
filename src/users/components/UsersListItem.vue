<script setup lang="ts">
import type {UserWithAdditionalData} from '@/users/shared/consts'

import AppImg from '@/app/components/AppImg.vue'

// const styleTypes = ['primary', 'secondary'] as const

const {
	avatar,
	first_name,
	last_name,
	rating
} = defineProps<{
	'avatar'?: false | UserWithAdditionalData['avatar']
	'first_name': UserWithAdditionalData['first_name']
	'last_name': UserWithAdditionalData['last_name']
	'rating'?: false | UserWithAdditionalData['rating']
}>()
</script>

<template>
	<div :class="$style['users-list-item']">
		<AppImg v-if="avatar" :imgSrc="avatar" :class="$style['user-avatar']"/>
		<div
			v-else-if="Number.isFinite(rating)"
			:class="$style['rating-wrapper']"
		>
			<span
				:class="$style.rating"
			>
				{{ rating }}
			</span>
		</div>
		<span>{{ first_name }}, {{ last_name }}</span>
		<span :class="$style.arrow">→</span>
	</div>
</template>

<style module lang="css">
.users-list-item{
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 20px;
	border-bottom: 1px solid gray;
	cursor: pointer;
}

.arrow{
	margin-left: auto;
}

.user-avatar{
	border-radius: 28px;
	width: 55px;
}

.rating-wrapper{
	flex-shrink: 0;
	width: 55px;
	aspect-ratio: 1 / 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.rating-wrapper > .rating{
	font-weight: 700;
  font-size: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>