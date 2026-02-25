import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@/src/framework/theme/use-theme";
import { SharedText } from "@/src/components/shared/shared-text";

interface SharedCardProps {
  label?: string;
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function SharedCard({
  label,
  children,
  containerStyle,
}: SharedCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.section, containerStyle]}>
      {label && (
        <SharedText variant="caption" color="slTextMuted" style={styles.label}>
          {label.toUpperCase()}
        </SharedText>
      )}
      <View style={[styles.card, { backgroundColor: theme.colors.slSurface }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 10,
  },
  label: {
    letterSpacing: 0.3,
    fontWeight: "500",
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
});
