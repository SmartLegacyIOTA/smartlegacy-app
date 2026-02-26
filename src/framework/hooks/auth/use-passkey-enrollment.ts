import {
  RNPasskeyProvider,
  saveStoredPasskey,
} from "@/src/framework/libs/rn-passkey";
import { useMyApi } from "@/src/framework/api/api-provider";
import { useCurrentUser } from "@/src/framework/providers/user";
import { useState } from "react";
import { toastError, toastSuccess } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { logger } from "@/src/framework/utils/logger/logger";
import { toBackendAuthVerifyDto } from "@/src/framework/api/types/auth-types";

export const usePasskeyEnrollment = () => {
  const api = useMyApi();
  const { setUser } = useCurrentUser();
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
      const mappedBody = toBackendAuthVerifyDto({
        challengeId: challengeData.challengeId,
        assertion: attestation as any,
      });
      const response = await api.auth().verifyRegister(mappedBody);

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
    } catch (error: any) {
      const log = logger.scope("PASSKEY");
      log.error("Enrollment error", { message: error?.message });
      toastError(t("biometric.passkeyError"));
      return false;
    } finally {
      setIsEnrollLoading(false);
    }
  };

  return { enrollPasskey, isEnrollLoading };
};
