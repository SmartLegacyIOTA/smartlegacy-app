import { useAuth } from "@/src/framework/providers/auth";
import { useState } from "react";
import { useMutationOAuth } from "@/src/framework/api/rq/auth/post-oauth";
import { useGoogleLogin } from "@/src/framework/social-auth/use-google-login";
import { logger } from "@/src/framework/utils/logger/logger";
import { RNPasskeyProvider } from "@/src/framework/libs/rn-passkey";
import { useMyApi } from "@/src/framework/api/api-provider";
import { toBackendAuthVerifyDto } from "@/src/framework/api/types/auth-types";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

const log = logger.scope("LOGIN");

export const useLogin = () => {
  const { t } = useI18nService();

  const { signIn, setUser } = useAuth();
  const { mutateAsync: googleLoginMutate } = useMutationOAuth();
  const { googleSignIn } = useGoogleLogin();
  const api = useMyApi();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);
  const [loadingPasskey, setLoadingPasskey] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);

      const userInfo = await googleSignIn();
      const idToken = userInfo.data?.idToken;

      if (idToken) {
        const response = await googleLoginMutate({
          idToken: idToken,
        });

        if ("requiresStrongAuth" in response && response.requiresStrongAuth) {
          log.info("Strong auth required, triggering passkey verification");
          // Reutilizamos la lógica de passkey login pero con el challenge que el back debería haber preparado o preparará
          await handlePasskeyLogin();
          return;
        } else if ("accessToken" in response) {
          if (response.accessToken && response.nextStep) {
            log.debug("OAuth success", { nextStep: response.nextStep });
            signIn(response.accessToken);
            setUser({
              ...response,
              trustedDevices: [],
            });
          }
        }
      }
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      setLoadingPasskey(true);

      const challengeData = await api.auth().getAuthOptions();

      const provider = new RNPasskeyProvider();

      // 2. Ejecutar Passkey Get con todos los IDs almacenados
      const assertion = await provider.get({
        rpId: challengeData.rpId,
        challengeB64u: challengeData.challenge,
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
      }
    } catch (error: any) {
      log.error("Login passkey error", {
        message: error?.message,
      });
      toastError(t("login.passkeyLoginError"));
    } finally {
      setLoadingPasskey(false);
    }
  };

  const onApple = async () => {
    setLoadingApple(true);
    // Mock user data for testing
  };

  return {
    onGoogle: handleGoogleLogin,
    onPasskey: handlePasskeyLogin,
    onApple,
    loadingGoogle,
    loadingApple,
    loadingPasskey,
  };
};
