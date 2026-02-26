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
  iotaAddress?: string;
  publicKey: string | null;
  status: UserStatus;
  nextStep: NextStep;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponseDto {
  accessToken: string;
  user: UserDto;
  isNew: boolean;
}

export interface WebAuthnChallengeDto {
  challengeId: string;
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

export interface BackendAuthVerifyDto {
  challengeId: string;
  id: string;
  rawId: string;
  response: {
    clientDataJSON: string;
    authenticatorData: string;
    signature: string;
    userHandle?: string | null;
  };
}

export function toBackendAuthVerifyDto(args: {
  challengeId: string;
  assertion: WebAuthnVerifyDto;
}): BackendAuthVerifyDto {
  const { challengeId, assertion } = args;

  const id = assertion.id ?? assertion.rawId;
  const rawId = assertion.rawId ?? assertion.id;

  if (!id || !rawId) throw new Error("Missing id/rawId in passkey assertion");
  if (!assertion.response?.clientDataJSON)
    throw new Error("Missing clientDataJSON");
  if (!assertion.response?.authenticatorData)
    throw new Error("Missing authenticatorData");
  if (!assertion.response?.signature) throw new Error("Missing signature");

  return {
    challengeId,
    id,
    rawId,
    response: {
      clientDataJSON: assertion.response.clientDataJSON,
      authenticatorData: assertion.response.authenticatorData,
      signature: assertion.response.signature,
      userHandle: assertion.response.userHandle ?? null,
    },
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
