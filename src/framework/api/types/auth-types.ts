export interface UserDto {
  id: string;
  email: string;
  sub: string;
  picture?: string;
  iotaAddress?: string;
  publicKey?: string;
  hasPasskey: boolean;
  securityLevel: "UNSECURED" | "SECURED";
  isNewDevice: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
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
