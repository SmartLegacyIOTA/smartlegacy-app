import { PasskeyKeypair } from "@iota/iota-sdk/keypairs/passkey";
import type { RNPasskeyProvider } from "./RNPasskeyProvider";
import { bytesToB64, b64ToBytes, b64urlToBytes } from "./weauthn-b64";
import { normalizePasskeyPublicKeyToCompressed33 } from "./passkey-utils";
import { loadStoredPasskey, saveStoredPasskey } from "./storage";

export async function ensureIotaPasskeySigner(params: {
  provider: RNPasskeyProvider;
  challenge: string;
  rpId: string;
  userIdB64u: string;
  username: string;
  displayName: string;
}) {
  const { provider, rpId, userIdB64u, username, displayName, challenge } =
    params;

  const stored = await loadStoredPasskey();

  // 1) Try get
  if (stored) {
    const credId = b64urlToBytes(stored.credentialIdB64u);
    const pub33 = b64ToBytes(stored.pub33B64);

    const assertion = await provider.get({
      rpId,
      challengeB64u: challenge,
      allowCredentialIdsB64u: [stored.credentialIdB64u],
    });

    if (assertion) return new PasskeyKeypair(pub33, provider as any, credId);
  }

  // 2) Create
  const registration = await provider.create({
    rpId,
    challengeB64u: challenge,
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
