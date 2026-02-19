import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SharedText } from '@/src/components/shared/shared-text';
import { SharedAvatar } from '@/src/components/shared/shared-avatar';
import { Icon } from '@/src/components/ui/icon';
import { useTheme } from '@/src/theme/use-theme';
import { useI18nService } from '@/src/libs/i18n/i18n-service';

interface GuardianCardProps {
    name: string;
    email: string;
    initials: string;
    isVerified: boolean;
    onManage?: () => void;
}

export function GuardianCard({ name, email, initials, isVerified, onManage }: GuardianCardProps) {
    const theme = useTheme();
    const { t } = useI18nService();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SharedText
                    variant='label'
                    color='slTextMuted'
                    style={{ fontSize: 13, fontWeight: '500', letterSpacing: 0.3 }}
                >
                    {t('home.recoveryGuardian')}
                </SharedText>
                {onManage && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onManage}
                        accessibilityRole='button'
                        accessibilityLabel={t('home.manage')}
                        accessibilityHint={t('home.manageHint')}
                    >
                        <SharedText
                            variant='label'
                            color='slAccent'
                            style={{ fontSize: 13, fontWeight: '500' }}
                        >
                            {t('home.manage')}
                        </SharedText>
                    </TouchableOpacity>
                )}
            </View>
            <View style={[styles.card, { backgroundColor: theme.colors.slSurface }]}>
                <SharedAvatar
                    variant='text'
                    text={initials}
                    size='medium'
                    bgColor='slAccentLight'
                    textThemeColor='slAccent'
                    accessibilityLabel={t('home.guardianAvatar', { name: name })}
                />
                <View style={styles.info}>
                    <SharedText
                        variant='label'
                        color='slText'
                        style={{ fontSize: 15, fontWeight: '500' }}
                    >
                        {name}
                    </SharedText>
                    <SharedText variant='caption' color='slTextMuted' style={{ fontSize: 13 }}>
                        {email}
                    </SharedText>
                </View>
                {isVerified && (
                    <View
                        style={[
                            styles.verifiedBadge,
                            { backgroundColor: theme.colors.slAccentLight }
                        ]}
                    >
                        <Icon
                            variant='material-community'
                            name='shield-check'
                            size={12}
                            color={theme.colors.slAccent}
                        />
                        <SharedText
                            variant='label'
                            color='slAccent'
                            style={{ fontSize: 11, fontWeight: '500' }}
                        >
                            {t('home.verified')}
                        </SharedText>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
        width: '100%'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        width: '100%'
    },
    info: {
        flex: 1,
        gap: 2
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12
    }
});
