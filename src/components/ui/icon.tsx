import React, { ComponentProps } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleProp, TextStyle } from 'react-native';

export type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
export type MaterialCommunityIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

type IconBaseProps = {
    size?: number;
    color: string;
    style?: StyleProp<TextStyle>;
};

type IconPropsWithMaterial = IconBaseProps & {
    variant: 'material';
    name: MaterialIconName;
};

type IconPropsWithMaterialCommunity = IconBaseProps & {
    variant: 'material-community';
    name: MaterialCommunityIconName;
};

export type IconProps = IconPropsWithMaterial | IconPropsWithMaterialCommunity;

/**
 * Simple icon component for using Material Icons or Material Community Icons directly.
 * Use this when you want to use a specific icon regardless of platform.
 *
 * @example
 * // Material Community Icons
 * <Icon variant="material-community" name="shield-check" size={24} color="#fff" />
 *
 * // Material Icons
 * <Icon variant="material" name="home" size={24} color="#000" />
 */
export function Icon({ variant, name, size = 24, color, style }: IconProps) {
    if (variant === 'material') {
        return (
            <MaterialIcons
                name={name as MaterialIconName}
                size={size}
                color={color}
                style={style}
            />
        );
    }

    return (
        <MaterialCommunityIcons
            name={name as MaterialCommunityIconName}
            size={size}
            color={color}
            style={style}
        />
    );
}
