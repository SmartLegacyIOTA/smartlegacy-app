import { useCallback } from "react";
import { router } from "expo-router";
import { logger } from "@/src/framework/utils/logger/logger";

export function useHome() {
  const handleNotificationPress = useCallback(() => {
    logger.scope("HOME").info("Notifications pressed");
  }, []);

  const handleManageGuardian = useCallback(() => {
    router.navigate("/add-trusted-heir");
  }, []);

  const handleLegacyRecovery = useCallback(() => {
    router.navigate("/legacy-recovery");
  }, []);

  return {
    handleNotificationPress,
    handleManageGuardian,
    handleLegacyRecovery,
  };
}
