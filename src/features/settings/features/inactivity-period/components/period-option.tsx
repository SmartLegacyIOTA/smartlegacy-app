import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/theme/use-theme";
import { SharedText } from "@/src/components/shared/shared-text";
import { RadioButton } from "@/src/components/shared/radio-button";

interface PeriodOptionProps {
  label: string;
  value: number;
  selected: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
}

export function PeriodOption({
  label,
  value,
  selected,
  onPress,
  accessibilityLabel,
}: PeriodOptionProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.option,
        {
          backgroundColor: selected
            ? theme.colors.slSurfaceMuted
            : "transparent",
        },
      ]}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={accessibilityLabel}
      activeOpacity={0.7}
    >
      <SharedText
        variant="body"
        color="slText"
        style={selected ? styles.selectedText : undefined}
      >
        {label}
      </SharedText>
      <RadioButton selected={selected} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  selectedText: {
    fontWeight: "500",
  },
});
