import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/theme/use-theme';
import { useI18nService } from '@/src/libs/i18n/i18n-service';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SharedAvatar } from '@/src/components/shared/shared-avatar';
import { SharedText } from '@/src/components/shared/shared-text';
import { SharedBadge } from '@/src/components/shared/shared-badge';
import { SharedButton } from '@/src/components/shared/shared-button';
import { SharedBanner } from '@/src/components/shared/shared-banner';
import { DeviceInfo } from '@/src/components/device-info';

interface ApproveNewDeviceProps {
    userEmail?: string;
    userInitials?: string;
    deviceName?: string;
    deviceOS?: string;
    deviceLocation?: string;
    onApprove?: () => void;
    onReject?: () => void;
}

const ApproveNewDevice = ({
    userEmail = 'john.doe@email.com',
    userInitials = 'JD',
    deviceName = 'iPhone 15 Pro',
    deviceOS = 'iOS 17.4',
    deviceLocation = 'Madrid, Spain',
    onApprove,
    onReject
}: ApproveNewDeviceProps) => {
    const theme = useTheme();
    const { t } = useI18nService();
    const { bottom } = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingBottom: Platform.select({
                            ios: Math.max(bottom, 24),
                            android: Math.max(bottom + 20, 40)
                        })
                    }
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Top Content */}
                <View style={styles.topContent}>
                    {/* Account Card */}
                    <View
                        style={[
                            styles.accountCard,
                            {
                                backgroundColor: theme.colors.slSurface,
                                borderColor: theme.colors.slBorder
                            }
                        ]}
                        accessible={true}
                        accessibilityRole='text'
                        accessibilityLabel={`${t('deviceAuth.yourAccount')}: ${userEmail}, ${t('deviceAuth.trusted')}`}
                    >
                        <SharedAvatar
                            variant='text'
                            text={userInitials}
                            size='medium'
                            bgColor='slAccent'
                        />
                        <View style={styles.accountInfo}>
                            <SharedText
                                variant='caption'
                                color='slTextMuted'
                                style={styles.accountLabel}
                            >
                                {t('deviceAuth.yourAccount')}
                            </SharedText>
                            <SharedText variant='body' style={styles.accountEmail}>
                                {userEmail}
                            </SharedText>
                        </View>
                        <SharedBadge
                            label={t('deviceAuth.trusted')}
                            variant='success'
                            iconName='shield-check'
                            size='sm'
                        />
                    </View>

                    {/* Device Section */}
                    <View style={styles.deviceSection}>
                        <SharedText
                            variant='caption'
                            color='slTextMuted'
                            style={styles.deviceSectionLabel}
                        >
                            {t('deviceAuth.deviceRequesting')}
                        </SharedText>

                        <DeviceInfo
                            deviceName={deviceName}
                            deviceOS={deviceOS}
                            deviceLocation={deviceLocation}
                            variant='warning'
                            badgeConfig={{
                                size: 'sm',
                                variant: 'warning',
                                iconName: 'shield-alert-outline',
                                label: t('deviceInfo.pending')
                            }}
                        />
                    </View>

                    {/* Warning Card */}
                    <SharedBanner title={t('deviceAuth.onlyApproveDevices')} variant={'warning'} />
                </View>

                {/* Spacer */}
                <View style={styles.spacer} />

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                    <SharedButton
                        variant='primary'
                        onPress={onApprove}
                        accessibilityLabel={t('deviceAuth.continue')}
                        accessibilityHint='Approve this device and grant access'
                    >
                        {t('deviceAuth.continue')}
                    </SharedButton>
                    <SharedButton
                        variant='secondary'
                        onPress={onReject}
                        textStyle={{ color: theme.colors.slNegative }}
                        accessibilityLabel={t('deviceAuth.reject')}
                        accessibilityHint='Reject this device and deny access'
                    >
                        {t('deviceAuth.reject')}
                    </SharedButton>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        flex: 1
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
        gap: 20
    },
    topContent: {
        gap: 20
    },
    accountCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1
    },
    accountInfo: {
        flex: 1,
        gap: 2
    },
    accountLabel: {
        fontSize: 12
    },
    accountEmail: {
        fontSize: 15,
        fontWeight: '500'
    },
    deviceSection: {
        gap: 12
    },
    deviceSectionLabel: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.3
    },
    warningCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 14,
        borderRadius: 12
    },
    warningText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500'
    },
    spacer: {
        flex: 1,
        minHeight: 24
    },
    bottomSection: {
        gap: 12
    }
});

export default ApproveNewDevice;
