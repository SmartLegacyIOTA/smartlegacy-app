import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  loadStoredPasskey,
  RNPasskeyProvider,
} from "@/src/framework/libs/rn-passkey";
import { useTheme } from "@/src/framework/theme/use-theme";
import { useMyApi } from "@/src/framework/api/api-provider";
import { useSession } from "@/src/framework/providers/session";
import { useCurrentUser } from "@/src/framework/providers/user";
import { toastError } from "@/src/framework/lib/toast/toast";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { logger } from "@/src/framework/utils/logger/logger";

const log = logger.scope("BOOTSTRAP");

const AuthBootstrap = () => {
  const { t } = useI18nService();
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
        log.debug("Stored passkey loaded", { hasStored: !!stored });

        if (!stored) {
          log.info("No stored credentials, redirecting to sign-in");
          router.replace("/onboarding/sign-in");
          return;
        }

        const challengeData = await api.auth().getAuthOptions();
        log.info("Auth options received", {
          rpId: challengeData.rpId,
          userId: challengeData.userId,
        });
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
          log.info("VerifyAuth success", {
            userId: response.user.id,
            isNew: response.isNew,
          });
          signIn(response.accessToken);
          setUser({
            ...response.user,
            trustedDevices: [],
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
