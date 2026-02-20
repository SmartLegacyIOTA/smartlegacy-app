import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";
import { useTheme } from "@/src/theme/use-theme";

interface FeatureCardProps {
  iconName: MaterialCommunityIconName;
  iconColor: string;
  iconBgColor: string;
  title: string;
  description: string;
}

export function FeatureCard({
  iconName,
  iconColor,
  iconBgColor,
  title,
  description,
}: FeatureCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.slSurface, borderRadius: 12 },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: iconBgColor, borderRadius: 10 },
        ]}
      >
        <Icon
          variant="material-community"
          name={iconName}
          size={20}
          color={iconColor}
        />
      </View>
      <View style={styles.textContainer}>
        <SharedText variant="label" color="slText" style={{ fontSize: 15 }}>
          {title}
        </SharedText>
        <SharedText
          variant="caption"
          color="slTextMuted"
          style={{ fontSize: 13 }}
        >
          {description}
        </SharedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
});
