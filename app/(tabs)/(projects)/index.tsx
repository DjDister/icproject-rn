import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
  addProject,
  deleteProject,
  loadProjects,
} from "@/store/slices/projectsSlice";
import { Project } from "@/types";
import { EvilIcons } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TasksScreen() {
  const [newProjectName, setNewProjectName] = useState("");
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme() ?? "light";

  const { items: projects } = useAppSelector((state) => state.projects);

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

  const renderProject = ({ item }: { item: Project }) => {
    return (
      <ThemedView style={styles.projectItem}>
        <Link
          href={{
            pathname: `/(tabs)/(projects)/project/[id]`,
            params: { id: item.id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.projectLink}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText>({item.tasks.length} tasks)</ThemedText>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          onPress={() => handleDeleteProject(item)}
          style={styles.deleteButton}
        >
          <EvilIcons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
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
          value={newProjectName}
          onChangeText={setNewProjectName}
          placeholder="New project name"
          placeholderTextColor={Colors[colorScheme].icon}
        />
        <TouchableOpacity onPress={handleAddProject} style={styles.addButton}>
          <ThemedText style={styles.addButtonText}>Add</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 4,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
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
