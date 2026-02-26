import {
  RNPasskeyProvider,
  addStoredPasskey,
} from "@/src/framework/libs/rn-passkey";
import { useMyApi } from "@/src/framework/api/api-provider";
import { useAuth } from "@/src/framework/providers/auth";
import { useState } from "react";
import { toastError, toastSuccess } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { logger } from "@/src/framework/utils/logger/logger";
import { toBackendRegisterVerifyDto } from "@/src/framework/api/types/auth-types";

import * as Device from "expo-device";
import { normalizePasskeyPublicKeyToCompressed33 } from "@/src/framework/libs/rn-passkey/passkey-utils";
import {
  b64urlToBytes,
  bytesToB64,
} from "@/src/framework/libs/rn-passkey/weauthn-b64";

const log = logger.scope("PASSKEY");

export const useCreatePasskey = () => {
  const api = useMyApi();
  const { setUser } = useAuth();
  const { t } = useI18nService();
  const [isEnrollLoading, setIsEnrollLoading] = useState(false);

  const enrollPasskey = async () => {
    try {
      setIsEnrollLoading(true);

      // 1. Obtener challenge del backend
      const challengeData = await api.auth().getRegisterOptions();

      if (!challengeData.user) {
        log.error("No user data in challenge");
        toastError(t("biometric.passkeyError"));
        setIsEnrollLoading(false);
        return;
      }

      const provider = new RNPasskeyProvider();

      // 2. Crear Passkey
      const attestation = await provider.create({
        challengeB64u: challengeData.challenge,
        rpId: challengeData.rp.id,
        user: {
          idB64u: challengeData.user.id,
          name: challengeData.user.name, // email
          displayName: challengeData.user.displayName,
        },
      });

      // 3. Verificar y registrar en backend
      const pkB64u = attestation.response.getPublicKey?.();
      if (!pkB64u) {
        log.error("No getPublicKey() from registration response");
        toastError(t("biometric.passkeyError"));
        setIsEnrollLoading(false);
        return;
      }

      const pub33 = normalizePasskeyPublicKeyToCompressed33(
        b64urlToBytes(pkB64u),
      );

      const mappedBody = toBackendRegisterVerifyDto({
        challengeId: challengeData.challengeId,
        attestation: attestation as any,
        publicKey: bytesToB64(pub33),
        label: Device.deviceName || "Unknown Device",
      });

      const response = await api.auth().verifyRegister(mappedBody);

      await addStoredPasskey(attestation.rawId, pkB64u);

      if (response.user) {
        setUser({
          ...response.user,
          trustedDevices: [],
        });

        toastSuccess(t("biometric.passkeyCreated"));
        return;
      }
      return;
    } catch (error: any) {
      log.error("Enrollment error", { message: error?.message });
      toastError(t("biometric.passkeyError"));
      return;
    } finally {
      setIsEnrollLoading(false);
    }
  };

  return { enrollPasskey, isEnrollLoading };
};
