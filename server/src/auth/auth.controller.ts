import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { SITE_CONTROLLERS, SITE_ROUTES } from '../shared/constants/site-routes.constants';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller(SITE_CONTROLLERS.AUTH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post(SITE_ROUTES.LOGIN)
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: LoginDto) {
		return await this.authService.login(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post(SITE_ROUTES.REGISTER)
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto);
	}

	@UseGuards(AccessTokenGuard)
	@Get(SITE_ROUTES.LOGOUT)
	async logout(@Req() req: Request) {
		return await this.authService.logout(req.user['id']);
	}

	@UseGuards(AccessTokenGuard)
	@Get(SITE_ROUTES.CHECK)
	async check() {
		//@Req() req: Request
		return { message: 'OK', statusCode: HttpStatus.OK };
	}

	@UseGuards(RefreshTokenGuard)
	@Get(SITE_ROUTES.REFRESH)
	refreshTokens(@Req() req: Request) {
		const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
		const userId = req.user['id'];
		return this.authService.refresh(userId, refreshToken);
	}
}
