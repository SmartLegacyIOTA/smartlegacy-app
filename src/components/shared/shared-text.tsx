import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { useTheme } from '@/src/theme/use-theme';
import { TypographyVariant } from '@/src/theme/typography';
import { ThemeColor } from '@/src/theme/theme';

export interface SharedTextProps {
    variant?: TypographyVariant;
    color?: ThemeColor;
    align?: 'left' | 'center' | 'right' | 'auto';
    style?: StyleProp<TextStyle>;
    children: ReactNode;
    numberOfLines?: number;
    accessibilityLabel?: string;
    accessibilityRole?: 'header' | 'text' | 'none';
}

export function SharedText({
    variant = 'body',
    color,
    align = 'auto',
    style,
    numberOfLines,
    children,
    accessibilityLabel,
    accessibilityRole
}: SharedTextProps) {
    const theme = useTheme();
    const variantStyle = theme.typography.variants[variant];

    const textStyle = [
        styles.text,
        {
            fontFamily: theme.typography.fontFamily.primary,
            fontSize: variantStyle.fontSize,
            fontWeight: variantStyle.fontWeight,
            lineHeight: variantStyle.lineHeight,
            letterSpacing: 'letterSpacing' in variantStyle ? variantStyle.letterSpacing : undefined,
            color: theme.colors[color || 'slText'],
            textAlign: align
        },
        style
    ];

    // Determine accessibility role based on variant if not specified
    const defaultRole = variant === 'h1' || variant === 'h2' ? 'header' : undefined;
    const role = accessibilityRole !== undefined ? accessibilityRole : defaultRole;

    return (
        <Text
            style={textStyle}
            numberOfLines={numberOfLines}
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={role as any}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {}
});
