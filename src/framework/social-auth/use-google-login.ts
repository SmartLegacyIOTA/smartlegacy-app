import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";

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
      // await GoogleSignin.signOut();

      return await GoogleSignin.signIn();
    } catch (error) {
      console.error("ERROR LOGIN WITH GOOGLE", error);
      throw error;
    }
  };

  return { googleSignIn };
}
