export type UserStatus = "ACTIVE" | "RECOVERY_MODE" | "DECEASED" | "LOCKED";
export type DeviceStatus = "TRUSTED" | "NEW" | "PENDING" | "REVOKED";

export type NextStep =
  | "APP"
  | "CREATE_PASSKEY"
  | "DEVICE_APPROVAL"
  | "SIGN_IN"
  | "ERROR";

export interface UserDto {
  id: string;
  email: string;
  name: string;
  profileImage: string | null;
  picture?: string;
  iotaAddress: string;
  publicKey: string;
  status: UserStatus;
  nextStep: NextStep;
  createdAt: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
  isNew: boolean;
}

export interface WebAuthnChallengeDto {
  challenge: string;
  userId: string;
  rpId: string;
  user: UserDto;
}

export interface WebAuthnVerifyDto {
  id: string;
  rawId: string;
  type: string;
  response: {
    clientDataJSON: string;
    authenticatorData: string;
    signature: string;
    userHandle?: string;
    attestationObject?: string;
  };
}

export interface OAuthDto {
  idToken: string;
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
