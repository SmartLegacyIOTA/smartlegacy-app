import { PasskeyKeypair } from "@iota/iota-sdk/keypairs/passkey";
import type { RNPasskeyProvider } from "./RNPasskeyProvider";
import {
  bytesToB64,
  bytesToB64url,
  b64ToBytes,
  b64urlToBytes,
} from "./weauthn-b64";
import { normalizePasskeyPublicKeyToCompressed33 } from "./passkey-utils";
import { loadStoredPasskey, saveStoredPasskey } from "./storage";

// ======================
// Challenge (demo)
// En prod: SIEMPRE del backend (random + session-bound)
// ======================
export async function generateChallengeBytes(): Promise<Uint8Array> {
  // demo simple: 32 bytes random
  const rnd = new Uint8Array(32);
  // si tienes polyfill crypto.getRandomValues, úsalo:
  // crypto.getRandomValues(rnd)
  // si no, usa expo-crypto o similar
  for (let i = 0; i < rnd.length; i++) rnd[i] = Math.floor(Math.random() * 256);
  return rnd;
}

export async function ensureIotaPasskeySigner(params: {
  provider: RNPasskeyProvider;
  rpId: string;
  userIdB64u: string;
  username: string;
  displayName: string;
}) {
  const { provider, rpId, userIdB64u, username, displayName } = params;

  const stored = await loadStoredPasskey();

  // 1) Try get
  if (stored) {
    const credId = b64urlToBytes(stored.credentialIdB64u);
    const pub33 = b64ToBytes(stored.pub33B64);

    const challenge = await generateChallengeBytes();
    const assertion = await provider.get({
      rpId,
      challengeB64u: bytesToB64url(challenge),
      allowCredentialIdsB64u: [stored.credentialIdB64u],
    });

    if (assertion) return new PasskeyKeypair(pub33, provider as any, credId);
  }

  // 2) Create
  const challenge = await generateChallengeBytes();
  const registration = await provider.create({
    rpId,
    challengeB64u: bytesToB64url(challenge),
    user: { idB64u: userIdB64u, name: username, displayName },
  });
  if (!registration) throw new Error("Passkeys.create returned null");

  const credIdB64u = registration.rawId;
  const credId = b64urlToBytes(credIdB64u);

  const pkB64u = registration.response.getPublicKey?.();
  if (!pkB64u) throw new Error("No getPublicKey() from registration response");

  const pub33 = normalizePasskeyPublicKeyToCompressed33(b64urlToBytes(pkB64u));

  await saveStoredPasskey({
    credentialIdB64u: credIdB64u,
    pub33B64: bytesToB64(pub33),
  });

  return new PasskeyKeypair(pub33, provider as any, credId);
}
