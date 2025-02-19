import { UserModel } from '../users/model/user.model';

export type JwtPayload = Pick<UserModel, 'name' | 'email'> & { id: string };

export type JwtTokens = {
	accessToken: string;
	refreshToken: string;
};

export type JwtResponse = JwtTokens & { user: JwtPayload };
