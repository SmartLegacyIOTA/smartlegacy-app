import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { SharedCard } from "@/src/components/shared/shared-card";
import { SharedAvatar } from "@/src/components/shared/shared-avatar";
import { SharedBadge } from "@/src/components/shared/shared-badge";
import { SharedBanner } from "@/src/components/shared/shared-banner";
import { SharedButton } from "@/src/components/shared/shared-button";
import { SharedText } from "@/src/components/shared/shared-text";
import { SharedDivider } from "@/src/components/shared/shared-divider";
import { useLegacyRecovery } from "./hooks/use-legacy-recovery";
import { formatMoneyWithDecimals } from "@/src/utils/money";
import { IntroSection } from "@/src/components/intro-section";

const LegacyRecovery = () => {
  const theme = useTheme();
  const { t } = useI18nService();
  const { bottom } = useSafeAreaInsets();
  const { handleStartRecovery, mockData } = useLegacyRecovery();

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}
        >
          <IntroSection
            iconName="key-chain"
            title={t("legacyRecovery.authorizedTitle")}
            description={t("legacyRecovery.authorizedDescription")}
          />

          {/* Original Owner Card */}
          <SharedCard label={t("legacyRecovery.originalOwner")}>
            <View style={styles.ownerSection}>
              <View style={styles.ownerInfo}>
                <SharedAvatar
                  variant="text"
                  text={mockData.owner.initials}
                  size="small"
                  bgColor="slAccent"
                  accessibilityLabel={t("legacyRecovery.a11yOriginalOwner", {
                    name: mockData.owner.name,
                  })}
                />
                <View style={styles.ownerDetails}>
                  <SharedText
                    variant="label"
                    style={{
                      fontSize: 17,
                      fontWeight: "600",
                    }}
                  >
                    {mockData.owner.name}
                  </SharedText>
                  <SharedText
                    variant="body"
                    color="slTextSecondary"
                    style={{ fontSize: 14, marginTop: 2 }}
                  >
                    {mockData.owner.email}
                  </SharedText>
                </View>
              </View>
            </View>
          </SharedCard>

          {/* Vault Details */}
          <SharedCard label={t("legacyRecovery.vaultDetails")}>
            <View style={styles.detailRow}>
              <SharedText variant="body" color="slTextMuted">
                {t("legacyRecovery.balance")}
              </SharedText>
              <SharedText variant="label" style={{ fontWeight: "600" }}>
                {formatMoneyWithDecimals(mockData.balance)}
              </SharedText>
            </View>
            <SharedDivider />
            <View style={styles.detailRow}>
              <SharedText variant="body" color="slTextMuted">
                {t("legacyRecovery.inactiveSince")}
              </SharedText>
              <SharedText variant="label" style={{ fontWeight: "600" }}>
                {mockData.inactiveSince}
              </SharedText>
            </View>
            <SharedDivider />
            <View style={styles.detailRow}>
              <SharedText variant="body" color="slTextMuted">
                {t("legacyRecovery.status")}
              </SharedText>
              <SharedBadge
                label={t("legacyRecovery.pending")}
                variant="warning"
                size="sm"
              />
            </View>
          </SharedCard>

          {/* Warning Banner */}
          <SharedBanner
            title={t("legacyRecovery.verifiableCredentialTitle")}
            description={t("legacyRecovery.verifiableCredentialDescription")}
            variant="info"
            iconName="check-decagram-outline"
          />

          {/* Status Banner */}
          <SharedBanner
            description={t("legacyRecovery.irreversibleAction")}
            variant="warning"
            iconName="shield-alert-outline"
          />
        </ScrollView>

        {/* Action Button Container */}
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
            onPress={handleStartRecovery}
            leftIcon="key"
            accessibilityLabel={t("legacyRecovery.a11yStartRecovery")}
            accessibilityHint={t("legacyRecovery.a11yStartRecoveryHint")}
          >
            {t("legacyRecovery.startRecovery")}
          </SharedButton>
        </View>
      </View>
    </>
  );
};

export default LegacyRecovery;

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
  ownerSection: {
    padding: 16,
    gap: 16,
  },
  ownerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  ownerDetails: {
    flex: 1,
    gap: 2,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
