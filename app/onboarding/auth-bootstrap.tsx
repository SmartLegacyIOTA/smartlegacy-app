import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "@/src/framework/theme/use-theme";
import { useAuthBootstrap } from "@/src/framework/hooks/auth/use-auth-bootstrap";

const AuthBootstrap = () => {
  const theme = useTheme();

  useAuthBootstrap();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.slBg }]}>
      <ActivityIndicator size="large" color={theme.colors.slAccent} />
    </View>
  );
};

export default AuthBootstrap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
