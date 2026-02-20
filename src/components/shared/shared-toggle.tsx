import React from "react";
import { Platform, Switch } from "react-native";
import { useTheme } from "@/src/theme/use-theme";

interface SharedToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function SharedToggle({
  value,
  onValueChange,
  accessibilityLabel,
  accessibilityHint,
}: SharedToggleProps) {
  const theme = useTheme();

  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: theme.colors.slTextMuted,
        true: theme.colors.slAccent,
      }}
      thumbColor={Platform.OS === "ios" ? undefined : theme.colors.white}
      ios_backgroundColor={theme.colors.slTextMuted}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    />
  );
}
