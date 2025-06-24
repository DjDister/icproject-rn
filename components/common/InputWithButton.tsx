import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

interface InputWithButtonProps {
  value: string;
  onChangeText: (text: string) => void;
  onButtonPress: () => void;
  placeholder: string;
  buttonText?: string;
}

export const InputWithButton = ({
  value,
  onChangeText,
  onButtonPress,
  placeholder,
  buttonText = "Add",
}: InputWithButtonProps) => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          {
            color: Colors[colorScheme].text,
            borderColor: Colors[colorScheme].icon,
            backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "#F5F5F5",
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme].icon}
      />
      <TouchableOpacity onPress={onButtonPress} style={[styles.addButton]}>
        <ThemedText style={styles.addButtonText}>{buttonText}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#007AFF",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
