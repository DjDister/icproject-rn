import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Project } from "@/types/projects.types";
import { EvilIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface ProjectItemProps {
  project: Project;
  onDelete: (project: Project) => void;
}

export const ProjectItem = ({ project, onDelete }: ProjectItemProps) => {
  return (
    <ThemedView style={styles.projectItem}>
      <Link
        href={{
          pathname: `/(tabs)/(projects)/project/[id]`,
          params: { id: project.id },
        }}
        asChild
      >
        <TouchableOpacity style={styles.projectLink}>
          <ThemedText type="defaultSemiBold">{project.name}</ThemedText>
          <ThemedText>({project.tasks.length} tasks)</ThemedText>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity
        onPress={() => onDelete(project)}
        style={styles.deleteButton}
      >
        <EvilIcons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  projectLink: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
});
