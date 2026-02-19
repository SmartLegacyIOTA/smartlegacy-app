import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/src/theme/use-theme';
import { SharedText } from './shared-text';
import { Icon, MaterialCommunityIconName } from '@/src/components/ui/icon';

export type BannerVariant = 'info' | 'warning' | 'success' | 'error';

interface SharedBannerProps {
    title?: string;
    description?: string;
    variant?: BannerVariant;
    iconName?: MaterialCommunityIconName;
    onPress?: () => void;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    withBorder?: boolean;
}

export function SharedBanner({
    title,
    description,
    variant = 'info',
    iconName,
    onPress,
    accessibilityLabel,
    accessibilityHint,
    withBorder = false
}: SharedBannerProps) {
    const theme = useTheme();

    const variantConfig = {
        info: {
            backgroundColor: theme.colors.slAccentLight,
            borderColor: theme.colors.slAccent,
            iconColor: theme.colors.slAccent,
            iconBgColor: theme.colors.white,
            textColor: theme.colors.slText,
            defaultIcon: 'information-outline' as MaterialCommunityIconName
        },
        warning: {
            backgroundColor: theme.colors.slWarningLight,
            borderColor: theme.colors.slWarning,
            iconColor: theme.colors.slWarning,
            iconBgColor: theme.colors.slWarning + '15',
            textColor: theme.colors.slText,
            defaultIcon: 'alert-outline' as MaterialCommunityIconName
        },
        success: {
            backgroundColor: theme.colors.slPositiveLight,
            borderColor: theme.colors.slPositive,
            iconColor: theme.colors.slPositive,
            iconBgColor: theme.colors.slPositive + '15',
            textColor: theme.colors.slText,
            defaultIcon: 'check-circle-outline' as MaterialCommunityIconName
        },
        error: {
            backgroundColor: theme.colors.slNegativeLight,
            borderColor: theme.colors.slNegative,
            iconColor: theme.colors.slNegative,
            iconBgColor: theme.colors.slNegative + '15',
            textColor: theme.colors.slText,
            defaultIcon: 'alert-circle-outline' as MaterialCommunityIconName
        }
    };

    const config = variantConfig[variant];
    const displayIcon = iconName || config.defaultIcon;

    const a11yLabel = accessibilityLabel || `${title}${description ? `. ${description}` : ''}`;

    const content = (
        <View
            style={[
                styles.container,
                {
                    borderWidth: withBorder ? 1 : 0,
                    backgroundColor: config.backgroundColor,
                    borderColor: config.borderColor
                }
            ]}
        >
            <View style={[styles.iconContainer, { backgroundColor: config.iconBgColor }]}>
                <Icon
                    variant='material-community'
                    name={displayIcon}
                    size={24}
                    color={config.iconColor}
                />
            </View>

            <View style={styles.content}>
                {!!title && (
                    <SharedText
                        variant='label'
                        style={{
                            fontSize: 15,
                            fontWeight: '600',
                            color: config.textColor
                        }}
                    >
                        {title}
                    </SharedText>
                )}

                {description && (
                    <SharedText
                        variant='body'
                        style={{
                            fontSize: 13,
                            color: theme.colors.slTextSecondary,
                            marginTop: 2
                        }}
                    >
                        {description}
                    </SharedText>
                )}
            </View>

            {onPress && (
                <Icon
                    variant='material-community'
                    name='chevron-right'
                    size={20}
                    color={theme.colors.slTextMuted}
                />
            )}
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                accessibilityRole='button'
                accessibilityLabel={a11yLabel}
                accessibilityHint={accessibilityHint}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return (
        <View accessible={true} accessibilityRole='alert' accessibilityLabel={a11yLabel}>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 12
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        gap: 2
    }
});
