export interface LinkStartDto {
  label: string;
}

export interface LinkFinishDto {
  token: string;
  publicKey: string;
  credentialId: string;
  label: string;
}

export interface RenameDeviceDto {
  label: string;
}

export interface DeviceResponse {
  id: string;
  userId: string;
  credentialId: string;
  publicKey: string;
  label: string;
  createdAt: string;
}

export interface ApproveChallengeDto {
  enrollId: string;
}
