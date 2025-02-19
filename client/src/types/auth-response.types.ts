import type { User } from '@/types/user.types.ts'

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
