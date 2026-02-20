import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, MaterialCommunityIconName } from "@/src/components/ui/icon";
import { SharedText } from "@/src/components/shared/shared-text";

interface LabelSectionProps {
  iconName: MaterialCommunityIconName;
  label: string;
  tagText: string;
  color: string;
  lightColor: string;
}

export function LabelSection({
  iconName,
  label,
  tagText,
  color,
  lightColor,
}: LabelSectionProps) {
  return (
    <View style={styles.container}>
      <Icon
        variant="material-community"
        name={iconName}
        size={14}
        color={color}
      />
      <SharedText
        variant="label"
        style={{ fontSize: 11, fontWeight: "600", letterSpacing: 0.5, color }}
      >
        {label}
      </SharedText>
      <View style={[styles.tag, { backgroundColor: lightColor }]}>
        <SharedText
          variant="label"
          style={{ fontSize: 9, fontWeight: "600", color }}
        >
          {tagText}
        </SharedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 4,
    width: "100%",
  },
  tag: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
});
