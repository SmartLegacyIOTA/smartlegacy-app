export type UserStatus = "ACTIVE" | "RECOVERY_MODE" | "DECEASED" | "LOCKED";

export interface UserDto {
  id: string;
  email: string;
  name: string;
  profileImage: string | null;
  picture?: string;
  iotaAddress: string;
  publicKey: string;
  status: UserStatus;
  createdAt: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
  isNew: boolean;
}

export interface OAuthDto {
  code: string;
  // provider: "google" | "apple";
  publicKey?: string;
  iotaAddress?: string;
  signature?: string;
  challenge?: string;
}

export interface RegisterDidDto {
  idToken: string;
  publicKey: string;
  iotaAddress: string;
  signature: string;
  challenge: string;
}

export interface GoogleLoginDto {
  idToken: string;
}
