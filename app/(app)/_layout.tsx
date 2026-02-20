import { Stack } from "expo-router";
import "react-native-reanimated";
import { useI18nService } from "@/src/libs/i18n/i18n-service";
import { useTheme } from "@/src/theme/use-theme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function AppLayout() {
  const { t } = useI18nService();
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="(root)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(root)/add-trusted-heir"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: t("home.screenTitle"),
          headerStyle: {
            backgroundColor: theme.colors.slBg,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(root)/settings/inactivity-period"
        options={{
          title: t("inactivityPeriod.screenTitle"),
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: t("home.screenTitle"),
          headerStyle: {
            backgroundColor: theme.colors.slBg,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="(root)/legacy-recovery"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: t("home.screenTitle"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.slBg,
          },
        }}
      />
      <Stack.Screen
        name="(root)/confirm-recovery"
        options={{
          headerTitle: "",
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: t("legacyRecovery.screenTitle"),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.slBg,
          },
        }}
      />
      <Stack.Screen
        name="(root)/approve-new-device"
        options={{
          title: t("deviceAuth.approveNewDeviceTitle"),
          headerBackButtonDisplayMode: "minimal",
          headerBackTitle: t("home.screenTitle"),
          headerStyle: {
            backgroundColor: theme.colors.slBg,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
