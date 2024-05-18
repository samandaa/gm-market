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

const signin = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signin')
  router.push('/')
}

const signup = () => {
  router.push('/signup')
}
</script>

<template>
  
  <div class="wrapper">
    <Message v-if="authStore.error" severity="warn">{{ authStore.error }}</Message>
    <form action="">
      <h1 style="color: azure">Sign In</h1>
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
        <Button label="Signin" @click="signin" class="btn"></Button>
      </div>
      <div class="remember-forgot register-link">
        <p style="position: relative; right: -50px">
          Don't have an account? <a href="" @click="signup"> Register</a>
        </p>
      </div>
    </form>
  </div>
</template>
