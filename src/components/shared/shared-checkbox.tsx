import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from "@/src/theme/use-theme";
import { SharedText } from "./shared-text";
import { Icon } from "@/src/components/ui/icon";

interface SharedCheckboxProps {
  label?: string;
  description?: string;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
}

export function SharedCheckbox({
  label,
  description,
  checked,
  onValueChange,
  accessibilityLabel,
  accessibilityHint,
  disabled = false,
}: SharedCheckboxProps) {
  const theme = useTheme();

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };

  const a11yLabel = accessibilityLabel || label || "Checkbox";
  const a11yState = checked ? "checked" : "unchecked";

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled]}
      activeOpacity={0.7}
      accessibilityRole="checkbox"
      accessibilityLabel={`${a11yLabel}, ${a11yState}`}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.checkbox,
          {
            borderColor: checked
              ? theme.colors.slAccent
              : theme.colors.slBorder,
            backgroundColor: checked ? theme.colors.slAccent : "transparent",
          },
          disabled && styles.checkboxDisabled,
        ]}
      >
        {checked && (
          <Icon
            variant="material-community"
            name="check"
            size={16}
            color={theme.colors.white}
          />
        )}
      </View>

      {(label || description) && (
        <View style={styles.textContainer}>
          {label && (
            <SharedText
              variant="body"
              style={{
                fontSize: 15,
                color: disabled
                  ? theme.colors.slTextMuted
                  : theme.colors.slText,
              }}
            >
              {label}
            </SharedText>
          )}
          {description && (
            <SharedText
              variant="body"
              color="slTextSecondary"
              style={{ fontSize: 13, marginTop: 2, lineHeight: 18 }}
            >
              {description}
            </SharedText>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
});
