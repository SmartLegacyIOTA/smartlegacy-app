import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";
import { SharedAvatar } from "@/src/components/shared/shared-avatar";

import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { ThemeColor } from "@/src/theme/theme";

interface IntroSectionProps {
  iconName: MaterialCommunityIconName;
  title: string;
  description?: string;
  bgColor?: ThemeColor;
  iconThemeColor?: ThemeColor;
}

export function IntroSection({
  iconName,
  title,
  description,
  bgColor,
  iconThemeColor,
}: IntroSectionProps) {
  const { t } = useI18nService();

  return (
    <View style={styles.container}>
      <SharedAvatar
        variant="icon"
        iconName={iconName}
        size="large"
        bgColor={bgColor || "slAccentLight"}
        iconThemeColor={iconThemeColor || "slAccent"}
        accessibilityLabel={t("addHeir.a11yIntro")}
      />
      <SharedText
        variant="h2"
        color="slText"
        align="center"
        style={styles.title}
        accessibilityRole="header"
      >
        {title}
      </SharedText>
      {description && (
        <SharedText
          variant="body"
          color="slTextSecondary"
          align="center"
          style={styles.description}
        >
          {description}
        </SharedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
  },
});
