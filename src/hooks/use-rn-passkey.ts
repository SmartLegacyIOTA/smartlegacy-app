import {
  ensureIotaPasskeySigner,
  RNPasskeyProvider,
} from "@/src/libs/rn-passkey";
import { useState } from "react";
import { bytesToB64url } from "@/src/libs/rn-passkey/weauthn-b64";

export const useRnPasskey = () => {
  const [isLoadingActionOpen, setIsLoadingActionOpen] = useState(false);

  // ======================
  // Challenge (demo)
  // En prod: SIEMPRE del backend (random + session-bound)
  // ======================
  async function generateChallengeBytes(): Promise<Uint8Array> {
    // demo simple: 32 bytes random
    const rnd = new Uint8Array(32);
    // si tienes polyfill crypto.getRandomValues, úsalo:
    // crypto.getRandomValues(rnd)
    // si no, usa expo-crypto o similar
    for (let i = 0; i < rnd.length; i++)
      rnd[i] = Math.floor(Math.random() * 256);
    return rnd;
  }

  const onOpenPasskeyProvider = async () => {
    setIsLoadingActionOpen(true);
    try {
      const challenge = await generateChallengeBytes();

      const provider = new RNPasskeyProvider();

      const signer = await ensureIotaPasskeySigner({
        challenge: bytesToB64url(challenge),
        provider,
        rpId: process.env.EXPO_PUBLIC_IOTA_RPID || "qa-api.smartlegacy.tech",
        userIdB64u: "dGVzdC11c2VyLWlk", // ideal: id real estable del usuario
        username: "david",
        displayName: "David",
      });

      console.log("IOTA address:", signer.toIotaAddress());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingActionOpen(false);
    }
  };

  return {
    onOpenPasskeyProvider,
    isLoadingActionOpen,
  };
};
