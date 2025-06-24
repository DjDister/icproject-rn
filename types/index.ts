export interface Task {
  id: string;
  title: string;
  completed: boolean;
  position: number;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
