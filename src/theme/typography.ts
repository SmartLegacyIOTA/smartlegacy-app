export const typography = {
    fontFamily: {
        primary: 'Inter'
    },
    fontSize: {
        xs: 11,
        sm: 13,
        base: 15,
        lg: 16,
        xl: 24,
        xxl: 28
    },
    fontWeight: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        light: '300' as const
    },
    lineHeight: {
        tight: 1.3,
        normal: 1.5
    },
    letterSpacing: {
        tight: -0.5
    },
    variants: {
        h1: {
            fontSize: 28,
            fontWeight: '300' as const,
            lineHeight: 36.4,
            letterSpacing: -0.5
        },
        h2: {
            fontSize: 24,
            fontWeight: '500' as const,
            lineHeight: 31.2
        },
        subtitle: {
            fontSize: 16,
            fontWeight: '400' as const,
            lineHeight: 24
        },
        body: {
            fontSize: 15,
            fontWeight: '400' as const,
            lineHeight: 22.5
        },
        label: {
            fontSize: 15,
            fontWeight: '500' as const,
            lineHeight: 22.5
        },
        caption: {
            fontSize: 13,
            fontWeight: '400' as const,
            lineHeight: 19.5
        },
        small: {
            fontSize: 11,
            fontWeight: '400' as const,
            lineHeight: 16.5
        }
    }
};

export type Typography = typeof typography;

export type TypographyVariant = keyof typeof typography.variants;

export type TypographyVariantStyle = (typeof typography.variants)[TypographyVariant];
