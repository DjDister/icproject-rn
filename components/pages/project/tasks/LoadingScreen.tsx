import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";

interface LoadingScreenProps {}

export const LoadingScreen = ({}: LoadingScreenProps) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <ThemedView style={[styles.container, styles.centerContent]}>
      <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
      <ThemedText style={styles.loadingText}>Loading project...</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
});
