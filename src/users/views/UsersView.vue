<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import AppLink from '@/app/components/AppLink.vue'
import AppButton from '@/app/components/buttons/AppButton.vue'
import AppInput from '@/app/components/inputs/AppInput.vue'
import {
	getUsers, type User
} from '@/users/api'
import UsersListItem from '@/users/components/UsersListItem.vue'
import {
	type AdditionalUsersDataInStorage, usersListAvailableTabs,
	UsersListAvailableTabs,
	type UserWithAdditionalData
} from '@/users/shared/consts'
import {
	useLocalStorage, useStorage
} from '@vueuse/core'
import {
	computed,
	ref
} from 'vue'

const {
	tab,
	userId
} = defineProps<{
	'tab': UsersListAvailableTabs
	'userId'?: number
}>()

const {
	data,
	error,
	execute,
	isLoading
} = getUsers()
execute()

const users = computed(() => {
	if (!data.value) return []
	return data.value.data
})

const searchQuery = ref('')
const filteredUsers = computed(() => {
	const normalizedSearchQuery = searchQuery.value.toLowerCase()
	return users.value.filter((user) => {
		return (
			user.first_name.toLowerCase().includes(normalizedSearchQuery) ||
			user.last_name.toLowerCase().includes(normalizedSearchQuery)
		)
	})
})
const filteredUsersWithDataFromLs = computed<(UserWithAdditionalData)[]>(() => {
	const additionalUsersData = useStorage<AdditionalUsersDataInStorage | Record<string, never>>('users', {})

	return filteredUsers.value.map((user) => {
		return {
			...user,
			...(
				(additionalUsersData.value as AdditionalUsersDataInStorage)?.[`${user.id}`] ||
				{
					'comment': '',
					'rating': 0
				}
			)
		}
	})
})
const filteredAndSortedUsers = computed(() => {
	switch (tab) {
		case UsersListAvailableTabs.Clients:
			return filteredUsersWithDataFromLs.value.toSorted((a, b) => {
				if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1
				if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1
				return 0
			})
		case UsersListAvailableTabs.Rating:
			return filteredUsersWithDataFromLs.value.toSorted((a, b) => {
				return b.rating - a.rating
			})
		default:
			console.error('wrong param in tab props')
			return []
	}
})

const selectedUserId = ref<null | User['id']>(null)
</script>

<template>
  <div :class="$style['users-view']">
		<aside :class="$style['sidebar']">
      <div :class="$style['header']">
				<div :class="$style['tabs']">
					<template
						v-for="usersListAvailableTab in usersListAvailableTabs"
						:key="usersListAvailableTab"
					>
						<AppLink :to="{
							name: 'Users',
							params: { userId, tab: usersListAvailableTab }
						}">
							<AppButton :class="[
								'tab-selector',
								{selected: tab === usersListAvailableTab}
							]">
								{{ usersListAvailableTab }}
							</AppButton>
						</AppLink>
					</template>
				</div>
				<AppInput
					v-model="searchQuery"
					placeholder="Enter username to search"
				/>
      </div>
			<div :class="$style['users-list']">
				<template v-for="{id, avatar, first_name, last_name, rating} in filteredAndSortedUsers" :key="id">
					<UsersListItem
						:avatar="tab === UsersListAvailableTabs.Clients && avatar"
						:first_name
						:last_name
						:rating="tab === UsersListAvailableTabs.Rating && rating"
						@click="selectedUserId = id"
					/>
				</template>
			</div>
			<AppButton
				:class="$style['update-list-button']"
				@click="execute"
			>
				Update List
			</AppButton>
		</aside>
		<main :class="$style['selected-user']">
			<span v-if="!selectedUserId" :class="$style['empty-state']">Select a client</span>
		</main>
	</div>
</template>

<style module lang="css">
.users-view {
  display: flex;
}

.sidebar {
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
	height: 100vh;
	display: flex;
	flex-direction: column;
	flex: 300px 0 0;
}

.header{
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.tabs {
	display: flex;
}
.tabs :global(.tab-selector){
	color: black;
	background-color:cadetblue;
	padding: 2px 22px
}
.tabs :global(.tab-selector.selected) {
  background-color: white;
}

.users-list{
	display: flex;
	flex-direction: column;
}

.update-list-button{
	background-color: blue;
	color: white;
	border: none;
	margin-top: auto;
}

.selected-user{
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 100% 0 1;
	background-color: lightgray;
}

.selected-user > .empty-state{
	font-size: 40px;
	font-weight: 700;
}
</style>