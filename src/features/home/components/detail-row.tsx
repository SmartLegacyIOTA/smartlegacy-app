import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";
import { useTheme } from "@/src/theme/use-theme";

import { useI18nService } from "@/src/libs/i18n/i18n-service";

interface DetailRowProps {
  label: string;
  value: string;
  iconName?: MaterialCommunityIconName;
  onCopy?: () => void;
}

export function DetailRow({ label, value, iconName, onCopy }: DetailRowProps) {
  const theme = useTheme();
  const { t } = useI18nService();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {iconName && (
          <Icon
            variant="material-community"
            name={iconName}
            size={14}
            color={theme.colors.slTextMuted}
          />
        )}
        <SharedText
          variant="caption"
          color="slTextMuted"
          style={{ fontSize: 13 }}
        >
          {label}
        </SharedText>
      </View>
      <View style={styles.right}>
        <SharedText
          variant="body"
          color="slText"
          style={{ fontSize: 13, fontFamily: "monospace" }}
          numberOfLines={1}
        >
          {value}
        </SharedText>
        {onCopy && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCopy}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessibilityRole="button"
            accessibilityLabel={t("home.copyLabel", { label: label })}
            accessibilityHint={t("home.copyHint")}
          >
            <Icon
              variant="material-community"
              name="content-copy"
              size={14}
              color={theme.colors.slTextMuted}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "flex-end",
  },
});
