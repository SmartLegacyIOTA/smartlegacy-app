import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { SharedText } from "./shared-text";
import { useTheme } from "@/src/theme/use-theme";

export interface SharedInputProps extends Omit<TextInputProps, "style"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  containerStyle?: any;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export const SharedInput = forwardRef<TextInput, SharedInputProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorMessage,
      containerStyle,
      accessibilityLabel,
      accessibilityHint,
      ...textInputProps
    },
    ref,
  ) => {
    const theme = useTheme();

    const borderColor = error ? theme.colors.slNegative : theme.colors.slBorder;
    const helperColor = error
      ? theme.colors.slNegative
      : theme.colors.slTextMuted;
    const displayHelperText = error && errorMessage ? errorMessage : helperText;

    // Accessibility label generation
    const inputLabel =
      accessibilityLabel ||
      label ||
      textInputProps.placeholder ||
      "Input field";
    const inputHint = accessibilityHint || displayHelperText || undefined;

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <SharedText
            variant="label"
            color={error ? "slNegative" : "slText"}
            style={styles.label}
          >
            {label}
          </SharedText>
        )}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.colors.slSurface,
              borderColor: borderColor,
            },
          ]}
        >
          <TextInput
            ref={ref}
            style={[
              styles.input,
              {
                fontFamily: theme.typography.fontFamily.primary,
                color: theme.colors.slText,
              },
            ]}
            placeholderTextColor={theme.colors.slTextMuted}
            accessibilityLabel={inputLabel}
            accessibilityHint={inputHint}
            accessibilityRole="none"
            accessible={true}
            {...textInputProps}
          />
        </View>
        {displayHelperText && (
          <SharedText
            variant="caption"
            style={[styles.helperText, { color: helperColor }] as any}
          >
            {displayHelperText}
          </SharedText>
        )}
      </View>
    );
  },
);

SharedInput.displayName = "SharedInput";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  inputContainer: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    fontWeight: "normal",
    height: "100%",
    padding: 0,
  },
  helperText: {
    fontSize: 12,
  },
});
