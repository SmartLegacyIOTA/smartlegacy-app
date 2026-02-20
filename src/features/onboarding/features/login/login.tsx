import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { useLogin } from "@/src/features/onboarding/features/login/hooks/use-login";
import * as AppleAuthentication from "expo-apple-authentication";

import { SharedButton } from "@/src/components/shared/shared-button";
import { Icon } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";
import { FeatureCard } from "@/src/features/onboarding/features/components/feature-card";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { APP_NAME } from "@/src/constants/app";

const Login = () => {
  const { t } = useI18nService();

  const { onApple, onGoogle, loadingGoogle, loadingApple } = useLogin();
  const theme = useTheme();

  const renderGoogleIcon = () => (
    <Image
      source={require("@/assets/app/google-logo.png")}
      style={styles.googleIcon}
      resizeMode="contain"
    />
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.slBg }]}
    >
      <View style={styles.container}>
        {/* Top Section */}
        <View style={styles.topSection}>
          {/* Logo Area */}
          <View style={styles.logoArea}>
            <View
              style={[
                styles.logoIcon,
                { backgroundColor: theme.colors.slAccent },
              ]}
            >
              <Icon
                variant={"material-community"}
                name={"shield-check"}
                size={40}
                color={theme.colors.white}
              />
            </View>
            <SharedText
              variant="h1"
              color="slText"
              style={{ fontSize: 28, letterSpacing: -0.5 }}
            >
              {APP_NAME}
            </SharedText>
            <SharedText
              variant="subtitle"
              color="slTextSecondary"
              style={{ fontSize: 16 }}
            >
              {t("login.identityVault")}
            </SharedText>
          </View>

          {/* Value Props */}
          <View style={styles.valueProps}>
            <SharedText
              variant="h2"
              color="slText"
              align="center"
              style={{ fontSize: 24, lineHeight: 31.2 }}
            >
              {t("login.secureLegacyTitle")}
            </SharedText>
            <SharedText
              variant="body"
              color="slTextSecondary"
              align="center"
              style={{ fontSize: 15, lineHeight: 22.5 }}
            >
              {t("login.secureLegacySubtitle")}
            </SharedText>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <FeatureCard
              iconName="face-recognition"
              iconColor={theme.colors.slAccent}
              iconBgColor={theme.colors.slAccentLight}
              title={t("login.featureIdentityTitle")}
              description={t("login.featureIdentityDesc")}
            />
            <FeatureCard
              iconName="account-group"
              iconColor={theme.colors.slPositive}
              iconBgColor={theme.colors.slPositiveLight}
              title={t("login.featureInheritanceTitle")}
              description={t("login.featureInheritanceDesc")}
            />
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <SharedButton
            variant="secondary"
            onPress={onGoogle}
            loading={loadingGoogle}
            disabled={loadingApple}
            leftIcon={renderGoogleIcon()}
            style={{ height: 52 }}
          >
            {t("login.continueWithGoogle")}
          </SharedButton>

          {Platform.OS === "ios" && (
            <>
              {/* Divider */}
              <View style={styles.dividerRow}>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: theme.colors.slBorder },
                  ]}
                />
                <SharedText
                  variant="caption"
                  color="slTextMuted"
                  style={{ fontSize: 13 }}
                >
                  {t("login.or")}
                </SharedText>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: theme.colors.slBorder },
                  ]}
                />
              </View>

              <AppleAuthentication.AppleAuthenticationButton
                buttonType={
                  AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
                }
                buttonStyle={
                  AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                }
                cornerRadius={26}
                style={styles.appleButton}
                onPress={onApple}
              />
            </>
          )}
          <SharedText
            variant="small"
            color="slTextMuted"
            align="center"
            style={{ fontSize: 11 }}
          >
            {t("login.termsAndPrivacy")}
          </SharedText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 28,
    paddingBottom: 32,
    justifyContent: "space-between",
  },
  topSection: {
    gap: 20,
  },
  logoArea: {
    alignItems: "center",
    gap: 24,
    width: "100%",
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  valueProps: {
    gap: 12,
    width: "100%",
  },
  features: {
    gap: 12,
    width: "100%",
  },
  bottomSection: {
    gap: 16,
    width: "100%",
  },
  googleIcon: {
    width: 20,
    height: 20,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  appleButton: {
    width: "100%",
    height: 52,
  },
});
