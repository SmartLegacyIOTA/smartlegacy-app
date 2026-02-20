import { useState } from "react";
import { useCurrentUser } from "@/src/providers/user";

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
          hasPasskey: true,
          securityLevel: "SECURED",
        });
      }

      // Navigation will be handled automatically by _layout.tsx
      // when user state changes to SECURED
    } catch (error) {
      console.error("Error creating rn-passkey:", error);
    } finally {
      setLoading(false);
    }
  };

  const onWhyNeeded = () => {
    // TODO: Show modal or navigate to explanation screen
    console.log("Why is this needed?");
  };

  return {
    onCreatePasskey,
    onWhyNeeded,
    loading,
  };
};
