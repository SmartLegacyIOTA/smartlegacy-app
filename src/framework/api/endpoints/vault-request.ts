import { MyApiRequest } from "../my-api";
import {
  ClaimVaultDto,
  CreateVaultDto,
  DepositIntentDto,
  HeartbeatDto,
  VaultStatusResponse,
} from "../types/vault-types";

export function getVaultModule(request: MyApiRequest) {
  async function createVault(body: CreateVaultDto): Promise<void> {
    await request("/v1/vault/create", "POST", body);
  }

  async function heartbeat(body: HeartbeatDto): Promise<void> {
    await request("/v1/vault/heartbeat", "POST", body);
  }

  async function depositIntent(body: DepositIntentDto): Promise<void> {
    await request("/v1/vault/deposit-intent", "POST", body);
  }

  async function claimIntent(body: ClaimVaultDto): Promise<void> {
    await request("/v1/vault/claim-intent", "POST", body);
  }

  async function getStatus(): Promise<VaultStatusResponse> {
    const response = await request("/v1/vault/status", "GET");
    return response.json();
  }

  return {
    createVault,
    heartbeat,
    depositIntent,
    claimIntent,
    getStatus,
  };
}
