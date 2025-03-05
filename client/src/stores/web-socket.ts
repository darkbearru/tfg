import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { io } from 'socket.io-client';

export type TWebSocket = {
	connected: boolean,
	chatEvents: string[][],
	gameEvents: string[][],
}

export const useWebSocket = defineStore('socket', () => {
	const state = reactive<TWebSocket>({
		connected: false,
		chatEvents: [],
		gameEvents: []
	});
	const URL = `ws://${window.location.hostname}:3000`;
	const socket = io(URL);

	socket.on("connect", () => {
		state.connected = true;
		console.log('connected...');
	});

	socket.on("disconnect", () => {
		state.connected = false;
		console.log('disconnected...');
	});

	socket.on("chat", (...args: string[]) => {
		state.chatEvents.push(args);
	});

	socket.on("game", (...args: string[]) => {
		state.gameEvents.push(args);
	});

	async function connect() {
		return socket.connect();
	}
	async function disconnect() {
		return socket.disconnect();
	}

	async function chat(message: string){
		return socket.emit('chat', {
			user: {
				userId: '123',
				userName: 'Alexey',
			},
			timeSent: Date.now(),
			message,
		});
	}

	return { state, socket, connect, disconnect, chat }
});