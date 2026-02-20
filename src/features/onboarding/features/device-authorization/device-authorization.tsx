import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { SharedButton } from "@/src/components/shared/shared-button";
import { SharedBanner } from "@/src/components/shared/shared-banner";
import { useDeviceAuthorization } from "./hooks/use-device-authorization";
import { IntroSection } from "@/src/components/intro-section";

const DeviceAuthorization = () => {
  const { t } = useI18nService();
  const theme = useTheme();
  const { onAuthorize, onReject, loading } = useDeviceAuthorization();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <IntroSection
          bgColor={"slWarningLight"}
          iconThemeColor={"slWarning"}
          iconName="shield-alert"
          title={t("deviceAuth.title")}
          description={t("deviceAuth.description")}
        />

        <View style={styles.featuresList}>
          <SharedBanner
            description={t("deviceAuth.bannerDescription")}
            variant="info"
            iconName="information-outline"
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <SharedButton
          variant="primary"
          onPress={onAuthorize}
          loading={loading}
          leftIcon={{
            type: "icon",
            config: {
              name: "cellphone-lock",
              variant: "material-community",
              color: theme.colors.white,
            },
          }}
        >
          {t("deviceAuth.authorize")}
        </SharedButton>

        <SharedButton variant="secondary" onPress={onReject} disabled={loading}>
          {t("deviceAuth.cancel")}
        </SharedButton>
      </View>
    </View>
  );
};

export default DeviceAuthorization;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  topSection: {
    gap: 32,
    alignItems: "center",
    width: "100%",
  },
  featuresList: {
    gap: 16,
    width: "100%",
    paddingTop: 8,
  },
  bottomSection: {
    gap: 16,
    width: "100%",
  },
});
