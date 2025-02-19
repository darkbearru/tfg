<script setup lang="ts">

import FormInputItem from '@/components/forms/FormInputItem.vue'
import FormButtonItem from '@/components/forms/FormButtonItem.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { ref } from 'vue'

const auth = useAuthStore();

const email = ref('');
const password = ref('');

const login = async () => {
  if (!email.value || !password.value) return;
  await auth.login(email.value, password.value);
}
</script>

<template>
<form class="w-[320px] bg-slate-200 border border-slate-300 p-8 rounded">
  <FormInputItem label="Email" name="email" type="email" v-model.trim="email" placeholder="your@email.com" required />
  <FormInputItem label="Password" name="password" type="password"  v-model.trim="password" required />
  <FormButtonItem title="Login" type="submit" @click.prevent="login" />
</form>
</template>

<style scoped lang="postcss">

</style>
