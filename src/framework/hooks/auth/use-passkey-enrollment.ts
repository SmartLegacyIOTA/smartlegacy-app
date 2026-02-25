import * as SecureStore from "expo-secure-store";
import {
  RNPasskeyProvider,
  saveStoredPasskey,
} from "@/src/framework/libs/rn-passkey";
import { useMyApi } from "@/src/framework/api/api-provider";
import { useCurrentUser } from "@/src/framework/providers/user";
import { useState } from "react";
import { toastError, toastSuccess } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import {
  bytesToB64,
  bytesToB64url,
} from "@/src/framework/libs/rn-passkey/weauthn-b64";

async function generateChallengeBytes(): Promise<Uint8Array> {
  // demo simple: 32 bytes random
  const rnd = new Uint8Array(32);
  // si tienes polyfill crypto.getRandomValues, úsalo:
  // crypto.getRandomValues(rnd)
  // si no, usa expo-crypto o similar
  for (let i = 0; i < rnd.length; i++) rnd[i] = Math.floor(Math.random() * 256);
  return rnd;
}

export const usePasskeyEnrollment = () => {
  const api = useMyApi();
  const { user, setUser } = useCurrentUser();
  const { t } = useI18nService();
  const [isEnrollLoading, setIsEnrollLoading] = useState(false);

  const enrollPasskey = async () => {
    try {
      setIsEnrollLoading(true);

      // 1. Obtener challenge del backend
      const challengeData = await api.auth().getRegisterOptions();

      if (!challengeData.user) {
        throw new Error("No user data in challenge");
      }

      const provider = new RNPasskeyProvider();

      // 2. Crear Passkey
      const attestation = await provider.create({
        challengeB64u: challengeData.challenge,
        rpId:
          challengeData.rpId ||
          process.env.EXPO_PUBLIC_IOTA_RPID ||
          "qa-api.smartlegacy.tech",
        user: {
          idB64u: challengeData.user.id,
          name: challengeData.user.name,
          displayName: challengeData.user.name,
        },
      });

      // 3. Verificar y registrar en backend
      const response = await api.auth().verifyRegister(attestation as any);

      if (response.user) {
        // 4. Guardar credentialId localmente
        const pkB64u = attestation.response.getPublicKey?.();
        if (!pkB64u)
          throw new Error("No getPublicKey() from registration response");

        await saveStoredPasskey({
          credentialIdB64u: attestation.rawId,
          pub33B64: pkB64u,
        });

        setUser({
          ...response.user,
          trustedDevices: [],
        });

        toastSuccess(t("biometric.passkeyCreated"));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Enrollment error:", error);
      toastError(t("biometric.passkeyError"));
      return false;
    } finally {
      setIsEnrollLoading(false);
    }
  };

  return { enrollPasskey, isEnrollLoading };
};
