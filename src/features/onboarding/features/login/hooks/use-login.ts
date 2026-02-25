import { useSession } from "@/src/framework/providers/session";
import { useCurrentUser } from "@/src/framework/providers/user";
import { useState } from "react";
import { useMutationOAuth } from "@/src/framework/api/rq/auth/post-oauth";
import { useGoogleLogin } from "@/src/framework/social-auth/use-google-login";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

export const useLogin = () => {
  const { signIn } = useSession();
  const { setUser } = useCurrentUser();
  const { mutateAsync: oauthMutate } = useMutationOAuth();
  const { promptAsync } = useGoogleLogin();
  const { t } = useI18nService();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);

      const result = await promptAsync();

      if (result?.type === "success") {
        const { code } = result.params;

        const response = await oauthMutate({
          code,
        });

        if (response.accessToken && response.user) {
          console.log(response);
          signIn(response.accessToken);
          setUser({
            ...response.user,
            trustedDevices: [],
            hasPasskey: !!response.user.iotaAddress,
            securityLevel: response.user.iotaAddress ? "SECURED" : "UNSECURED",
          });
        }
      }
    } catch {
      toastError(t("login.error"));
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onApple = async () => {
    signIn("123");
  };

  return {
    onGoogle: handleGoogleLogin,
    onApple,
    loadingGoogle,
    loadingApple,
  };
};
