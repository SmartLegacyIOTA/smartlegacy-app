import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";
import { useTheme } from "@/src/framework/theme/use-theme";
import { SharedAvatar } from "@/src/components/shared/shared-avatar";
import { SharedBadge } from "@/src/components/shared/shared-badge";

interface StatusCardProps {
  title: string;
  badgeText: string;
  badgeColor: string;
  badgeBgColor: string;
  borderColor: string;
  iconColor: string;
  iconBgColor: string;
  iconName: MaterialCommunityIconName;
  children: ReactNode;
}

export function StatusCard({
  title,
  badgeText,
  borderColor,
  iconColor,
  iconBgColor,
  iconName,
  children,
}: StatusCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.slSurface,
          borderColor: borderColor,
          borderWidth: 1,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <SharedAvatar
            variant="icon"
            iconName={iconName}
            size="medium"
            backgroundColor={iconBgColor}
            iconColor={iconColor}
          />

          <SharedText
            variant="label"
            color="slText"
            style={{ fontSize: 15, fontWeight: "500" }}
          >
            {title}
          </SharedText>
        </View>

        <SharedBadge
          label={badgeText}
          variant="success"
          size="sm"
          iconName={"circle"}
        />
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
