import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { MeThemeProvider } from '@/src/theme/theme-context';
import { SessionProvider, useSession } from '@/src/providers/session';
import { UserProvider, useCurrentUser } from '@/src/providers/user';
import { I18nProvider, useI18nService } from '@/src/libs/i18n/i18n-service';
import { useTheme } from '@/src/theme/use-theme';

export default function Root() {
    SplashScreen.preventAutoHideAsync();

    return (
        <SessionProvider>
            <UserProvider>
                <I18nProvider>
                    <RootNavigator />
                </I18nProvider>
            </UserProvider>
        </SessionProvider>
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

    // User has no session -> show login
    const shouldShowLogin = !session;

    // User has session and is a new/unauthorized device -> show device authorization
    const shouldShowDeviceAuthorization =
        !!session && user?.isNewDevice === true && !user?.hasPasskey;

    // User has session but no secure access (no passkey or UNSECURED) -> show add-passkey
    const shouldShowAddPasskey = !!session && user?.isNewDevice !== true && !user?.hasPasskey;

    // User has session and secure access -> show app
    const shouldShowApp = !!session && !!user?.hasPasskey && user?.securityLevel === 'SECURED';

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <MeThemeProvider>
                <Stack
                    screenOptions={{
                        gestureEnabled: true,
                        fullScreenGestureEnabled: true
                    }}
                >
                    <Stack.Protected guard={shouldShowApp}>
                        <Stack.Screen name='(app)' options={{ headerShown: false }} />
                    </Stack.Protected>

                    <Stack.Protected guard={shouldShowLogin}>
                        <Stack.Screen name='onboarding/sign-in' options={{ headerShown: false }} />
                    </Stack.Protected>

                    <Stack.Protected guard={shouldShowDeviceAuthorization}>
                        <Stack.Screen
                            name='onboarding/(device-authorization)/device-authorization'
                            options={{
                                headerTitle: '',
                                headerBackVisible: false,
                                headerShadowVisible: false,
                                headerStyle: {
                                    backgroundColor: theme.colors.slBg
                                }
                            }}
                        />
                        <Stack.Screen
                            name='onboarding/(device-authorization)/approve-this-device'
                            options={{
                                headerTitle: '',
                                headerBackVisible: false,
                                headerShadowVisible: false,
                                headerStyle: {
                                    backgroundColor: theme.colors.slBg
                                }
                            }}
                        />
                    </Stack.Protected>

                    <Stack.Protected guard={shouldShowAddPasskey}>
                        <Stack.Screen
                            name='onboarding/add-passkey'
                            options={{
                                headerTitle: '',
                                headerBackVisible: false,
                                headerShadowVisible: false,
                                headerStyle: {
                                    backgroundColor: theme.colors.slBg
                                }
                            }}
                        />
                    </Stack.Protected>

                    <Stack.Screen
                        name='modal'
                        options={{ presentation: 'modal', title: 'Modal' }}
                    />

                    <Stack.Screen
                        name='qr-code'
                        options={{
                            title: t('scanQr'),
                            headerShadowVisible: false,
                            headerStyle: {
                                backgroundColor: theme.colors.slBg
                            }
                        }}
                    />
                </Stack>
                <StatusBar style='auto' />
            </MeThemeProvider>
        </ThemeProvider>
    );
};
