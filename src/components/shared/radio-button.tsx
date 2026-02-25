import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/src/framework/theme/use-theme";

interface RadioButtonProps {
  selected: boolean;
}

export function RadioButton({ selected }: RadioButtonProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.radio,
        {
          borderColor: selected
            ? theme.colors.slAccent
            : theme.colors.slBorderStrong,
          backgroundColor: selected ? theme.colors.slAccent : "transparent",
        },
      ]}
    >
      {selected && (
        <View
          style={[styles.innerDot, { backgroundColor: theme.colors.white }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
