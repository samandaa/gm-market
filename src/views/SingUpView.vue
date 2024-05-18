<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import Loader from '../components/Loader.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref()
const password = ref()

const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
  router.push('/')
}
</script>
<template>
  <div class="wrapper">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <form action="">
      <h1 style="color: azure">Sign Up</h1>
      <div class="input-box">
        <span class="p-inputgroup-addon">
          <i class="bx bxs-user"></i>
        </span>
        <InputText type="email" v-model="email" placeholder="Your Email"></InputText>
      </div>
      <div class="input-box">
        <span class="p-inputgroup-addon">
          <i class="bx bxs-lock-alt"></i>
        </span>
        <InputText type="password" v-model="password" placeholder="Password"></InputText>
      </div>
      <Loader v-if="authStore.loader" />
      <div v-else>
        <Button label="Sign up" @click="signup" class="btn"></Button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.background {
  background-image: url('https://www.teslarati.com/wp-content/uploads/2023/08/tesla-model-s-red-e1692063874544-1024x665.jpeg');
}
</style>
