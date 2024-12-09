<script setup lang="ts">
import AppLink from '@/app/components/AppLink.vue'
import AppButton from '@/app/components/buttons/AppButton.vue'
import {
	usersListAvailableTabs, UsersListAvailableTabs
} from '@/users/shared/consts'
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

// Types for Client and state
interface Client {
	'avatar': string
	'email': string
	'id': number
	'name': string
}

const clients = ref<Client[]>([
	{
		'avatar': 'https://via.placeholder.com/50',
		'email': 'george@example.com',
		'id': 1,
		'name': 'George Edwards'
	},
	{
		'avatar': 'https://via.placeholder.com/50',
		'email': 'lindsay@example.com',
		'id': 2,
		'name': 'Lindsay Ferguson'
	},
	{
		'avatar': 'https://via.placeholder.com/50',
		'email': 'tobias@example.com',
		'id': 3,
		'name': 'Tobias Funke'
	},
	{
		'avatar': 'https://via.placeholder.com/50',
		'email': 'rachel@example.com',
		'id': 4,
		'name': 'Rachel Howard'
	},
	{
		'avatar': 'https://via.placeholder.com/50',
		'email': 'michael@example.com',
		'id': 5,
		'name': 'Michael Lawson'
	}
])

const selectedClient = ref<Client | null>(null)
const searchQuery = ref('')
const rating = ref(5)
const notes = ref('')

// Computed property for filtering clients based on the search query
const filteredClients = computed(() =>
	clients.value.filter((client) =>
		client.name.toLowerCase().includes(searchQuery.value.toLowerCase())
	)
)

// Methods
const selectClient = (client: Client) => {
	selectedClient.value = client
	notes.value = '' // Clear notes when a new client is selected
}

const updateRating = (amount: number) => {
	rating.value += amount
	if (rating.value < 0) rating.value = 0 // Prevent negative rating
}

const saveClientDetails = () => {
	if (selectedClient.value) {
		// Save logic here (e.g., send the data to the server)
		alert(`Saved: ${selectedClient.value.name} - Rating: ${rating.value} points`)
	}
}

const updateClientList = () => {
	// Client list update logic (e.g., fetching new data from an API)
	alert('Client list updated!')
}
</script>

<template>
  <div :class="$style['users-view']">
		<div :class="$style['sidebar']">
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
      <div v-if="selectedTab === 'clients'" class="client-list">
        <input type="text" v-model="searchQuery" placeholder="Enter username to search" />
        <ul>
          <li
            v-for="client in filteredClients"
            :key="client.id"
            @click="selectClient(client)"
            :class="{ selected: client.id === selectedClient?.id }"
          >
            <img :src="client.avatar" alt="Client Avatar" />
            {{ client.name }}
          </li>
        </ul>
        <button @click="updateClientList">Update list</button>
      </div>
      <div v-if="selectedTab === 'rating'" class="rating-section">
        <!-- Rating content will go here -->
      </div>
    </div>

    <!-- Main content (Client Details) -->
    <div class="main-content">
      <div v-if="selectedClient" class="client-info">
        <img :src="selectedClient.avatar" alt="Client Avatar" class="client-avatar" />
        <h2>{{ selectedClient.name }}</h2>
        <p>{{ selectedClient.email }}</p>
        <div class="rating">
          <button @click="updateRating(-1)">-</button>
          <span>{{ rating }} points</span>
          <button @click="updateRating(1)">+</button>
        </div>
        <textarea v-model="notes" placeholder="Add a note"></textarea>
        <button @click="saveClientDetails">Save</button>
      </div>
    </div>
  </div>
</template>

<style module lang="css">
.users-view {
  display: flex;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.tabs {
	display: flex;
}
.tabs :global(.tab-selector){
	color: black;
	background-color:cadetblue;
}
.tabs :global(.tab-selector.selected) {
  background-color: white;
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