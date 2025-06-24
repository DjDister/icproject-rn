import { Project } from "@/types/projects.types";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ProjectItem } from "./ProjectItem";

interface ProjectListProps {
  projects: Project[];
  onDeleteProject: (project: Project) => void;
}

export const ProjectList = ({
  projects,
  onDeleteProject,
}: ProjectListProps) => {
  return (
    <FlatList
      data={projects}
      renderItem={({ item }) => (
        <ProjectItem project={item} onDelete={onDeleteProject} />
      )}
      keyExtractor={(item) => item.id}
      style={styles.list}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
});
