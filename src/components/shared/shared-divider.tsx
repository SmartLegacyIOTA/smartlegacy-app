import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/theme/use-theme';

export function SharedDivider() {
    const theme = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.line, { backgroundColor: theme.colors.slBorder }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    line: {
        height: 1
    }
});
