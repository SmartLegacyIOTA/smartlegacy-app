import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { useI18nService } from '@/src/libs/i18n/i18n-service';
import { useSession } from '@/src/providers/session';
import { useCurrentUser } from '@/src/providers/user';

export interface UserData {
    name: string;
    email: string;
}

export function useSettings() {
    const { t } = useI18nService();
    const { signOut } = useSession();
    const { setUser } = useCurrentUser();

    // Mock user data - replace with actual data source
    const [userData] = useState<UserData>({
        name: 'John Doe',
        email: 'john.doe@email.com'
    });

    // Recovery settings
    const [inactivityDays, setInactivityDays] = useState(365);
    const [demoMode, setDemoMode] = useState(false);

    const handleInactivityPeriodPress = useCallback(() => {
        router.push('/settings/inactivity-period');
    }, []);

    const handleAddTrustedHeirPress = useCallback(() => {
        router.push('/add-trusted-heir');
    }, []);

    const handleDemoModeChange = useCallback((value: boolean) => {
        setDemoMode(value);
        // TODO: Persist setting
    }, []);

    const handleResetTimer = useCallback(() => {
        Alert.alert(t('settings.resetTimerTitle'), t('settings.resetTimerMessage'), [
            {
                text: t('settings.cancel'),
                style: 'cancel'
            },
            {
                text: t('settings.reset'),
                style: 'destructive',
                onPress: () => {
                    // TODO: API call to reset timer
                    console.log('Reset timer');
                }
            }
        ]);
    }, [t]);

    const handleSignOut = useCallback(() => {
        Alert.alert(t('settings.signOutTitle'), t('settings.signOutMessage'), [
            {
                text: t('settings.cancel'),
                style: 'cancel'
            },
            {
                text: t('settings.signOut'),
                style: 'destructive',
                onPress: () => {
                    signOut();
                    setUser(null);
                }
            }
        ]);
    }, [signOut, setUser, t]);

    return {
        userData,
        inactivityDays,
        demoMode,
        handleInactivityPeriodPress,
        handleAddTrustedHeirPress,
        handleDemoModeChange,
        handleResetTimer,
        handleSignOut
    };
}
