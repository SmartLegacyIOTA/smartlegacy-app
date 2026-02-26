import { useState } from "react";
import { useAuth } from "@/src/framework/providers/auth";
import { router } from "expo-router";
import { logger } from "@/src/framework/utils/logger/logger";

export const useDeviceAuthorization = () => {
  const { user, closeAndRemoveSession } = useAuth();
  const [loading, setLoading] = useState(false);

  const onAuthorize = async () => {
    try {
      setLoading(true);

      // TODO: Call backend API to authorize the device
      // await authorizeDevice(user?.userId, deviceId);

      // Update user state to mark device as authorized
      if (user) {
        // setUser({
        //     ...user,
        //     isNewDevice: false,
        //     trustedDevices: [...(user.trustedDevices || []), 'current-device-id']
        // });
      }

      // Navigation will be handled automatically by _layout.tsx
      // User will be redirected to add-rn-passkey screen
      router.navigate("/onboarding/(device-authorization)/approve-this-device");
    } catch (error: any) {
      logger
        .scope("DEVICE_AUTH")
        .error("Error authorizing device", { message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const onReject = () => {
    try {
      setLoading(true);
      closeAndRemoveSession();

      // Navigate to login screen
      // router.replace('/onboarding/sign-in');
    } catch (error: any) {
      logger
        .scope("DEVICE_AUTH")
        .error("Error rejecting device", { message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    onAuthorize,
    onReject,
    loading,
  };
};
