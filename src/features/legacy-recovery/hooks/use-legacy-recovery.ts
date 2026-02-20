import { useCallback } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useI18nService } from "@/src/libs/i18n/i18n-service";

// Mock data - Replace with real data from your state management
const MOCK_DATA = {
  owner: {
    name: "Robert Anderson",
    email: "robert.anderson@email.com",
    initials: "RA",
  },
  inactiveSince: "January 15, 2025",
  recoveryEligibleDate: "January 15, 2026",
  balance: 10000,
  vaultId: "did:iota:...x7l5",
};

export function useLegacyRecovery() {
  const { t } = useI18nService();

  const handleStartRecovery = useCallback(() => {
    Alert.alert(
      t("legacyRecovery.confirmRecovery"),
      t("legacyRecovery.infoDescription"),
      [
        {
          text: t("legacyRecovery.cancel"),
          style: "cancel",
        },
        {
          text: t("legacyRecovery.confirmRecovery"),
          onPress: () => {
            router.push("/(app)/(root)/confirm-recovery");
          },
        },
      ],
    );
  }, [t]);

  return {
    handleStartRecovery,
    mockData: MOCK_DATA,
  };
}
