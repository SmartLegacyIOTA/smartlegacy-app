import { useState } from "react";
import { useCurrentUser } from "@/src/framework/providers/user";
import { useSession } from "@/src/framework/providers/session";
import { router } from "expo-router";

export const useDeviceAuthorization = () => {
  const { user, setUser } = useCurrentUser();
  const { signOut } = useSession();
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
    } catch (error) {
      console.error("Error authorizing device:", error);
    } finally {
      setLoading(false);
    }
  };

  const onReject = () => {
    try {
      setLoading(true);
      signOut();
      setUser(null);

      // Navigate to login screen
      // router.replace('/onboarding/sign-in');
    } catch (error) {
      console.error("Error rejecting device:", error);
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
