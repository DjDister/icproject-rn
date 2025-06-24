import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const colorScheme = useColorScheme() ?? "light";
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };

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
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        placeholder="New task"
        placeholderTextColor={Colors[colorScheme].icon}
      />
      <TouchableOpacity
        onPress={handleAddTask}
        style={[
          styles.addButton,
          { backgroundColor: Colors[colorScheme].tint },
        ]}
      >
        <ThemedText style={styles.addButtonText}>Add</ThemedText>
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
  },
  addButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});
