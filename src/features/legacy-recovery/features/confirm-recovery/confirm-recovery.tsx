import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { SharedCard } from "@/src/components/shared/shared-card";
import { SharedButton } from "@/src/components/shared/shared-button";
import { SharedCheckbox } from "@/src/components/shared/shared-checkbox";
import { SharedDivider } from "@/src/components/shared/shared-divider";
import { IntroSection } from "@/src/components/intro-section";
import { formatMoneyWithDecimals } from "@/src/utils/money";
import { useConfirmRecovery } from "./hooks/use-confirm-recovery";
import { SharedRow } from "@/src/components/shared/shared-row";

const ConfirmRecovery = () => {
  const theme = useTheme();
  const { t } = useI18nService();
  const { bottom } = useSafeAreaInsets();
  const { handleConfirmRecovery, mockData } = useConfirmRecovery();

  const [checkboxes, setCheckboxes] = useState({
    understand: false,
    authorized: false,
  });

  const allChecked = Object.values(checkboxes).every((value) => value);

  const handleCheckboxChange = (key: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        <IntroSection
          iconName="shield-alert"
          title={t("confirmRecovery.title")}
          description={t("confirmRecovery.description")}
          bgColor={"slNegativeLight"}
          iconThemeColor={"slNegative"}
        />

        {/* Transfer Summary Card */}
        <SharedCard containerStyle={{ marginTop: 20 }}>
          <SharedRow
            iconName={"file"}
            containerStyle={{ backgroundColor: theme.colors.slSurfaceMuted }}
            label={t("confirmRecovery.transferSummary")}
          />
          <SharedRow
            label={t("confirmRecovery.from")}
            value={mockData.owner.name}
          />
          <SharedRow
            containerStyle={{ paddingTop: 0 }}
            label={t("confirmRecovery.to")}
            value={"My Identity (DID)"}
          />
          <SharedDivider />
          <SharedRow
            label={t("confirmRecovery.assets")}
            value={formatMoneyWithDecimals(mockData.balance)}
          />
        </SharedCard>

        {/* Confirmation Checkboxes */}
        <View style={styles.checkboxContainer}>
          <SharedCheckbox
            label={t("confirmRecovery.checkUnderstand")}
            checked={checkboxes.understand}
            onValueChange={() => handleCheckboxChange("understand")}
            accessibilityLabel={t("confirmRecovery.a11yCheckUnderstand")}
          />
          <SharedCheckbox
            label={t("confirmRecovery.checkAuthorized")}
            checked={checkboxes.authorized}
            onValueChange={() => handleCheckboxChange("authorized")}
            accessibilityLabel={t("confirmRecovery.a11yCheckAuthorized")}
          />
        </View>
      </ScrollView>

      {/* Action Buttons Container */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: Platform.select({
              ios: Math.max(bottom, 24),
              android: Math.max(bottom, 24),
            }),
          },
        ]}
      >
        <SharedButton
          variant="destructive"
          onPress={handleConfirmRecovery}
          disabled={!allChecked}
          leftIcon={{
            type: "icon",
            config: {
              name: "shield-alert-outline",
              variant: "material-community",
              color: theme.colors.white,
            },
          }}
          accessibilityLabel={t("confirmRecovery.a11yConfirm")}
          accessibilityHint={t("confirmRecovery.a11yConfirmHint")}
        >
          {t("confirmRecovery.confirmRecovery")}
        </SharedButton>

        <SharedButton
          variant="secondary"
          onPress={() => router.back()}
          accessibilityLabel={t("confirmRecovery.a11yCancel")}
          accessibilityHint={t("confirmRecovery.a11yCancelHint")}
        >
          {t("confirmRecovery.cancel")}
        </SharedButton>
      </View>
    </View>
  );
};

export default ConfirmRecovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  checkboxContainer: {
    gap: 20,
    marginTop: 30,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    flexDirection: "column",
  },
});
