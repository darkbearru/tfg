import type { User } from '@/types/user.types.ts'

export type TAuthSuccessResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type TAuthErrorResponse = {
  message: string;
  statusCode: number;
}


export type TAuthResponse = TAuthSuccessResponse & TAuthErrorResponse;

