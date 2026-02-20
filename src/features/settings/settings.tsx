import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { SharedCard } from "@/src/components/shared/shared-card";
import { SharedRow } from "@/src/components/shared/shared-row";
import { SharedDivider } from "@/src/components/shared/shared-divider";
import { DemoModeRow } from "@/src/features/settings/components/demo/demo-mode-row";
import { useSettings } from "./hooks/use-settings";

const Settings = () => {
  const theme = useTheme();
  const { t } = useI18nService();
  const { bottom } = useSafeAreaInsets();

  const {
    userData,
    inactivityDays,
    demoMode,
    handleInactivityPeriodPress,
    handleAddTrustedHeirPress,
    handleDemoModeChange,
    handleResetTimer,
    handleSignOut,
  } = useSettings();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: Platform.select({
              ios: Math.max(bottom, 24),
              android: Math.max(bottom + 20, 40),
            }),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity Section */}
        <SharedCard label={t("settings.sectionIdentity")}>
          <SharedRow
            label={t("settings.name")}
            value={userData.name}
            accessibilityLabel={t("settings.a11yName", { name: userData.name })}
          />
          <SharedDivider />
          <SharedRow
            label={t("settings.email")}
            value={userData.email}
            accessibilityLabel={t("settings.a11yEmail", {
              email: userData.email,
            })}
          />
        </SharedCard>

        {/* Recovery Rules Section */}
        <SharedCard label={t("settings.sectionRecovery")}>
          <SharedRow
            label={t("settings.inactivityPeriod")}
            value={t("settings.days", { count: inactivityDays })}
            showChevron={true}
            onPress={handleInactivityPeriodPress}
            accessibilityLabel={t("settings.a11yInactivityPeriod", {
              days: t("settings.days", { count: inactivityDays }),
            })}
            accessibilityHint={t("settings.a11yInactivityHint")}
          />
          <SharedDivider />
          <SharedRow
            label={t("settings.recoveryGuardian")}
            showChevron={true}
            onPress={handleAddTrustedHeirPress}
            accessibilityLabel={t("settings.a11yRecoveryGuardian")}
            accessibilityHint={t("settings.a11yRecoveryGuardianHint")}
          />
          <SharedDivider />
          <DemoModeRow
            label={t("settings.demoMode")}
            description={t("settings.demoModeDescription")}
            value={demoMode}
            onValueChange={handleDemoModeChange}
            accessibilityLabel={t("settings.a11yDemoMode", {
              status: demoMode
                ? t("settings.a11yEnabled")
                : t("settings.a11yDisabled"),
            })}
            accessibilityHint={t("settings.a11yDemoModeHint")}
          />
        </SharedCard>

        {/* Security Section */}
        <SharedCard label={t("settings.sectionSecurity")}>
          <SharedRow
            label={t("settings.resetTimer")}
            iconName="timer-refresh"
            iconColor={theme.colors.slText}
            showChevron={true}
            onPress={handleResetTimer}
            accessibilityLabel={t("settings.a11yResetTimer")}
            accessibilityHint={t("settings.a11yResetTimerHint")}
          />
          <SharedDivider />
          <SharedRow
            label={t("settings.signOut")}
            iconName="logout"
            iconColor={theme.colors.slNegative}
            showChevron={true}
            onPress={handleSignOut}
            accessibilityLabel={t("settings.a11ySignOut")}
            accessibilityHint={t("settings.a11ySignOutHint")}
          />
        </SharedCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 24,
  },
  header: {
    marginBottom: 8,
  },
});

export default Settings;
