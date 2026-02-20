import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/src/theme/use-theme";
import { SharedText } from "@/src/components/shared/shared-text";
import { SharedEmptyState } from "@/src/components/shared/shared-empty-state";
import { SharedBanner } from "@/src/components/shared/shared-banner";
import { useHome } from "./hooks/use-home";
import { HeaderSection } from "./components/header-section";
import { LabelSection } from "./components/label-section";
import { StatusCard } from "./components/status-card";
import { DetailRow } from "./components/detail-row";
import { BalanceSection } from "./components/balance-section";
import { GuardianCard } from "./components/guardian-card";
import { ActivityItem } from "./components/activity-item";

import { useI18nService } from "@/src/libs/i18n/i18n-service";

const Home = () => {
  const theme = useTheme();
  const { t } = useI18nService();
  const {
    handleNotificationPress,
    handleManageGuardian,
    handleLegacyRecovery,
  } = useHome();

  // Mock data - Replace with real data from your state management
  const [hasLegacyRecoveryPending] = useState(true); // Change to false to hide banner
  const [hasGuardian] = useState(true); // Change to false to see empty state
  const [activities] = useState([
    {
      id: "1",
      iconName: "account-plus",
      title: t("home.guardianAdded"),
      timestamp: t("home.daysAgo", { count: 2 }),
    },
    {
      id: "2",
      iconName: "shield",
      title: t("home.vaultCreated"),
      timestamp: t("home.daysAgo", { count: 3 }),
    },
  ]); // Change to [] to see empty state

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.slBg }]}
      edges={["top"]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity Layer Label */}
        <LabelSection
          iconName="face-recognition"
          label={t("home.identityLayer")}
          tagText={t("home.iotaDid")}
          color={theme.colors.slAccent}
          lightColor={theme.colors.slAccentLight}
        />

        {/* Header */}
        <HeaderSection
          userName="John Doe"
          userInitials="JD"
          onNotificationPress={handleNotificationPress}
        />

        {/* Legacy Recovery Banner */}
        {hasLegacyRecoveryPending && (
          <SharedBanner
            title={t("home.legacyRecoveryBannerTitle")}
            description={t("home.legacyRecoveryBannerDescription")}
            variant="info"
            iconName="account-arrow-right"
            onPress={handleLegacyRecovery}
            accessibilityLabel={t("home.legacyRecoveryBannerA11y")}
            accessibilityHint={t("home.legacyRecoveryBannerHint")}
          />
        )}

        {/* Identity Status Card */}
        <StatusCard
          title={t("home.yourIdentity")}
          badgeText={t("home.active")}
          badgeColor={theme.colors.slPositive}
          badgeBgColor={theme.colors.slPositiveLight}
          borderColor={theme.colors.slAccent}
          iconBgColor={theme.colors.slPositiveLight}
          iconColor={theme.colors.slPositive}
          iconName="shield-check-outline"
        >
          <View
            style={[
              styles.detailsBox,
              { backgroundColor: theme.colors.slSurfaceMuted },
            ]}
          >
            <DetailRow
              label={t("home.identityDid")}
              value="did:iota:...x7l5"
              iconName="fingerprint"
            />
            <DetailRow
              label={t("home.smartAccount")}
              value="0x6a4...2f1b"
              iconName="wallet"
            />
          </View>
        </StatusCard>

        {/* Assets Layer Label */}
        <LabelSection
          iconName="wallet"
          label={t("home.assetsLayer")}
          tagText={t("home.polygon")}
          color={theme.colors.slPositive}
          lightColor={theme.colors.slPositiveLight}
        />

        {/* Vault Status Card */}
        <StatusCard
          title={t("home.vaultStatus")}
          badgeText={t("home.secure")}
          badgeColor={theme.colors.slPositive}
          badgeBgColor={theme.colors.slPositiveLight}
          borderColor={theme.colors.slPositive}
          iconBgColor={theme.colors.slAccentLight}
          iconColor={theme.colors.slAccent}
          iconName="lock-outline"
        >
          <BalanceSection
            totalBalance={t("home.balanceAmount", { amount: "12,450.00" })}
            usdcBalance={t("home.usdcAmount", { amount: "12,450" })}
          />
        </StatusCard>

        {/* Recovery Guardian Section */}
        {hasGuardian ? (
          <GuardianCard
            name="Sarah Ellis"
            email="sarah.ellis@email.com"
            initials="SE"
            isVerified={true}
            onManage={handleManageGuardian}
          />
        ) : (
          <SharedEmptyState
            iconName="account-plus"
            title={t("home.emptyGuardianTitle")}
            description={t("home.emptyGuardianDescription")}
            actionLabel={t("home.emptyGuardianAction")}
            onAction={handleManageGuardian}
            accessibilityLabel={t("home.emptyGuardianA11y")}
          />
        )}

        {/* Recent Activity Section */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <SharedText
              variant="label"
              color="slTextMuted"
              style={{ fontSize: 13, fontWeight: "500", letterSpacing: 0.3 }}
            >
              {t("home.recentActivity")}
            </SharedText>
          </View>
          {activities.length > 0 ? (
            <View
              style={[
                styles.activityList,
                { backgroundColor: theme.colors.slSurface },
              ]}
            >
              {activities.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ActivityItem
                    iconName={activity.iconName as any}
                    iconColor={
                      index === 0
                        ? theme.colors.slAccent
                        : theme.colors.slPositive
                    }
                    iconBgColor={
                      index === 0
                        ? theme.colors.slAccentLight
                        : theme.colors.slPositiveLight
                    }
                    title={activity.title}
                    timestamp={activity.timestamp}
                  />
                  {index < activities.length - 1 && (
                    <View
                      style={[
                        styles.divider,
                        { backgroundColor: theme.colors.slBorder },
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
          ) : (
            <View
              style={[
                styles.activityList,
                { backgroundColor: theme.colors.slSurface },
              ]}
            >
              <SharedEmptyState
                iconName="history"
                title={t("home.emptyActivityTitle")}
                description={t("home.emptyActivityDescription")}
                accessibilityLabel={t("home.emptyActivityA11y")}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
    gap: 12,
  },
  detailsBox: {
    padding: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  activitySection: {
    gap: 12,
    width: "100%",
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  activityList: {
    borderRadius: 12,
    overflow: "hidden",
  },
  divider: {
    height: 1,
    marginHorizontal: 14,
  },
});
