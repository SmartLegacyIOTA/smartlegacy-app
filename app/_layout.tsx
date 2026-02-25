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
import { SessionProvider, useSession } from "@/src/framework/providers/session";
import { UserProvider, useCurrentUser } from "@/src/framework/providers/user";
import {
  I18nProvider,
  useI18nService,
} from "@/src/framework/libs/i18n/i18n-service";
import { useTheme } from "@/src/framework/theme/use-theme";
import { MyApiProvider } from "@/src/framework/api/api-provider";
import { ToastProvider } from "@/src/framework/providers/ToastProvider";

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
          <SessionProvider>
            <UserProvider>
              <ApiWrapper>
                <I18nProvider>
                  <RootNavigator />
                </I18nProvider>
              </ApiWrapper>
            </UserProvider>
          </SessionProvider>
        </ToastProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

function ApiWrapper({ children }: { children: React.ReactNode }) {
  const { session, signOut } = useSession();
  const { setUser } = useCurrentUser();
  return (
    <MyApiProvider
      token={session || ""}
      logoutFn={() => {
        signOut();
        setUser(null);
      }}
    >
      {children}
    </MyApiProvider>
  );
}

const RootNavigator = () => {
  const { session, isLoading: sessionLoading } = useSession();
  const { user, isLoading: userLoading } = useCurrentUser();
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { t } = useI18nService();

  const isLoading = sessionLoading || userLoading;

  if (isLoading) return null;

  SplashScreen.hide();

  // User has no session -> show bootstrap
  const shouldShowBootstrap = !session || user?.nextStep === "SIGN_IN";

  const showApp = user?.nextStep === "APP";
  const showCreatePasskey = user?.nextStep === "CREATE_PASSKEY";
  const showDeviceApproval = user?.nextStep === "DEVICE_APPROVAL";

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
              name="onboarding/auth-bootstrap"
              options={{ headerShown: false }}
            />
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

          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />

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
