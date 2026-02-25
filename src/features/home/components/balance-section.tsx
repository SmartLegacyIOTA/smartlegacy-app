import React from "react";
import { StyleSheet, View } from "react-native";
import { SharedText } from "@/src/components/shared/shared-text";

import { useI18nService } from "@/src/framework/libs/i18n/i18n-service";

interface BalanceSectionProps {
  totalBalance: string;
  usdcBalance: string;
}

export function BalanceSection({
  totalBalance,
  usdcBalance,
}: BalanceSectionProps) {
  const { t } = useI18nService();

  return (
    <View style={styles.container}>
      <SharedText
        variant="caption"
        color="slTextMuted"
        style={{ fontSize: 13 }}
      >
        {t("home.totalBalance")}
      </SharedText>
      <SharedText
        variant="h1"
        color="slText"
        style={{ fontSize: 32, fontWeight: "300", letterSpacing: -0.5 }}
        accessibilityLabel={t("home.totalBalanceA11y", {
          amount: totalBalance.replace(/\$/g, "").replace(/,/g, ""),
        })}
      >
        {totalBalance}
      </SharedText>
      <SharedText
        variant="body"
        color="slTextSecondary"
        style={{ fontSize: 14 }}
      >
        {usdcBalance}
      </SharedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: "100%",
    paddingVertical: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
