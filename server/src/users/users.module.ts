import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './model/user.model';
// import { UsersController } from './users.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: UserModel.name,
				schema: UserSchema,
				collection: 'User',
			},
		]),
	],
	providers: [UsersService],
	controllers: [],
	// controllers: [UsersController],
	exports: [UsersService],
})
export class UsersModule {}
