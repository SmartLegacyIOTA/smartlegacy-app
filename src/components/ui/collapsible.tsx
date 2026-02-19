import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/src/components/ui/icon-symbol';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { TypographyVariant } from '@/src/theme/typography';
import { SharedText } from '@/src/components/shared/shared-text';

export function Collapsible({
    children,
    title,
    textVariant
}: PropsWithChildren & { title: string; textVariant?: TypographyVariant }) {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useColorScheme() ?? 'light';

    return (
        <View>
            <TouchableOpacity
                style={styles.heading}
                onPress={() => setIsOpen(value => !value)}
                activeOpacity={0.8}
            >
                <IconSymbol
                    name='chevron.right'
                    size={18}
                    weight='medium'
                    color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                    style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
                />

                <SharedText variant={textVariant}>{title}</SharedText>
            </TouchableOpacity>
            {isOpen && <View style={styles.content}>{children}</View>}
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    content: {
        marginTop: 6,
        marginLeft: 24
    }
});
