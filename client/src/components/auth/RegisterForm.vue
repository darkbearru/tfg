<script setup lang="ts">

import TextField from '@/components/forms/TextField.vue'
import ButtonItem from '@/components/forms/ButtonItem.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { reactive, ref } from 'vue'
import CheckBox from '@/components/forms/CheckBox.vue';
import ButtonLink from '@/components/forms/ButtonLink.vue';
import type { RegisterUserDto } from '../../../../shared/dto/register-user.dto.ts';

const auth = useAuthStore();

const formData = reactive<RegisterUserDto>({
	login: "",
	password: "",
	name: ""
})
const remember = ref(false);

const register = async () => {
	if (!formData.login || !formData.password || !formData.name) return;
	await auth.register(formData, remember.value);
}
</script>

<template>
<form class="w-[320px] bg-slate-200 border border-slate-300 p-8 rounded">
	<TextField label="Name" type="text" v-model.trim="formData.name" placeholder="Your name" class="mb-1.5" required />
	<TextField label="Email" type="email" v-model.trim="formData.login" placeholder="your@email.com" class="mb-1.5" required />
  <TextField label="Password" type="password" v-model.trim="formData.password" class="mb-1.5" required />
	<CheckBox label="Remember me" v-model="remember" />
	<div class="flex items-center w-full mt-2 gap-2">
		<div class="w-1/2 flex items-stretch">
			<ButtonLink href="/"> Login </ButtonLink>
		</div>
		<div class="w-1/2 flex items-stretch justify-end">
			<ButtonItem title="Register" type="submit" @click.prevent="register" />
		</div>
	</div>
</form>
</template>

<style scoped>

</style>
