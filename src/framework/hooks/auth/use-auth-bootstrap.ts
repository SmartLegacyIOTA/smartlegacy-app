import { useEffect, useRef } from "react";
import { router } from "expo-router";
import {
  loadStoredPasskey,
  RNPasskeyProvider,
} from "@/src/framework/libs/rn-passkey";
import { useMyApi } from "@/src/framework/api/api-provider";
import { useAuth } from "@/src/framework/providers/auth";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { logger } from "@/src/framework/utils/logger/logger";
import { toBackendAuthVerifyDto } from "@/src/framework/api/types/auth-types";

const log = logger.scope("BOOTSTRAP");

export const useAuthBootstrap = () => {
  const { t } = useI18nService();
  const isMounted = useRef(false);
  const api = useMyApi();
  const { signIn, setUser } = useAuth();

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const bootstrap = async () => {
      try {
        const stored = await loadStoredPasskey();
        log.debug("Stored passkey loaded", { hasStored: !!stored });

        if (!stored) {
          log.info("No stored credentials, redirecting to sign-in");
          router.replace("/onboarding/sign-in");
          return;
        }

        const challengeData = await api.auth().getAuthOptions();

        const provider = new RNPasskeyProvider();

        // 2. Ejecutar Passkey Get
        const assertion = await provider.get({
          rpId: challengeData.rpId,
          challengeB64u: challengeData.challenge,
          allowCredentialIdsB64u: [stored.credentialIdB64u],
        });

        // 3. Verificar en backend
        const mappedBody = toBackendAuthVerifyDto({
          challengeId: challengeData.challengeId,
          assertion,
        });

        const response = await api.auth().verifyAuth(mappedBody);

        if (response.accessToken && response.user) {
          log.info("VerifyAuth success", {
            userId: response.user.id,
            isNew: response.isNew,
          });
          signIn(response.accessToken);
          setUser({
            ...response.user,
            trustedDevices: [],
            nextStep: "APP",
          });
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error: any) {
        log.error("Bootstrap error", {
          message: error?.message,
        });
        toastError(t("login.bootstrapError"));
        router.replace("/onboarding/sign-in");
      }
    };

    bootstrap().catch();
  }, [api, setUser, signIn, t]);
};
