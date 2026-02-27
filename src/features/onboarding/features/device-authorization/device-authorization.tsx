import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/framework/theme/use-theme";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { SharedButton } from "@/src/components/shared/shared-button";
import { SharedBanner } from "@/src/components/shared/shared-banner";
import { SharedText } from "@/src/components/shared/shared-text";
import { useDeviceAuthorization } from "./hooks/use-device-authorization";
import { IntroSection } from "@/src/components/intro-section";
import { Stack } from "expo-router";
import { Icon } from "@/src/components/ui/icon";

const DeviceAuthorization = () => {
  const { t } = useI18nService();
  const theme = useTheme();
  const { onAuthorize, onReject, onPasskeyLogin, loading, loadingPasskey } =
    useDeviceAuthorization();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={onReject} disabled={loading}>
              <Icon
                variant="material"
                name="chevron-left"
                size={36}
                color={theme.colors.black}
              />
            </TouchableOpacity>
          ),
        }}
      />
      {/* Top Section */}
      <View style={styles.topSection}>
        <IntroSection
          bgColor={"slWarningLight"}
          iconThemeColor={"slWarning"}
          iconName="shield-alert"
          title={t("deviceAuth.approveTitle")}
          description={t("deviceAuth.approveDescription")}
        />

        <View style={styles.bannerContainer}>
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
          disabled={loadingPasskey}
          leftIcon={{
            type: "icon",
            config: {
              name: "qrcode-scan",
              variant: "material-community",
              color: theme.colors.white,
            },
          }}
        >
          {t("deviceAuth.authorize")}
        </SharedButton>

        <View style={styles.passkeyContainer}>
          <SharedText
            variant="small"
            color="slTextSecondary"
            style={styles.recoveryTitle}
          >
            {t("deviceAuth.alreadyHadAccess")}
          </SharedText>
          <SharedButton
            variant="inverse"
            onPress={onPasskeyLogin}
            disabled={loading}
            loading={loadingPasskey}
            leftIcon={{
              type: "icon",
              config: {
                name: "account-key",
                variant: "material-community",
                color: theme.colors.white,
              },
            }}
          >
            {t("deviceAuth.continueWithPasskey")}
          </SharedButton>
        </View>
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
  bannerContainer: {
    width: "100%",
    paddingTop: 8,
  },
  bottomSection: {
    gap: 16,
    width: "100%",
  },
  passkeyContainer: {
    marginTop: 12,
    gap: 12,
  },
  recoveryContainer: {
    marginTop: 12,
    alignItems: "center",
    gap: 8,
  },
  recoveryTitle: {
    marginBottom: 4,
    opacity: 0.8,
  },
  recoveryOptions: {
    width: "100%",
    gap: 4,
  },
  recoveryButton: {
    paddingVertical: 4,
    justifyContent: "flex-start",
    height: 40,
  },
  recoveryButtonText: {
    fontSize: 14,
  },
});
