import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { SharedText } from "@/src/components/shared/shared-text";
import {
  SharedBadge,
  BadgeSize,
  BadgeVariant,
} from "@/src/components/shared/shared-badge";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";

export type DeviceInfoVariant = "warning" | "info" | "success";

export interface BadgeConfig {
  label?: string;
  variant?: BadgeVariant;
  iconName?: MaterialCommunityIconName;
  size?: BadgeSize;
}

interface DeviceInfoProps {
  deviceName: string;
  deviceOS: string;
  deviceLocation: string;
  requestedAt?: string;
  variant?: DeviceInfoVariant;
  showBadge?: boolean;
  badgeConfig?: BadgeConfig;
  style?: ViewStyle;
}

export const DeviceInfo = ({
  deviceName,
  deviceOS,
  deviceLocation,
  requestedAt,
  variant = "warning",
  showBadge = true,
  badgeConfig,
  style,
}: DeviceInfoProps) => {
  const theme = useTheme();
  const { t } = useI18nService();

  const getVariantColors = () => {
    switch (variant) {
      case "success":
        return {
          border: theme.colors.slPositive,
          iconBg: theme.colors.slPositiveLight,
          icon: theme.colors.slPositive,
          badge: "success" as const,
        };
      case "info":
        return {
          border: theme.colors.slAccent,
          iconBg: theme.colors.slAccentLight,
          icon: theme.colors.slAccent,
          badge: "info" as const,
        };
      case "warning":
      default:
        return {
          border: theme.colors.slWarning,
          iconBg: theme.colors.slWarningLight,
          icon: theme.colors.slWarning,
          badge: "warning" as const,
        };
    }
  };

  const colors = getVariantColors();

  const badgeLabel = badgeConfig?.label;
  const badgeVariant = badgeConfig?.variant;
  const badgeIcon = badgeConfig?.iconName;
  const badgeSize = badgeConfig?.size;

  return (
    <View
      style={[
        styles.deviceCard,
        {
          backgroundColor: theme.colors.slSurface,
          borderColor: colors.border,
        },
        style,
      ]}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`${deviceName}, ${deviceOS}, ${t("deviceInfo.location")}: ${deviceLocation}, ${t("deviceInfo.requested")}: ${requestedAt || t("deviceInfo.justNow")}, ${showBadge ? badgeLabel : ""}`}
    >
      {/* Device Header */}
      <View style={styles.deviceHeader}>
        <View
          style={[
            styles.deviceIconContainer,
            { backgroundColor: colors.iconBg },
          ]}
        >
          <Icon
            variant="material-community"
            name="cellphone"
            size={22}
            color={colors.icon}
          />
        </View>
        <View style={styles.deviceInfo}>
          <SharedText variant="body" style={styles.deviceName}>
            {deviceName}
          </SharedText>
          <SharedText variant="caption" color="slTextSecondary">
            {deviceOS}
          </SharedText>
        </View>
        {showBadge && badgeLabel && (
          <SharedBadge
            label={badgeLabel}
            variant={badgeVariant}
            iconName={badgeIcon}
            size={badgeSize}
          />
        )}
      </View>

      {/* Device Details */}
      <View
        style={[
          styles.deviceDetails,
          { backgroundColor: theme.colors.slSurfaceMuted },
        ]}
      >
        <View style={styles.detailRow}>
          <SharedText variant="caption" color="slTextMuted">
            {t("deviceInfo.location")}
          </SharedText>
          <SharedText variant="caption" style={styles.detailValue}>
            {deviceLocation}
          </SharedText>
        </View>
        <View style={styles.detailRow}>
          <SharedText variant="caption" color="slTextMuted">
            {t("deviceInfo.requested")}
          </SharedText>
          <SharedText variant="caption" style={styles.detailValue}>
            {requestedAt || t("deviceInfo.justNow")}
          </SharedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deviceCard: {
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  deviceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  deviceInfo: {
    flex: 1,
    gap: 2,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: "500",
  },
  deviceDetails: {
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailValue: {
    fontWeight: "500",
  },
});
