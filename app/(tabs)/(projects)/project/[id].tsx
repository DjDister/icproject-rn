import { AddTaskForm } from "@/components/pages/project/tasks/AddTaskForm";
import { LoadingScreen } from "@/components/pages/project/tasks/LoadingScreen";
import { NoFoundProject } from "@/components/pages/project/tasks/NoFoundProject";
import { TaskItem } from "@/components/pages/project/tasks/TaskItem";
import { ThemedView } from "@/components/ThemedView";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  addTask,
  deleteTask,
  loadProjects,
  reorderTasks,
  toggleTaskCompletion,
} from "@/store/slices/projectsSlice";
import { Task } from "@/types/projects.types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { Alert, ListRenderItemInfo, StyleSheet } from "react-native";
import ReorderableList, {
  ReorderableListReorderEvent,
  reorderItems,
} from "react-native-reorderable-list";

export default function ProjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const project = useAppSelector((state) =>
    state.projects.items.find((p) => p.id === id)
  );
  const { isLoading, error } = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  useEffect(() => {
    dispatch(loadProjects());
  }, [dispatch]);

  const handleAddTask = useCallback(
    (title: string) => {
      if (!project) return;
      dispatch(addTask({ projectId: project.id, title }));
    },
    [dispatch, project?.id]
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      if (!project) return;
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () =>
            dispatch(deleteTask({ projectId: project.id, taskId })),
          style: "destructive",
        },
      ]);
    },
    [dispatch, project?.id]
  );

  const handleToggleCompletion = useCallback(
    (taskId: string) => {
      if (!project) return;
      dispatch(toggleTaskCompletion({ projectId: project.id, taskId }));
    },
    [dispatch, project?.id]
  );

  const handleReorder = useCallback(
    ({ from, to }: ReorderableListReorderEvent) => {
      if (!project || !project.tasks) return;

      const newTasks = reorderItems(project.tasks, from, to);

      dispatch(
        reorderTasks({ projectId: project.id, reorderedTasks: newTasks })
      );
    },
    [dispatch, project?.id, project?.tasks]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Task>) => (
      <TaskItem
        item={item}
        onToggleCompletion={handleToggleCompletion}
        onDelete={handleDeleteTask}
      />
    ),
    [handleToggleCompletion, handleDeleteTask]
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!project) {
    return <NoFoundProject onGoBack={() => router.back()} />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: project?.name ?? "Project",
        }}
      />
      <ThemedView style={styles.container}>
        <AddTaskForm onAddTask={handleAddTask} />
        <ReorderableList
          data={project.tasks || []}
          keyExtractor={keyExtractor}
          onReorder={handleReorder}
          renderItem={renderItem}
          style={styles.listContent}
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
