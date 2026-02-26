import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { useAuth } from "@/src/framework/providers/auth";
import { logger } from "@/src/framework/utils/logger/logger";

export interface UserData {
  name: string;
  email: string;
}

export function useSettings() {
  const { t } = useI18nService();
  const { closeAndRemoveSession } = useAuth();

  // Mock user data - replace with actual data source
  const [userData] = useState<UserData>({
    name: "John Doe",
    email: "john.doe@email.com",
  });

  // Recovery settings
  const [inactivityDays, setInactivityDays] = useState(365);
  const [demoMode, setDemoMode] = useState(false);

  const handleInactivityPeriodPress = useCallback(() => {
    router.push("/settings/inactivity-period");
  }, []);

  const handleAddTrustedHeirPress = useCallback(() => {
    router.push("/add-trusted-heir");
  }, []);

  const handleDemoModeChange = useCallback((value: boolean) => {
    setDemoMode(value);
    // TODO: Persist setting
  }, []);

  const handleResetTimer = useCallback(() => {
    Alert.alert(
      t("settings.resetTimerTitle"),
      t("settings.resetTimerMessage"),
      [
        {
          text: t("settings.cancel"),
          style: "cancel",
        },
        {
          text: t("settings.reset"),
          style: "destructive",
          onPress: () => {
            // TODO: API call to reset timer
            logger.scope("SETTINGS").info("Reset inactivity timer");
          },
        },
      ],
    );
  }, [t]);

  const handleSignOut = useCallback(() => {
    Alert.alert(t("settings.signOutTitle"), t("settings.signOutMessage"), [
      {
        text: t("settings.cancel"),
        style: "cancel",
      },
      {
        text: t("settings.signOut"),
        style: "destructive",
        onPress: () => {
          closeAndRemoveSession();
        },
      },
    ]);
  }, [closeAndRemoveSession, t]);

  return {
    userData,
    inactivityDays,
    demoMode,
    handleInactivityPeriodPress,
    handleAddTrustedHeirPress,
    handleDemoModeChange,
    handleResetTimer,
    handleSignOut,
  };
}
