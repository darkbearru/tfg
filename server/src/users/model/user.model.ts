import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

export class UserStats {
	@Prop()
	gamesWin: number;

	@Prop()
	gamesLose: number;

	@Prop()
	messagesTotal: number;
}

@Schema({ timestamps: true, _id: true })
export class UserModel {
	@Prop({ unique: true })
	email: string;

	@Prop()
	name: string;

	@Prop()
	imageUrl: string;

	@Prop()
	passwordHash: string;

	@Prop()
	isActive: boolean;

	@Prop()
	refreshToken: string;

	@Prop({ type: () => UserStats, _id: false })
	stats: UserStats;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
