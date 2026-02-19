import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SharedText } from './shared-text';
import { SharedButton } from './shared-button';
import { SharedAvatar } from './shared-avatar';
import { MaterialCommunityIconName } from '@/src/components/ui/icon';

import { useI18nService } from '@/src/libs/i18n/i18n-service';

export interface SharedEmptyStateProps {
    iconName: MaterialCommunityIconName;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    accessibilityLabel?: string;
}

export function SharedEmptyState({
    iconName,
    title,
    description,
    actionLabel,
    onAction,
    accessibilityLabel
}: SharedEmptyStateProps) {
    const { t } = useI18nService();

    return (
        <View
            style={styles.container}
            accessible={true}
            accessibilityLabel={
                accessibilityLabel || t('common.emptyStateA11y', { title, description })
            }
        >
            <SharedAvatar
                variant='icon'
                iconName={iconName}
                size='large'
                bgColor='slSurfaceMuted'
                iconThemeColor='slTextMuted'
                accessibilityLabel={title}
            />
            <View style={styles.textContainer}>
                <SharedText variant='label' color='slText' align='center' style={styles.title}>
                    {title}
                </SharedText>
                <SharedText
                    variant='body'
                    color='slTextMuted'
                    align='center'
                    style={styles.description}
                >
                    {description}
                </SharedText>
            </View>
            {actionLabel && onAction && (
                <SharedButton
                    variant='secondary'
                    size='md'
                    onPress={onAction}
                    style={styles.button}
                    accessibilityLabel={actionLabel}
                    accessibilityHint={t('common.tapTo', { action: actionLabel.toLowerCase() })}
                >
                    {actionLabel}
                </SharedButton>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 20,
        width: '100%'
    },
    textContainer: {
        alignItems: 'center',
        gap: 8,
        width: '100%'
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    description: {
        fontSize: 14,
        lineHeight: 20
    },
    button: {
        marginTop: 8
    }
});
