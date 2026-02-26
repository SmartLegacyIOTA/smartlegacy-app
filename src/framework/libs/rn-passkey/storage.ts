import * as SecureStore from "expo-secure-store";
import type { StoredPasskey } from "./types";

const STORE_CRED_IDS = "passkeycredentialIdb64u"; // Mantenemos la misma key por compatibilidad si es posible, pero ahora guardará JSON
const STORE_PUB33 = "passkeypub33b64";

export async function loadStoredPasskey(): Promise<StoredPasskey | null> {
  const credentialIdsRaw = await SecureStore.getItemAsync(STORE_CRED_IDS);
  const pub33B64 = await SecureStore.getItemAsync(STORE_PUB33);

  if (!credentialIdsRaw || !pub33B64) return null;

  try {
    // Intentar parsear como array (nuevo formato)
    const credentialIdsB64u = JSON.parse(credentialIdsRaw);
    if (Array.isArray(credentialIdsB64u)) {
      return { credentialIdsB64u, pub33B64 };
    }
    // Si no es array, es el formato antiguo (string simple)
    return { credentialIdsB64u: [credentialIdsRaw], pub33B64 };
  } catch {
    // Si falla el parseo, es el formato antiguo
    return { credentialIdsB64u: [credentialIdsRaw], pub33B64 };
  }
}

async function saveStoredPasskey(data: StoredPasskey) {
  // Guardamos siempre como array JSON
  await SecureStore.setItemAsync(
    STORE_CRED_IDS,
    JSON.stringify(data.credentialIdsB64u),
  );
  await SecureStore.setItemAsync(STORE_PUB33, data.pub33B64);
}

/**
 * Añade una nueva credencial al storage sin machacar las anteriores si ya existen para esta cuenta
 */
export async function addStoredPasskey(
  newCredentialIdB64u: string,
  pub33B64: string,
) {
  const existing = await loadStoredPasskey();
  let ids = [newCredentialIdB64u];

  if (existing) {
    // Evitar duplicados
    ids = [...new Set([...existing.credentialIdsB64u, newCredentialIdB64u])];
  }

  await saveStoredPasskey({ credentialIdsB64u: ids, pub33B64 });
}

export async function clearStoredPasskey() {
  await SecureStore.deleteItemAsync(STORE_CRED_IDS);
  await SecureStore.deleteItemAsync(STORE_PUB33);
}
