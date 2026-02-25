import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "./shared-text";
import { useTheme } from "@/src/framework/theme/use-theme";
import { ThemeColor } from "@/src/framework/theme/theme";

export type AvatarSize = "small" | "medium" | "large" | "xlarge";

interface BaseAvatarProps {
  size?: AvatarSize;
  backgroundColor?: string;
  bgColor?: ThemeColor;
  accessibilityLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface AvatarWithIcon extends BaseAvatarProps {
  variant: "icon";
  iconName: MaterialCommunityIconName;
  iconColor?: string;
  iconThemeColor?: ThemeColor;
}

interface AvatarWithText extends BaseAvatarProps {
  variant: "text";
  text: string;
  textColor?: string;
  textThemeColor?: ThemeColor;
}

export type SharedAvatarProps = AvatarWithIcon | AvatarWithText;

const AVATAR_SIZES = {
  small: { container: 36, icon: 16, text: 14 },
  medium: { container: 44, icon: 20, text: 16 },
  large: { container: 64, icon: 28, text: 24 },
  xlarge: { container: 80, icon: 40, text: 32 },
};

export function SharedAvatar(props: SharedAvatarProps) {
  const theme = useTheme();
  const {
    size = "medium",
    backgroundColor,
    bgColor,
    accessibilityLabel,
    containerStyle,
  } = props;

  const sizeConfig = AVATAR_SIZES[size];
  const containerSize = sizeConfig.container;
  const borderRadius = containerSize / 2;

  const resolvedBgColor =
    backgroundColor ||
    (bgColor ? theme.colors[bgColor] : theme.colors.slAccent);

  if (props.variant === "icon") {
    const { iconName, iconColor, iconThemeColor } = props;
    const resolvedIconColor =
      iconColor ||
      (iconThemeColor ? theme.colors[iconThemeColor] : theme.colors.white);
    const a11yLabel = accessibilityLabel || `Icon ${iconName}`;

    return (
      <View
        style={[
          styles.container,
          {
            width: containerSize,
            height: containerSize,
            borderRadius,
            backgroundColor: resolvedBgColor,
          },
          containerStyle,
        ]}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={a11yLabel}
      >
        <Icon
          variant="material-community"
          name={iconName}
          size={sizeConfig.icon}
          color={resolvedIconColor}
        />
      </View>
    );
  }

  // variant === 'text'
  const { text, textColor, textThemeColor } = props;
  const resolvedTextColor =
    textColor ||
    (textThemeColor ? theme.colors[textThemeColor] : theme.colors.white);
  const a11yLabel = accessibilityLabel || `Avatar with initials ${text}`;

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius,
          backgroundColor: resolvedBgColor,
        },
        containerStyle,
      ]}
      accessible={true}
      accessibilityRole="image"
      accessibilityLabel={a11yLabel}
    >
      <SharedText
        variant="label"
        style={{
          fontSize: sizeConfig.text,
          fontWeight: "600",
          color: resolvedTextColor,
        }}
      >
        {text}
      </SharedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
