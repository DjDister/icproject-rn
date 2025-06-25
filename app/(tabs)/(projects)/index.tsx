import { InputWithButton } from "@/components/common/InputWithButton";
import { ProjectList } from "@/components/pages/projects/ProjectList";
import { ThemedView } from "@/components/ThemedView";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addProject,
  deleteProject,
  loadProjects,
} from "@/store/slices/projectsSlice";
import { Project } from "@/types/projects.types";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

export default function TasksScreen() {
  const [newProjectName, setNewProjectName] = useState("");
  const dispatch = useAppDispatch();

  const { items: projects, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadProjects());
    }, [dispatch])
  );

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      dispatch(addProject(newProjectName.trim()));
      setNewProjectName("");
    }
  };

  const handleDeleteProject = (project: Project) => {
    Alert.alert(
      "Delete Project",
      `Are you sure you want to delete "${project.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => dispatch(deleteProject(project.id)),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <InputWithButton
        value={newProjectName}
        onChangeText={setNewProjectName}
        onButtonPress={handleAddProject}
        placeholder="New project name"
      />

      <ProjectList projects={projects} onDeleteProject={handleDeleteProject} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
