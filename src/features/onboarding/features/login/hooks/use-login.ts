import { useSession } from "@/src/framework/providers/session";
import { useCurrentUser } from "@/src/framework/providers/user";
import { useState } from "react";
import { useMutationOAuth } from "@/src/framework/api/rq/auth/post-oauth";
import { useGoogleLogin } from "@/src/framework/social-auth/use-google-login";

export const useLogin = () => {
  const { signIn } = useSession();
  const { setUser } = useCurrentUser();
  const { mutateAsync: googleLoginMutate } = useMutationOAuth();
  const { googleSignIn } = useGoogleLogin();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);

      const userInfo = await googleSignIn();
      const idToken = userInfo.data?.idToken;

      if (idToken) {
        const response = await googleLoginMutate({
          idToken: idToken,
        });

        if (response.accessToken && response.user) {
          console.log(response);
          signIn(response.accessToken);
          setUser({
            ...response.user,
            trustedDevices: [],
          });
        }
      }
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onApple = async () => {
    setLoadingApple(true);
    // Mock user data for testing
  };

  return {
    onGoogle: handleGoogleLogin,
    onApple,
    loadingGoogle,
    loadingApple,
  };
};
