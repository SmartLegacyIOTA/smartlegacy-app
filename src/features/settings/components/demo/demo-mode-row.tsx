import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedText } from "@/src/components/shared/shared-text";
import { SharedToggle } from "@/src/components/shared/shared-toggle";

interface DemoModeRowProps {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function DemoModeRow({
  label,
  description,
  value,
  onValueChange,
  accessibilityLabel,
  accessibilityHint,
}: DemoModeRowProps) {
  return (
    <View style={styles.container}>
      <View
        style={styles.leftContent}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
      >
        <SharedText variant="body" color="slText">
          {label}
        </SharedText>
        <SharedText variant="caption" color="slTextMuted">
          {description}
        </SharedText>
      </View>
      <SharedToggle
        value={value}
        onValueChange={onValueChange}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  leftContent: {
    flex: 1,
    gap: 2,
  },
});
