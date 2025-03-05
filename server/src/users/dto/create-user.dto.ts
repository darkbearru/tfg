import { IsEmail, IsString, MinLength } from 'class-validator';
import { RegisterUserDto } from '../../shared/dto/register-user.dto';

export class CreateUserDto implements RegisterUserDto {
	@IsString()
	@IsEmail()
	login: string;

	@IsString()
	name: string;

	@IsString()
	@MinLength(5)
	password: string;
}
