import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface NotFoundScreenProps {
  onGoBack: () => void;
}

export const NotFoundScreen = ({ onGoBack }: NotFoundScreenProps) => (
  <ThemedView style={styles.container}>
    <ThemedText>Project not found</ThemedText>
    <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
      <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
    </TouchableOpacity>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
