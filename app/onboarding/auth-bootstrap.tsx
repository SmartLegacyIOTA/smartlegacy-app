import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  loadStoredPasskey,
  clearStoredPasskey,
  RNPasskeyProvider,
} from "@/src/framework/libs/rn-passkey";
import { useTheme } from "@/src/framework/theme/use-theme";
import { useMyApi } from "@/src/framework/api/api-provider";
import { useSession } from "@/src/framework/providers/session";
import { useCurrentUser } from "@/src/framework/providers/user";

const AuthBootstrap = () => {
  const theme = useTheme();
  const isMounted = useRef(false);
  const api = useMyApi();
  const { signIn } = useSession();
  const { setUser } = useCurrentUser();

  useEffect(() => {
    if (isMounted.current) return;

    isMounted.current = true;

    const bootstrap = async () => {
      try {
        const stored = await loadStoredPasskey();
        console.log(stored);

        if (!stored) {
          console.info(
            "[AuthBootstrap] No stored credentials, redirecting to sign-in",
          );
          router.replace("/onboarding/sign-in");
          return;
        }

        const challengeData = await api.auth().getAuthOptions();
        console.info("challengeData", challengeData);
        const provider = new RNPasskeyProvider();

        // 2. Ejecutar Passkey Get
        const assertion = await provider.get({
          rpId:
            challengeData.rpId ||
            process.env.EXPO_PUBLIC_IOTA_RPID ||
            "qa-api.smartlegacy.tech",
          challengeB64u: challengeData.challenge,
          allowCredentialIdsB64u: [stored.credentialIdB64u],
        });

        // 3. Verificar en backend
        const response = await api.auth().verifyAuth(assertion as any);

        if (response.accessToken && response.user) {
          console.info("VerifyAuth Response:", response);
          signIn(response.accessToken);
          setUser({
            ...response.user,
            trustedDevices: [],
          });
        }
      } catch (error) {
        console.error("[AuthBootstrap] Bootstrap error:", error);
        router.replace("/onboarding/sign-in");
      }
    };

    bootstrap();
  }, [api, setUser, signIn]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      <ActivityIndicator size="large" color={theme.colors.slAccent} />
    </View>
  );
};

export default AuthBootstrap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
