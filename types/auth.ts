export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokenPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
  company: string;
  iat: number;
  exp: number;
  nonce: string;
}

export interface LoginResult {
  user: SessionUser;
  token: string;
  expiresAt: number;
}

export interface UserPreferences {
  timezone: string;
  notifyByEmail: boolean;
  weeklyDigest: boolean;
  focusGoal: number;
}
