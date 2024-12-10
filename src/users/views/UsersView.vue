<script setup lang="ts">
import AppImgBackground from '@/app/components/AppImgBackground.vue'
import AppLink from '@/app/components/AppLink.vue'
import AppButton from '@/app/components/buttons/AppButton.vue'
import AppInput from '@/app/components/inputs/AppInput.vue'
import router from '@/app/router'
import {getUsers} from '@/users/api'
import SidebarOpenBackground from '@/users/assets/images/SidebarOpenBackground.png'
import IconSidebarVector from '@/users/components/icons/IconSidebarVector.vue'
import SelectedUser from '@/users/components/SelectedUser.vue'
import UsersListItem from '@/users/components/UsersListItem.vue'
import {
	type AdditionalUsersDataInStorage,
	usersListAvailableTabs,
	UsersListAvailableTabs,
	type UserWithAdditionalData
} from '@/users/shared/consts'
import {useStorage} from '@vueuse/core'
import {
	computed,
	ref,
	watch
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

const isSidebarOpen = ref(true)

const users = computed(() => {
	if (!data.value) return []
	return data.value.data
})
const usersWithAdditionalData = computed<(UserWithAdditionalData)[]>(() => {
	const additionalUsersData = useStorage<AdditionalUsersDataInStorage | Record<string, never>>('users', {})

	return users.value.map((user) => {
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

const searchQuery = ref('')
const usersWithAdditionalDataAndFiltered = computed(() => {
	const normalizedSearchQuery = searchQuery.value.toLowerCase()
	return usersWithAdditionalData.value.filter((user) => {
		return (
			user.first_name.toLowerCase().includes(normalizedSearchQuery) ||
			user.last_name.toLowerCase().includes(normalizedSearchQuery)
		)
	})
})
const usersWithAdditionalDataAndFilteredAndSorted = computed(() => {
	switch (tab) {
		case UsersListAvailableTabs.Clients:
			return usersWithAdditionalDataAndFiltered.value.toSorted((a, b) => {
				if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) return -1
				if (a.last_name.toLowerCase() > b.last_name.toLowerCase()) return 1
				return 0
			})
		case UsersListAvailableTabs.Rating:
			return usersWithAdditionalDataAndFiltered.value.toSorted((a, b) => {
				return b.rating - a.rating
			})
		default:
			console.error('wrong param in tab props')
			return []
	}
})

const selectedUser = ref<null | UserWithAdditionalData>(null)
watch([
	() => userId,
	usersWithAdditionalData
], () => {
	if (!userId || !usersWithAdditionalData.value) return
	const user = usersWithAdditionalData.value.find((user) => user.id === userId)
	if (!user) {
		router.push({
			'name': 'Users',
			'params': {tab}
		})
		return
	}
	selectedUser.value = user
})
</script>

<template>
  <div :class="$style['users-view']">
		<div :class="$style['sidebar-wrapper']">
			<aside v-show="isSidebarOpen" :class="$style['sidebar']">
				<div :class="$style['header']">
					<div :class="$style['tabs']">
						<template
							v-for="availableTab in usersListAvailableTabs"
							:key="availableTab"
						>
							<AppLink :to="{
								name: 'Users',
								params: {
									userId,
									tab: availableTab
								}
							}">
								<AppButton :class="[
									'tab-selector',
									{selected: tab === availableTab}
								]">
									{{ availableTab }}
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
					<template v-for="user in usersWithAdditionalDataAndFilteredAndSorted" :key="user.id">
						<AppLink :to="{
							name: 'Users',
							params: {
								userId: user.id,
								tab
							}
						}">
							<UsersListItem
								:avatar="tab === UsersListAvailableTabs.Clients && user.avatar"
								:first_name="user.first_name"
								:last_name="user.last_name"
								:rating="tab === UsersListAvailableTabs.Rating && user.rating"
							/>
						</AppLink>
					</template>
				</div>
				<AppButton
					:class="$style['update-list-button']"
					@click="execute"
				>
					Update List
				</AppButton>
			</aside>
			<AppButton
				:class="$style['slider-switcher-btn']"
				@click="() => isSidebarOpen = !isSidebarOpen"
			>
				<AppImgBackground
					:class="$style['slider-switcher']"
					:src="SidebarOpenBackground"
				>
					<IconSidebarVector :isOpen="isSidebarOpen" />
				</AppImgBackground>
			</AppButton>
		</div>
		<main :class="$style['selected-user']">
			<template v-if="selectedUser">
				<SelectedUser :user="selectedUser" />
			</template>
			<span v-else :class="$style['empty-state']">Select a client</span>

		</main>
	</div>
</template>

<style module lang="css">
.users-view {
  display: flex;
	overflow-x: auto;
}

.sidebar-wrapper{
	display: flex;
  align-items: flex-start;
	position: relative;
	min-height: 100vh;
}
.sidebar {
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 30px;
	flex: 300px 0 1;
	overflow-y: auto;
	min-width: 216px;
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

.slider-switcher-btn{
	outline: none;
	border: none;
	padding: 0;
	position: absolute;
	right: -27px;
	width: 27px;
	height: 36px;
	align-items: center;
	top: 14px;
}
.slider-switcher :global(.background-img) {
  width: 24px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected-user{
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 100% 0 1;
	background-color: lightgray;
	min-width: 500px;
}

.selected-user > .empty-state{
	font-size: 40px;
	font-weight: 700;
}
</style>