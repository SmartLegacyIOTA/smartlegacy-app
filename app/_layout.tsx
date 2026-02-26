import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useColorScheme } from "@/src/framework/hooks/use-color-scheme";
import { MeThemeProvider } from "@/src/framework/theme/theme-context";
import { AuthProvider, useAuth } from "@/src/framework/providers/auth";
import {
  I18nProvider,
  useI18nService,
} from "@/src/framework/libs/i18n/i18n-service";
import { useTheme } from "@/src/framework/theme/use-theme";
import { MyApiProvider } from "@/src/framework/api/api-provider";
import { ToastProvider } from "@/src/framework/providers/ToastProvider";
import { useQueryGetMe } from "@/src/framework/api/rq/auth/get-me";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      staleTime: 1000 * 60 * 1,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

export default function Root() {
  SplashScreen.preventAutoHideAsync();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <ApiWrapper>
              <I18nProvider>
                <RootNavigator />
              </I18nProvider>
            </ApiWrapper>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function ApiWrapper({ children }: { children: React.ReactNode }) {
  const { token, closeAndRemoveSession } = useAuth();
  return (
    <MyApiProvider
      token={token}
      logoutFn={() => {
        closeAndRemoveSession();
      }}
    >
      {children}
    </MyApiProvider>
  );
}

const RootNavigator = () => {
  const { token, user, isLoading } = useAuth();
  useQueryGetMe(!!token);

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { t } = useI18nService();

  if (isLoading) return null;

  SplashScreen.hide();

  // User has no session -> show bootstrap
  const shouldShowBootstrap = !token;

  const showApp = !!token && user?.nextStep === "APP";
  const showCreatePasskey = !!token && user?.nextStep === "CREATE_PASSKEY";
  const showDeviceApproval = !!token && user?.nextStep === "DEVICE_APPROVAL";

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <MeThemeProvider>
        <Stack
          screenOptions={{
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
          }}
        >
          <Stack.Protected guard={showApp}>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack.Protected>

          <Stack.Protected guard={shouldShowBootstrap}>
            <Stack.Screen
              name="onboarding/sign-in"
              options={{ headerShown: false }}
            />
          </Stack.Protected>

          <Stack.Protected guard={showDeviceApproval}>
            <Stack.Screen
              name="onboarding/(device-authorization)/device-authorization"
              options={{
                headerTitle: "",
                headerBackVisible: false,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: theme.colors.slBg,
                },
              }}
            />
            <Stack.Screen
              name="onboarding/(device-authorization)/approve-this-device"
              options={{
                headerTitle: "",
                headerBackVisible: false,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: theme.colors.slBg,
                },
              }}
            />
          </Stack.Protected>

          <Stack.Protected guard={showCreatePasskey}>
            <Stack.Screen
              name="onboarding/add-passkey"
              options={{
                headerTitle: "",
                headerBackVisible: false,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: theme.colors.slBg,
                },
              }}
            />
          </Stack.Protected>

          {/*<Stack.Screen*/}
          {/*  name="modal"*/}
          {/*  options={{ presentation: "modal", title: "Modal" }}*/}
          {/*/>*/}

          <Stack.Screen
            name="qr-code"
            options={{
              title: t("scanQr"),
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: theme.colors.slBg,
              },
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </MeThemeProvider>
    </ThemeProvider>
  );
};
