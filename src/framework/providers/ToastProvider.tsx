import React from "react";
import { Toaster } from "sonner-native";
import { useColorScheme } from "@/src/framework/hooks/use-color-scheme";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <>
      {children}
      <Toaster
        position="top-center"
        theme={colorScheme === "dark" ? "dark" : "light"}
        // Professional defaults
        duration={4000}
      />
    </>
  );
}
