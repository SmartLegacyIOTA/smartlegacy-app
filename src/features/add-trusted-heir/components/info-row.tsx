import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";
import { useTheme } from "@/src/theme/use-theme";

interface InfoRowProps {
  iconName: MaterialCommunityIconName;
  text: string;
}

export function InfoRow({ iconName, text }: InfoRowProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Icon
        variant="material-community"
        name={iconName}
        size={18}
        color={theme.colors.slAccent}
      />
      <SharedText variant="h2" color="slTextSecondary" style={styles.text}>
        {text}
      </SharedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  text: {
    fontSize: 14,
    lineHeight: 19.6,
    flex: 1,
  },
});
