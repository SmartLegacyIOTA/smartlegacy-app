import { useState } from "react";
import { useAuth } from "@/src/framework/providers/auth";
import { router } from "expo-router";
import { logger } from "@/src/framework/utils/logger/logger";
import { RNPasskeyProvider } from "@/src/framework/libs/rn-passkey";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { useMyApi } from "@/src/framework/api/api-provider";
import { toBackendAuthVerifyDto } from "@/src/framework/api/types/auth-types";

export const useDeviceAuthorization = () => {
  const { t } = useI18nService();
  const { closeAndRemoveSession, signIn, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingPasskey, setLoadingPasskey] = useState(false);
  const api = useMyApi();
  const log = logger.scope("DEVICE_AUTH");

  const onAuthorize = async () => {
    try {
      setLoading(true);

      router.navigate("/onboarding/(device-authorization)/approve-this-device");
    } catch (error: any) {
      logger
        .scope("DEVICE_AUTH")
        .error("Error authorizing device", { message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const onReject = () => {
    try {
      setLoading(true);
      closeAndRemoveSession();
    } catch (error: any) {
      logger
        .scope("DEVICE_AUTH")
        .error("Error rejecting device", { message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const onPasskeyLogin = async () => {
    try {
      setLoadingPasskey(true);

      const challengeData = await api.auth().getAuthOptions();
      const provider = new RNPasskeyProvider();

      const assertion = await provider.get({
        rpId: challengeData.rpId,
        challengeB64u: challengeData.challenge,
      });

      const mappedBody = toBackendAuthVerifyDto({
        challengeId: challengeData.challengeId,
        assertion,
      });

      const response = await api.auth().verifyAuth(mappedBody);

      if (response.accessToken && response.user) {
        log.info("Passkey authorization success", {
          userId: response.user.id,
        });
        signIn(response.accessToken);
        setUser({
          ...response.user,
          trustedDevices: [],
          nextStep: "APP",
        });
      }
    } catch (error: any) {
      log.error("Passkey authorization error", {
        message: error?.message,
      });
      toastError(t("login.passkeyLoginError"));
    } finally {
      setLoadingPasskey(false);
    }
  };

  return {
    onAuthorize,
    onReject,
    onPasskeyLogin,
    loading,
    loadingPasskey,
  };
};
