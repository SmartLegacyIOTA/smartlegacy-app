import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '@/src/components/ui/icon';
import { SharedText } from '@/src/components/shared/shared-text';
import { SharedAvatar } from '@/src/components/shared/shared-avatar';
import { useTheme } from '@/src/theme/use-theme';
import { useI18nService } from '@/src/libs/i18n/i18n-service';

interface HeaderSectionProps {
    userName: string;
    userInitials: string;
    onNotificationPress?: () => void;
}

export function HeaderSection({ userName, userInitials, onNotificationPress }: HeaderSectionProps) {
    const theme = useTheme();
    const { t } = useI18nService();

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <SharedAvatar
                    variant='text'
                    text={userInitials}
                    size='medium'
                    bgColor='slAccent'
                    textThemeColor='white'
                    accessibilityLabel={t('home.userAvatar', { name: userName })}
                />
                <View style={styles.greeting}>
                    <SharedText variant='caption' color='slTextMuted' style={{ fontSize: 13 }}>
                        {t('home.welcomeBack')}
                    </SharedText>
                    <SharedText
                        variant='label'
                        color='slText'
                        style={{ fontSize: 16, fontWeight: '600' }}
                    >
                        {userName}
                    </SharedText>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.notifBtn, { backgroundColor: theme.colors.slSurface }]}
                onPress={onNotificationPress}
                activeOpacity={0.8}
                accessibilityRole='button'
                accessibilityLabel={t('home.notifications')}
                accessibilityHint={t('home.notificationsHint')}
            >
                <Icon
                    variant='material-community'
                    name='bell'
                    size={20}
                    color={theme.colors.slText}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    greeting: {
        gap: 2
    },
    notifBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
