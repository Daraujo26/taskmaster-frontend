export interface Task {
  id: number;
  title: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  clientId: number;
  userId: number;
}

export interface TaskState {
  loading: boolean;
  tasks: Task[];
  error: string | null;
}
