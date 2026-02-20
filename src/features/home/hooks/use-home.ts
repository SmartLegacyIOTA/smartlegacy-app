import { useCallback } from "react";
import { router } from "expo-router";

export function useHome() {
  const handleNotificationPress = useCallback(() => {
    console.log("Notifications pressed");
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
