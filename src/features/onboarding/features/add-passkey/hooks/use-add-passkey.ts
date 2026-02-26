import { useState } from "react";
import { useCurrentUser } from "@/src/framework/providers/user";
import { logger } from "@/src/framework/utils/logger/logger";

export const useAddPasskey = () => {
  const { user, setUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const onCreatePasskey = async () => {
    try {
      setLoading(true);
      // TODO: Implement rn-passkey creation logic
      // This will use the device's biometric authentication
      // and register the rn-passkey with the backend

      // Update user state to mark as secured
      if (user) {
        setUser({
          ...user,
        });
      }

      // Navigation will be handled automatically by _layout.tsx
      // when user state changes to SECURED
    } catch (error: any) {
      logger
        .scope("ONBOARDING/ADD_PASSKEY")
        .error("Error creating passkey", { message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const onWhyNeeded = () => {
    // TODO: Show modal or navigate to explanation screen
    logger.scope("ONBOARDING/ADD_PASSKEY").info("Why is this needed tapped");
  };

  return {
    onCreatePasskey,
    onWhyNeeded,
    loading,
  };
};
