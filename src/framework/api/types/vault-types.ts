export interface CreateVaultDto {
  vaultId: string;
  ownerCapId: string;
  beneficiaries: string[];
  inactivityPeriod: number;
}

export interface HeartbeatDto {
  vaultId: string;
  signature: string;
}

export interface DepositIntentDto {
  vaultId: string;
}

export interface ClaimVaultDto {
  vaultId: string;
  beneficiaryAddress: string;
}

export interface VaultStatusResponse {
  vaultId: string;
  status: string;
  lastHeartbeat: string;
  // Añadir más según sea necesario tras ver la respuesta real
}
