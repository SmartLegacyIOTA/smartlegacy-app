import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/src/framework/theme/use-theme";
import { IconSymbol, IconSymbolName } from "@/src/components/ui/icon-symbol";
import { Icon, IconProps } from "@/src/components/ui/icon";

export type ButtonIconConfig =
  | { type: "sf-symbol"; name: IconSymbolName }
  | { type: "icon"; config: IconProps };

export interface SharedButtonProps {
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "inverse";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
  leftIcon?: IconSymbolName | ButtonIconConfig | ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function SharedButton({
  onPress,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  children,
  leftIcon,
  style,
  textStyle,
  accessibilityLabel,
  accessibilityHint,
}: SharedButtonProps) {
  const theme = useTheme();

  const sizeConfig = {
    sm: {
      height: 40,
      paddingHorizontal: 12,
      fontSize: theme.typography.fontSize.sm,
      iconSize: 16,
    },
    md: {
      height: 48,
      paddingHorizontal: 16,
      fontSize: theme.typography.fontSize.base,
      iconSize: 20,
    },
    lg: {
      height: theme.components.button.height,
      paddingHorizontal: theme.components.button.paddingHorizontal,
      fontSize: theme.typography.fontSize.lg,
      iconSize: 24,
    },
  };

  const currentSize = sizeConfig[size];

  const buttonStyles = [
    styles.button,
    {
      borderRadius: theme.components.button.borderRadius,
      height: currentSize.height,
      paddingHorizontal: currentSize.paddingHorizontal,
      gap: theme.spacing.md,
    },
    variant === "primary" && {
      backgroundColor: theme.colors.slAccent,
    },
    variant === "secondary" && {
      backgroundColor: theme.colors.slSurface,
      borderWidth: 1,
      borderColor: theme.colors.slBorder,
    },
    variant === "inverse" && {
      backgroundColor: theme.colors.slText,
    },
    variant === "ghost" && {
      backgroundColor: "transparent",
    },
    variant === "destructive" && {
      backgroundColor: theme.colors.slNegative,
    },
    (disabled || loading) && {
      opacity: 0.5,
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      fontFamily: theme.typography.fontFamily.primary,
      fontSize: currentSize.fontSize,
      fontWeight: theme.typography.fontWeight.medium,
    },
    variant === "primary" && {
      color: theme.colors.white,
    },
    variant === "secondary" && {
      color: theme.colors.slText,
    },
    variant === "inverse" && {
      color: theme.colors.white,
    },
    variant === "ghost" && {
      color: theme.colors.slText,
    },
    variant === "destructive" && {
      color: theme.colors.white,
    },
    textStyle,
  ];

  const iconColor =
    variant === "primary" || variant === "inverse" || variant === "destructive"
      ? theme.colors.white
      : theme.colors.slText;

  const renderLeftIcon = () => {
    if (!leftIcon) return null;

    // String = SF Symbol
    if (typeof leftIcon === "string") {
      return (
        <IconSymbol
          name={leftIcon as IconSymbolName}
          size={currentSize.iconSize}
          color={iconColor}
        />
      );
    }

    // Config object
    if (typeof leftIcon === "object" && "type" in leftIcon) {
      const config = leftIcon as ButtonIconConfig;

      if (config.type === "sf-symbol") {
        return (
          <IconSymbol
            name={config.name}
            size={currentSize.iconSize}
            color={iconColor}
          />
        );
      }

      if (config.type === "icon") {
        return (
          <Icon
            {...config.config}
            size={currentSize.iconSize}
            color={iconColor}
          />
        );
      }
    }

    // ReactNode
    return leftIcon as ReactNode;
  };

  const buttonLabel =
    accessibilityLabel || (typeof children === "string" ? children : "Button");
  const loadingLabel = loading ? `${buttonLabel}, loading` : buttonLabel;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyles}
      activeOpacity={0.8}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={loadingLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} />
      ) : (
        <>
          {leftIcon && (
            <View style={styles.iconContainer}>{renderLeftIcon()}</View>
          )}
          <Text style={textStyles}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {},
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
