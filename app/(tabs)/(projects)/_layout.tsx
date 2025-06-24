import { Stack } from "expo-router";
import React from "react";

export default function TasksLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Projects" }}
      />
      <Stack.Screen
        name="project/[id]"
        options={{
          headerShown: true,
          title: "Project Details",
        }}
      />
    </Stack>
  );
}
