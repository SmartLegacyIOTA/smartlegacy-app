import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/src/components/haptic-tab";
import { IconSymbol } from "@/src/components/ui/icon-symbol";
import { useTheme } from "@/src/theme/use-theme";
import { useI18nService } from "@/src/libs/i18n/i18n-service";

export default function TabLayout() {
  const theme = useTheme();
  const { t } = useI18nService();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.slAccent,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.screenTitle"),
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings.screenTitle"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.slBg,
          },
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
