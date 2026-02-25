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
            userId: response.user.id,
            hasPasskey: response.user.hasPasskey,
            trustedDevices: [],
            securityLevel: response.user.securityLevel,
            isNewDevice: response.user.isNewDevice,
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
    // TODO: Remove this mock data and use real backend response
    // Mock user data for testing - simulating a trusted device with rn-passkey
    setUser({
      userId: "u_123",
      hasPasskey: true,
      trustedDevices: ["device-123"],
      securityLevel: "SECURED",
      isNewDevice: false,
    });
    // try {
    //     setLoadingApple(true);
    //     const identityToken = await appleLoginGetIdentityToken();
    //     if (!identityToken) return;
    //
    //     const { accessToken, userData } = await exchangeAppleIdentityTokenForJwt(identityToken);
    //     setToken(accessToken);
    //     signIn(accessToken);
    //
    //     // Get current device ID
    //     const currentDeviceId = await getCurrentDeviceId();
    //
    //     // Check if current device is trusted
    //     const isNewDevice = !userData.hasPasskey &&
    //                        !userData.trustedDevices.includes(currentDeviceId);
    //
    //     // Save user data from backend response
    //     setUser({
    //         userId: userData.userId,
    //         hasPasskey: userData.hasPasskey,
    //         trustedDevices: userData.trustedDevices,
    //         securityLevel: userData.securityLevel,
    //         isNewDevice,
    //         deviceInfo: isNewDevice ? userData.deviceInfo : undefined
    //     });
    //
    //     // Navigation will be handled automatically by _layout.tsx based on user state
    //     // If isNewDevice is true, user will be shown device-authorization screen
    // } catch (e: any) {
    //     Alert.alert('Login error', e?.message ?? 'Unknown');
    // } finally {
    //     setLoadingApple(false);
    // }
  };

  return {
    onGoogle: handleGoogleLogin,
    onApple,
    loadingGoogle,
    loadingApple,
  };
};
