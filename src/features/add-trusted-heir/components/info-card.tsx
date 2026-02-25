import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/src/framework/theme/use-theme";

interface InfoCardProps {
  children: ReactNode;
}

export function InfoCard({ children }: InfoCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.slSurface }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    gap: 12,
  },
});
