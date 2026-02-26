import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { logger } from "@/src/framework/utils/logger/logger";

export function useGoogleLogin() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      offlineAccess: false,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    });
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      return await GoogleSignin.signIn();
    } catch (error: any) {
      logger
        .scope("OAUTH")
        .error("Google Sign-In failed", { message: error?.message });
      throw error;
    }
  };

  return { googleSignIn };
}
