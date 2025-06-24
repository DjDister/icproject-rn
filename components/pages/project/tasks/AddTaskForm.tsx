import { InputWithButton } from "@/components/common/InputWithButton";
import React, { useState } from "react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };

  return (
    <InputWithButton
      value={newTaskTitle}
      onChangeText={setNewTaskTitle}
      onButtonPress={handleAddTask}
      placeholder="New task"
    />
  );
};
