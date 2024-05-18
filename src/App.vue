<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem('userTokens'))
  if (tokens) {
    authStore.userInfo.token = tokens.token
    authStore.userInfo.refreshToken = tokens.refreshToken
  }
}

const logout = () => {
  authStore.logout()
  localStorage.removeItem('userTokens')
  router.push('/signin')
}

checkUser()
</script>

<template>
  <div>
    <router-link to="/"></router-link>
    <router-link to="/signin" v-if="!token"></router-link>
    <router-link to="/cars" v-if="token"></router-link>
    <router-link to="/signin" v-if="token" @click.prevent="logout"></router-link>
  </div>

  <RouterView />
</template>
