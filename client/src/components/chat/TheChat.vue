<script setup lang="ts">

import MessagesList from '@/components/chat/MessagesList.vue';
import MessageForm from '@/components/chat/MessageForm.vue';

/*
const socket = useWebSocket();
if (socket.state.connected) {
	socket.chat('Hello World!');
}

const sendMessage = async () => {
	console.log('sendMessage1', socket.state.connected);
	if (socket.state.connected) {
		console.log('sendMessage2');
		console.log(await socket.chat('Hello World!'));
	}
}

onMounted(() => {
	socket.connect();
});
*/
</script>

<template>
	<div class="w-2/6 h-full flex flex-col bg-slate-200">
		<MessagesList class="flex-1 h-full" />
		<MessageForm />
	</div>
</template>

<style scoped>

</style>