import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIconName } from '@/src/components/ui/icon';
import { SharedText } from '@/src/components/shared/shared-text';
import { SharedAvatar } from '@/src/components/shared/shared-avatar';

interface ActivityItemProps {
    iconName: MaterialCommunityIconName;
    iconColor: string;
    iconBgColor: string;
    title: string;
    timestamp: string;
}

export function ActivityItem({
    iconName,
    iconColor,
    iconBgColor,
    title,
    timestamp
}: ActivityItemProps) {
    return (
        <View style={styles.container}>
            <SharedAvatar
                variant='icon'
                iconName={iconName}
                size='small'
                backgroundColor={iconBgColor}
                iconColor={iconColor}
            />
            <View style={styles.textContainer}>
                <SharedText variant='body' color='slText' style={{ fontSize: 14 }}>
                    {title}
                </SharedText>
                <SharedText variant='caption' color='slTextMuted' style={{ fontSize: 12 }}>
                    {timestamp}
                </SharedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        width: '100%'
    },
    textContainer: {
        flex: 1,
        gap: 2
    }
});
