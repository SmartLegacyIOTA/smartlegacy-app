import * as SecureStore from "expo-secure-store";
import type { StoredPasskey } from "./types";

const STORE_CRED_ID = "passkeycredentialIdb64u";
const STORE_PUB33 = "passkeypub33b64";

export async function loadStoredPasskey(): Promise<StoredPasskey | null> {
  const credentialIdB64u = await SecureStore.getItemAsync(STORE_CRED_ID);
  const pub33B64 = await SecureStore.getItemAsync(STORE_PUB33);
  if (!credentialIdB64u || !pub33B64) return null;
  return { credentialIdB64u, pub33B64 };
}

export async function saveStoredPasskey(data: StoredPasskey) {
  await SecureStore.setItemAsync(STORE_CRED_ID, data.credentialIdB64u);
  await SecureStore.setItemAsync(STORE_PUB33, data.pub33B64);
}

export async function clearStoredPasskey() {
  await SecureStore.deleteItemAsync(STORE_CRED_ID);
  await SecureStore.deleteItemAsync(STORE_PUB33);
}
