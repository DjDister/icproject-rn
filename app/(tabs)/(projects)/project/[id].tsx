import { AddTaskForm } from "@/components/pages/project/tasks/AddTaskForm";
import { LoadingScreen } from "@/components/pages/project/tasks/LoadingScreen";
import { NotFoundScreen } from "@/components/pages/project/tasks/NotFoundScreen";
import { TaskItem } from "@/components/pages/project/tasks/TaskItem";
import { ThemedView } from "@/components/ThemedView";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
  addTask,
  deleteTask,
  loadProjects,
  reorderTasks,
  toggleTaskCompletion,
} from "@/store/slices/projectsSlice";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function ProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const dispatch = useAppDispatch();

  const currentProject = useAppSelector((state) =>
    state.projects.items.find((project) => project.id === id)
  );

  const { items: projects, isLoading } = useAppSelector(
    (state) => state.projects
  );

  const getProject = useCallback(
    (projectId: string) => {
      return projects.find((project) => project.id === projectId);
    },
    [projects]
  );

  const [project, setProject] = useState(getProject(id));

  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  useEffect(() => {
    setProject(getProject(id));
  }, [id, getProject]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!project) {
    return <NotFoundScreen onGoBack={() => router.back()} />;
  }

  const handleAddTask = (title: string) => {
    dispatch(addTask({ projectId: project.id, title }));
  };

  const handleDeleteTask = (taskId: string) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => dispatch(deleteTask({ projectId: project.id, taskId })),
        style: "destructive",
      },
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: currentProject?.name ?? "Loading...",
        }}
      />

      <ThemedView style={styles.container}>
        <AddTaskForm onAddTask={handleAddTask} />

        <DraggableFlatList
          data={project.tasks}
          onDragEnd={({ data }) => {
            const tasksWithPositions = data.map((task, index) => ({
              ...task,
              position: index,
            }));
            dispatch(
              reorderTasks({
                projectId: project.id,
                reorderedTasks: tasksWithPositions,
              })
            );
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item, drag, isActive }) => (
            <TaskItem
              item={item}
              drag={drag}
              isActive={isActive}
              colorScheme={colorScheme}
              onToggleCompletion={(taskId) =>
                dispatch(
                  toggleTaskCompletion({ projectId: project.id, taskId })
                )
              }
              onDelete={handleDeleteTask}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      </ThemedView>
    </>
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
  listContent: {
    paddingBottom: 20,
  },
});
