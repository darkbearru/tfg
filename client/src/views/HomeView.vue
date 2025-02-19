<script setup lang="ts">
import LoginForm from '@/components/forms/LoginForm.vue'
import { useAuthStore } from '@/stores/auth.ts'
import router from '@/router'
import { onMounted } from 'vue'

const auth = useAuthStore();

onMounted(async () => {
  await auth.load();
  if (auth.user) await router.push('/main');
})

</script>

<template>
  <main>
    <LoginForm />
  </main>
</template>
