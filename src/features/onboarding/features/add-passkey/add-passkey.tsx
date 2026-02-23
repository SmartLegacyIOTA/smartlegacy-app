import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { SharedButton } from "@/src/components/shared/shared-button";
import { FeatureCard } from "@/src/features/onboarding/features/components/feature-card";
import { IntroSection } from "@/src/components/intro-section";
import { useRnPasskey } from "@/src/hooks/use-rn-passkey";

const AddPasskey = () => {
  const { t } = useI18nService();
  const theme = useTheme();

  const { onOpenPasskeyProvider, isLoadingActionOpen } = useRnPasskey();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Icon Container */}
        <IntroSection
          iconName="shield-check"
          title={t("addPasskey.title")}
          description={t("addPasskey.description")}
        />

        {/* Features List */}
        <View style={styles.featuresList}>
          <FeatureCard
            iconName="key-remove"
            iconColor={theme.colors.slAccent}
            iconBgColor={theme.colors.slAccentLight}
            title={t("addPasskey.feature1Title")}
            description={t("addPasskey.feature1Desc")}
          />
          <FeatureCard
            iconName="shield-lock"
            iconColor={theme.colors.slPositive}
            iconBgColor={theme.colors.slPositiveLight}
            title={t("addPasskey.feature2Title")}
            description={t("addPasskey.feature2Desc")}
          />
          <FeatureCard
            iconName="devices"
            iconColor={theme.colors.slAccent}
            iconBgColor={theme.colors.slAccentLight}
            title={t("addPasskey.feature3Title")}
            description={t("addPasskey.feature3Desc")}
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <SharedButton
          variant="primary"
          onPress={onOpenPasskeyProvider}
          loading={isLoadingActionOpen}
          leftIcon={{
            type: "icon",
            config: {
              name: "face-recognition",
              variant: "material-community",
              color: theme.colors.white,
            },
          }}
        >
          {t("addPasskey.createButton")}
        </SharedButton>
      </View>
    </View>
  );
};

export default AddPasskey;

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

  textGroup: {
    gap: 12,
    width: "100%",
  },
  featuresList: {
    gap: 16,
    width: "100%",
    paddingTop: 24,
  },
  bottomSection: {
    gap: 16,
    width: "100%",
  },
});
