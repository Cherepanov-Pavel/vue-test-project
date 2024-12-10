<script setup lang="ts">
import type {
	AdditionalUsersDataInStorage, UserWithAdditionalData
} from '@/users/shared/consts'

import AppImg from '@/app/components/AppImg.vue'
import AppButton from '@/app/components/buttons/AppButton.vue'
import AppInput from '@/app/components/inputs/AppInput.vue'
import {useStorage} from '@vueuse/core'
import {
	ref, watch
} from 'vue'

const {user} = defineProps<{'user': UserWithAdditionalData}>()

const rating = ref(0)
watch(() => user.rating, () => {
	rating.value = user.rating
}, {'immediate': true})
const changeUserRating = (type: 'decrease' | 'increase') => {
	switch (type) {
		case 'decrease':
			if (rating.value <= 0) return
			rating.value -= 1
		case 'increase':
			rating.value += 1
	}
}
const comment = ref('')
watch(() => user.comment, () => {
	comment.value = user.comment
}, {'immediate': true})

const save = () => {
	const additionalUsersData = useStorage<AdditionalUsersDataInStorage>('users', {})
	additionalUsersData.value[`${user.id}`] = {
		'comment': comment.value,
		'rating': rating.value
	}
}
</script>

<template>
	<div :class="$style['selected-user']">
		<div :class="$style['selected-user-details']">
			<AppImg v-if="user.avatar" :imgSrc="user.avatar" :class="$style['user-avatar']"/>
			<div :class="$style['selected-user-details-column']">
				<div :class="$style['name-email']">
					<span :class="$style.name">{{ user.first_name }} {{ user.last_name }}</span>
					<span :class="$style.email">{{ user.email }}</span>
				</div>
				<div :class="$style['rating-counter-wrapper']">
					<AppButton
						:class="$style['change-rating-btn']"
						@click="changeUserRating('decrease')"
					>
						-
					</AppButton>
					<span :class="$style.rating">{{ rating }} points</span>
					<AppButton
						:class="$style['change-rating-btn']"
						@click="changeUserRating('increase')"
					>
						+
					</AppButton>
				</div>
				<AppInput :multiline="true" v-model="comment"/>
			</div>
		</div>
		<AppButton
			:class="$style['save-button']"
			@click="save"
		>
			Save
		</AppButton>
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
	align-items: center;
	gap: 10px;
}

.selected-user-details-column{
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.selected-user-details-column > .name-email{
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.name-email > .name{
	font-size: 30px;
	font-weight: 500;
}

.name-email > .email{
	font-size: 20px;
	font-weight: 300;
}

.rating-counter-wrapper{
	display: flex;
	align-items: center;
	background-color: lightgrey;
}

.rating-counter-wrapper > .change-rating-btn {
	background-color: white;
	padding: 3px;
	flex: 17% 0 1;
	aspect-ratio: 1 / 1;
	align-items: center;
	font-weight: 500;
}

.rating-counter-wrapper > .rating {
	flex: 100% 0 1;
  text-align: center;
}

.save-button{
	background-color: blue;
	color: white;
	border: none;
}
</style>