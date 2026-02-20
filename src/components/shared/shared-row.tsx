import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "@/src/theme/use-theme";
import { SharedText } from "@/src/components/shared/shared-text";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";

interface SharedRowProps {
  label: string;
  value?: string;
  iconName?: MaterialCommunityIconName;
  iconColor?: string;
  showChevron?: boolean;
  onPress?: () => void;
  rightContent?: ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leftContent?: ReactNode;
}

export function SharedRow({
  label,
  value,
  iconName,
  iconColor,
  showChevron = false,
  onPress,
  rightContent,
  accessibilityLabel,
  accessibilityHint,
  containerStyle,
  labelStyle,
  leftContent,
}: SharedRowProps) {
  const theme = useTheme();

  const content = (
    <View style={styles.row}>
      <View style={styles.leftContent}>
        {leftContent}
        {iconName && (
          <Icon
            variant="material-community"
            name={iconName}
            size={20}
            color={iconColor || theme.colors.slText}
          />
        )}
        <SharedText
          variant="body"
          color={iconName ? "slText" : "slTextMuted"}
          style={[styles.label, labelStyle]}
        >
          {label}
        </SharedText>
      </View>

      <View style={styles.rightContent}>
        {rightContent}
        {value && (
          <SharedText variant="label" color="slText">
            {value}
          </SharedText>
        )}
        {showChevron && (
          <Icon
            variant="material-community"
            name="chevron-right"
            size={18}
            color={theme.colors.slTextMuted}
          />
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        accessibilityRole="button"
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[styles.container, containerStyle]}
      accessible={true}
      accessibilityLabel={accessibilityLabel}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  label: {
    flex: 1,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
