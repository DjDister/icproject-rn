import { ThemedText } from "@/components/ThemedText";
import { Task } from "@/types/projects.types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";

interface TaskItemProps {
  item: Task;
  drag: () => void;
  isActive: boolean;
  colorScheme: string;
  onToggleCompletion: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export const TaskItem = ({
  item,
  drag,
  isActive,
  colorScheme,
  onToggleCompletion,
  onDelete,
}: TaskItemProps) => (
  <ScaleDecorator>
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={[
        styles.taskItem,
        isActive && styles.taskItemActive,
        item.completed && styles.taskItemCompleted,
        { backgroundColor: colorScheme === "dark" ? "#2A2A2A" : "white" },
      ]}
    >
      <TouchableOpacity
        onPress={() => onToggleCompletion(item.id)}
        style={styles.checkbox}
      >
        {item.completed ? (
          <Ionicons name="checkbox" size={24} color="#007AFF" />
        ) : (
          <Ionicons
            name="square-outline"
            size={24}
            color={colorScheme === "dark" ? "#ccc" : "#999"}
          />
        )}
      </TouchableOpacity>

      <ThemedText
        style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}
      >
        {item.title}
      </ThemedText>

      <TouchableOpacity
        onPress={() => onDelete(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.dragHandle} onLongPress={drag}>
        <Ionicons
          name="menu"
          size={20}
          color={colorScheme === "dark" ? "#ccc" : "#999"}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </ScaleDecorator>
);

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  taskItemActive: {
    transform: [{ scale: 1.05 }],
  },
  taskItemCompleted: {
    opacity: 0.7,
  },
  checkbox: {
    marginRight: 10,
  },
  taskTitle: {
    flex: 1,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    padding: 5,
    marginRight: 10,
  },
  dragHandle: {
    padding: 5,
  },
});
