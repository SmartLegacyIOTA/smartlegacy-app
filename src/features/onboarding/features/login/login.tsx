import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { useLogin } from "@/src/features/onboarding/features/login/hooks/use-login";
import * as AppleAuthentication from "expo-apple-authentication";
import { SharedButton } from "@/src/components/shared/shared-button";
import { SharedText } from "@/src/components/shared/shared-text";
import { FeatureCard } from "@/src/features/onboarding/features/components/feature-card";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/framework/theme/use-theme";
import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

const Login = () => {
  const { t } = useI18nService();

  const {
    onApple,
    onGoogle,
    onPasskey,
    loadingGoogle,
    loadingApple,
    loadingPasskey,
    hasStoredPasskey,
  } = useLogin();
  const theme = useTheme();
  const { bottom, top } = useSafeAreaInsets();

  const renderGoogleIcon = () => (
    <Image
      source={require("@/assets/app/google-logo.png")}
      style={styles.googleIcon}
      resizeMode="contain"
    />
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.slBg,
          paddingBottom: Platform.select({
            ios: Math.max(bottom, 24),
            android: Math.max(bottom, 24),
          }),
          paddingTop: Platform.select({
            ios: Math.max(top, 24) + 30,
            android: Math.max(top, 24) + 30,
          }),
        },
      ]}
    >
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Logo Area */}
        <View style={styles.logoArea}>
          <Image
            source={require("@/assets/app/smart-lecy-icon.png")}
            style={styles.logoIcon}
            resizeMode="contain"
          />
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
        <FeatureCard
          iconName="face-recognition"
          iconColor={theme.colors.slAccent}
          iconBgColor={theme.colors.slAccentLight}
          title={t("login.featureIdentityTitle")}
          description={t("login.featureIdentityDesc")}
        />
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {hasStoredPasskey && (
          <SharedButton
            variant="primary"
            onPress={onPasskey}
            loading={loadingPasskey}
            disabled={loadingGoogle || loadingApple}
            leftIcon={{
              type: "icon",
              config: {
                name: "account-key",
                variant: "material-community",
                color: theme.colors.white,
              },
            }}
            style={{ height: 52, marginBottom: 30 }}
          >
            {t("login.continueWithPasskey")}
          </SharedButton>
        )}

        <SharedButton
          variant="secondary"
          onPress={onGoogle}
          loading={loadingGoogle}
          disabled={loadingApple || loadingPasskey}
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
          style={{
            fontSize: 11,
            marginTop: 5,
          }}
        >
          {t("login.termsAndPrivacy")}
        </SharedText>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  topSection: {
    gap: 20,
  },
  logoArea: {
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  logoIcon: {
    width: 80,
    height: 80,
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
    width: "100%",
    display: "flex",
    flexDirection: "column",
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
