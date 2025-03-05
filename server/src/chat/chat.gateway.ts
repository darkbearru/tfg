import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
// import { Logger } from '@nestjs/common';
import { ClientToServerEvents, Message, ServerToClientEvents } from '../types/chat.types';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class ChatGateway {
	@WebSocketServer()
	server: Server = new Server<ServerToClientEvents, ClientToServerEvents>();

	// private logger = new Logger('ChatGateway');

	@SubscribeMessage('chat')
	async handleMessage(@MessageBody() payload: Message): Promise<Message> {
		// this.logger.log(payload);
		console.log(payload);
		this.server.emit('chat', payload); // broadcast messages
		return payload;
	}
}
