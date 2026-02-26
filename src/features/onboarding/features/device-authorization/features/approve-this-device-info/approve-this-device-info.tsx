import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { IntroSection } from "@/src/components/intro-section";
import { SharedButton } from "@/src/components/shared/shared-button";
import { SharedCard } from "@/src/components/shared/shared-card";
import { SharedRow } from "@/src/components/shared/shared-row";
import { SharedAvatar } from "@/src/components/shared/shared-avatar";
import { SharedDivider } from "@/src/components/shared/shared-divider";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";
import { useTheme } from "@/src/framework/theme/use-theme";
import { useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { navigationCallbackRegistry } from "@/src/framework/utils/navigation-callback-registry";
import { logger } from "@/src/framework/utils/logger/logger";

const ApproveThisDeviceInfo = () => {
  const { t } = useI18nService();
  const theme = useTheme();
  const [_, requestPermission] = useCameraPermissions();
  const { scannedData: initialScannedData } = useLocalSearchParams<{
    scannedData?: string;
  }>();

  useEffect(() => {
    if (initialScannedData) {
      handleScannedData(initialScannedData);
    }
  }, [initialScannedData]);

  const handleScannedData = (data: string) => {
    logger
      .scope("DEVICE_AUTH")
      .info("Scanned data received", { hasData: !!data });
    // Aquí se puede llamar a la lógica de autorización con los datos escaneados
  };

  const steps = [
    { id: 1, text: t("deviceAuth.step1") },
    { id: 2, text: t("deviceAuth.step2") },
    { id: 3, text: t("deviceAuth.step3") },
  ];

  const onScanQR = () => {
    requestPermission().then(({ status }) => {
      if (status === "granted") {
        const onCompleteId = navigationCallbackRegistry.register((data) => {
          handleScannedData(data);
        });

        router.push({
          pathname: "/qr-code",
          params: { onCompleteId },
        });
      } else {
        // Handle permission denied case
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <IntroSection
          iconName="cellphone"
          title={t("deviceAuth.approveTitle")}
          description={t("deviceAuth.approveDescription")}
        />

        <View style={{ width: "100%", paddingTop: 40 }}>
          <SharedCard label={t("deviceAuth.stepsTitle")}>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <SharedRow
                  label={step.text}
                  containerStyle={styles.stepRow}
                  labelStyle={styles.stepLabel}
                  accessibilityLabel={step.text}
                  leftContent={
                    <SharedAvatar
                      variant="text"
                      text={step.id.toString()}
                      size="small"
                      bgColor="slAccent"
                      textThemeColor="white"
                      containerStyle={styles.stepNumber}
                      accessibilityLabel={step.id.toString()}
                    />
                  }
                />
                {index < steps.length - 1 && <SharedDivider />}
              </React.Fragment>
            ))}
          </SharedCard>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <SharedButton
          variant="primary"
          onPress={onScanQR}
          leftIcon={{
            type: "icon",
            config: {
              name: "qrcode-scan",
              variant: "material-community",
              color: theme.colors.white,
            },
          }}
        >
          {t("deviceAuth.scanQR")}
        </SharedButton>
      </View>
    </View>
  );
};

export default ApproveThisDeviceInfo;

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
  },
  stepsList: {
    paddingVertical: 8,
    width: "100%",
  },
  stepRow: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  stepLabel: {
    flex: 1,
    color: "#666",
    lineHeight: 20,
  },
  stepNumber: {
    width: 28,
    height: 28,
  },
  bottomSection: {
    width: "100%",
  },
});
