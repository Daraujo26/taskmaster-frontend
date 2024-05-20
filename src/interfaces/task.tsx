import { Client } from "./client";

export interface Task {
  id: number;
  title: string;
  description: string;
  client: Client;
  date: Date;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  teamId: number;
}
