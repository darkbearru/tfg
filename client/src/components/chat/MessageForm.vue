<script setup lang="ts">

import { ref } from 'vue';
import UserBadge from '@/components/chat/UserBadge.vue';
const message = ref('');

</script>

<template>
	<div class="m-4">
		<div class="relative group flex w-full rounded-xl bg-white  border border-slate-300 items-center text-slate-300
			focus-within:text-slate-500 focus-within:border-slate-400 transition-colors transition-duration-300"
		>
			<UserBadge />
			<input type="text" v-model="message"
			       class="flex-1 pl-16 p-2 text-lg rounded-xl text-slate-800 bg-white border-none focus:ring-0 focus:outline-none"
			/>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="mr-2 text-inherit transition-colors transition-duration-300">
				<path fill="currentColor" d="M20 4v9a4 4 0 0 1-4 4H6.914l2.5 2.5L8 20.914L3.086 16L8 11.086L9.414 12.5l-2.5 2.5H16a2 2 0 0 0 2-2V4z"/>
			</svg>
		</div>
	</div>
</template>

<style scoped>

</style>