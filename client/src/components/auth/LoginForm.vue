<script setup lang="ts">

import TextField from '@/components/forms/TextField.vue'
import ButtonItem from '@/components/forms/ButtonItem.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { ref } from 'vue'
import CheckBox from '@/components/forms/CheckBox.vue';
import ButtonLink from '@/components/forms/ButtonLink.vue';

const auth = useAuthStore();

const email = ref('');
const password = ref('');
const remember = ref(false);

const login = async () => {
	if (!email.value || !password.value) return;
	await auth.login(email.value, password.value, remember.value);
}
</script>

<template>
<form class="w-[320px] bg-slate-200 border border-slate-300 p-8 rounded">
	<TextField label="Email" type="email" v-model.trim="email" placeholder="your@email.com" class="mb-1.5" required />
  <TextField label="Password" type="password" v-model.trim="password" class="mb-1.5" required />
	<CheckBox label="Remember me" v-model="remember" />
	<div class="flex items-center w-full mt-2 gap-2">
		<div class="w-1/2 flex items-stretch">
			<ButtonItem title="Login" type="submit" @click.prevent="login" />
		</div>
		<div class="w-1/2 flex items-stretch justify-end">
			<ButtonLink href="/register"> Register </ButtonLink>
		</div>
	</div>
</form>
</template>

<style scoped>

</style>
