import {
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { USER_NOT_FOUND_ERROR } from '../users/users.contants';
import { compare } from 'bcryptjs';
import { AUTH_NO_ACCESS_ERROR, AUTH_WRONG_PASSWORD_ERROR } from './auth.constants';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, JwtResponse } from '../types/jwt.types';
import { UserDocument } from '../users/model/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {}

	async login({ login, password }: LoginDto): Promise<JwtResponse> {
		const payload: JwtPayload = await this.validateUser(login, password);
		return this.makeTokensAndPayload(payload);
	}

	async register(dto: CreateUserDto): Promise<JwtResponse> {
		const user = await this.usersService.create(dto);
		return this.makeTokensAndPayload(user);
	}

	async logout(id: string) {
		return await this.usersService.update(id, { refreshToken: null });
	}

	async refresh(id: string, refreshToken: string) {
		const user = await this.usersService.findById(id);
		if (!user || !user.refreshToken) throw new ForbiddenException(AUTH_NO_ACCESS_ERROR);

		const isCorrectToken = await compare(refreshToken, user.refreshToken);
		if (!isCorrectToken) throw new ForbiddenException(AUTH_NO_ACCESS_ERROR);

		return this.makeTokensAndPayload(user);
	}

	private async makeTokensAndPayload(user: UserDocument | JwtPayload): Promise<JwtResponse> {
		let payload: JwtPayload;
		if ((user as UserDocument)?.passwordHash) {
			payload = this.makePayload(user as UserDocument);
		} else {
			payload = user as JwtPayload;
		}
		const tokens = await this.getTokens(payload);
		await this.usersService.updateRefreshToken(payload, tokens.refreshToken);

		return { ...tokens, user: payload };
	}

	private makePayload(user: UserDocument): JwtPayload {
		const { id, name, email } = user;
		return { id, name, email };
	}

	private async validateUser(login: string, password: string): Promise<JwtPayload> {
		const user = await this.usersService.findByEmail(login);
		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(AUTH_WRONG_PASSWORD_ERROR);
		}
		return { id: user.id, email: user.email, name: user.name };
	}

	private async getTokens(payload: JwtPayload) {
		const [accessToken, refreshToken] = await Promise.all([
			this.getAccessToken(payload),
			this.getRefreshToken(payload),
		]);
		return {
			accessToken,
			refreshToken,
		};
	}

	private async getAccessToken(payload: JwtPayload) {
		return this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
			expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES'),
		});
	}

	private async getRefreshToken(payload: JwtPayload) {
		return this.jwtService.signAsync(payload, {
			secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
			expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES'),
		});
	}
}
