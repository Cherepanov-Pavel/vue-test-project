<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import AppLink from '@/app/components/AppLink.vue'
import AppButton from '@/app/components/buttons/AppButton.vue'
import AppInput from '@/app/components/inputs/AppInput.vue'
import {
	getUsers, type User
} from '@/users/api'
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
</script>

<template>
  <div :class="$style['users-view']">
		<div :class="$style['sidebar']">
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
				<div>
					{{ filteredAndSortedUsers }}
				</div>
			</div>
		</div>
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
/* .tabs button {
  width: 100%;
  padding: 10px;
  text-align: left;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.tabs button.active {
  font-weight: bold;
  background-color: #e0e0e0;
}

.client-list {
  margin-top: 20px;
}

.client-list input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.client-list ul {
  list-style: none;
  padding-left: 0;
}

.client-list li {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

.client-list li.selected {
  background-color: #e0e0e0;
}

.client-list img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

.client-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.client-info img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.rating {
  margin: 10px 0;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
} */
</style>