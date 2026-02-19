import React from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/src/theme/use-theme';
import { useI18nService } from '@/src/libs/i18n/i18n-service';
import { SharedText } from '@/src/components/shared/shared-text';
import { SharedButton } from '@/src/components/shared/shared-button';
import { SharedCard } from '@/src/components/shared/shared-card';
import { SharedRow } from '@/src/components/shared/shared-row';
import { SharedDivider } from '@/src/components/shared/shared-divider';
import { PeriodOption } from './components/period-option';
import { PERIOD_OPTIONS, useInactivityPeriod } from '../../hooks/use-inactivity-period';

const InactivityPeriod = () => {
    const theme = useTheme();
    const { t } = useI18nService();
    const { bottom } = useSafeAreaInsets();

    // TODO: Get initial value from route params or global state
    const initialDays = 365;

    const {
        selectedDays,
        hasChanges,
        handleSelectPeriod,
        handleSave,
        getOptionLabel,
        getAccessibilityLabel
    } = useInactivityPeriod(initialDays);

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
                {/* Recovery Rules Section */}
                <SharedCard label={t('inactivityPeriod.sectionLabel')}>
                    {/* Current Selection Row */}
                    <SharedRow
                        label={t('inactivityPeriod.label')}
                        value={t('settings.days', { count: selectedDays })}
                        accessibilityLabel={t('settings.a11yInactivityPeriod', {
                            days: t('settings.days', { count: selectedDays })
                        })}
                    />

                    <SharedDivider />

                    {/* Options Container */}
                    <View style={styles.optionsContainer}>
                        {PERIOD_OPTIONS.map(option => (
                            <PeriodOption
                                key={option.value}
                                label={getOptionLabel(option.labelKey)}
                                value={option.value}
                                selected={selectedDays === option.value}
                                onPress={() => handleSelectPeriod(option.value)}
                                accessibilityLabel={getAccessibilityLabel(
                                    option.labelKey,
                                    selectedDays === option.value
                                )}
                            />
                        ))}
                    </View>
                </SharedCard>

                {/* Helper Text */}
                <SharedText variant='caption' color='slTextSecondary' style={styles.helperText}>
                    {t('inactivityPeriod.helperText')}
                </SharedText>

                {/* Spacer */}
                <View style={styles.spacer} />

                {/* Save Button */}
                <SharedButton
                    variant={'primary'}
                    size='lg'
                    onPress={handleSave}
                    disabled={!hasChanges}
                    accessibilityLabel={t('inactivityPeriod.a11ySave')}
                    accessibilityHint={
                        hasChanges
                            ? t('inactivityPeriod.a11ySaveHint')
                            : t('inactivityPeriod.a11ySaveDisabled')
                    }
                >
                    {t('inactivityPeriod.saveChanges')}
                </SharedButton>
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
        gap: 24
    },
    optionsContainer: {
        padding: 8,
        gap: 4
    },
    helperText: {
        lineHeight: 18.2
    },
    spacer: {
        flex: 1,
        minHeight: 24
    }
});

export default InactivityPeriod;
