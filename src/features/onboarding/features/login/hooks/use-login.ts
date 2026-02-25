import { useSession } from "@/src/framework/providers/session";
import { useCurrentUser } from "@/src/framework/providers/user";
import { useState } from "react";
import { useMutationOAuth } from "@/src/framework/api/rq/auth/post-oauth";
import { useGoogleLogin } from "@/src/framework/social-auth/use-google-login";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

export const useLogin = () => {
  const { signIn } = useSession();
  const { setUser } = useCurrentUser();
  const { mutateAsync: googleLoginMutate } = useMutationOAuth();
  const { googleSignIn } = useGoogleLogin();
  const { t } = useI18nService();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);

      const userInfo = await googleSignIn();
      const idToken = userInfo.data?.idToken;

      if (idToken) {
        const response = await googleLoginMutate({ idToken });

        if (response.accessToken && response.user) {
          signIn(response.accessToken);
          setUser({
            ...response.user,
            trustedDevices: [],
          });
        }
      }
    } catch (error) {
      // Error handled by mutation or logged in googleSignIn
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onApple = async () => {
    // Mock user data for testing
  };

  return {
    onGoogle: handleGoogleLogin,
    onApple,
    loadingGoogle,
    loadingApple,
  };
};
