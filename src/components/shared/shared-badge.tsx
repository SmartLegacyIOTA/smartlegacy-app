import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/theme/use-theme';
import { SharedText } from './shared-text';
import { Icon, MaterialCommunityIconName } from '@/src/components/ui/icon';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md';

interface SharedBadgeProps {
    label: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    iconName?: MaterialCommunityIconName;
    accessibilityLabel?: string;
}

export function SharedBadge({
    label,
    variant = 'neutral',
    size = 'md',
    iconName,
    accessibilityLabel
}: SharedBadgeProps) {
    const theme = useTheme();

    const variantConfig = {
        success: {
            backgroundColor: theme.colors.slPositiveLight,
            textColor: theme.colors.slPositive,
            iconColor: theme.colors.slPositive
        },
        warning: {
            backgroundColor: theme.colors.slWarningLight,
            textColor: theme.colors.slWarning,
            iconColor: theme.colors.slWarning
        },
        info: {
            backgroundColor: theme.colors.slAccentLight,
            textColor: theme.colors.slAccent,
            iconColor: theme.colors.slAccent
        },
        error: {
            backgroundColor: theme.colors.slNegativeLight,
            textColor: theme.colors.slNegative,
            iconColor: theme.colors.slNegative
        },
        neutral: {
            backgroundColor: theme.colors.slSurfaceMuted,
            textColor: theme.colors.slTextSecondary,
            iconColor: theme.colors.slTextSecondary
        }
    };

    const sizeConfig = {
        sm: {
            paddingHorizontal: 8,
            paddingVertical: 4,
            fontSize: 12,
            iconSize: 10,
            gap: 4
        },
        md: {
            paddingHorizontal: 10,
            paddingVertical: 6,
            fontSize: 13,
            iconSize: 14,
            gap: 6
        }
    };

    const config = variantConfig[variant];
    const sizing = sizeConfig[size];

    const a11yLabel = accessibilityLabel || `${label} badge`;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: config.backgroundColor,
                    paddingHorizontal: sizing.paddingHorizontal,
                    paddingVertical: sizing.paddingVertical,
                    gap: sizing.gap
                }
            ]}
            accessible={true}
            accessibilityRole='text'
            accessibilityLabel={a11yLabel}
        >
            {iconName && (
                <Icon
                    variant='material-community'
                    name={iconName}
                    size={sizing.iconSize}
                    color={config.iconColor}
                />
            )}
            <SharedText
                variant='label'
                style={{
                    fontSize: sizing.fontSize,
                    fontWeight: '600',
                    color: config.textColor
                }}
            >
                {label}
            </SharedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderRadius: 20
    }
});
