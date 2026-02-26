import { useCallback } from "react";
import { Alert } from "react-native";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { logger } from "@/src/framework/utils/logger/logger";

// Mock data - Should match the data from legacy-recovery
const MOCK_DATA = {
  owner: {
    name: "Robert Anderson",
    email: "robert.anderson@email.com",
    initials: "RA",
  },
  balance: 10000,
  vaultId: "did:iota:...x7l5",
};

export function useConfirmRecovery() {
  const { t } = useI18nService();

  const handleConfirmRecovery = useCallback(() => {
    // TODO: Implement actual recovery process
    logger.scope("RECOVERY").info("Confirming recovery");

    Alert.alert(
      t("confirmRecovery.successTitle"),
      t("confirmRecovery.successMessage"),
      [
        {
          text: t("confirmRecovery.successButton"),
          onPress: () => {
            // Navigate back to home or success screen
            // router.replace('/');
          },
        },
      ],
    );
  }, [t]);

  return {
    handleConfirmRecovery,
    mockData: MOCK_DATA,
  };
}
