import { Client } from "./client";
import { ContractItemsHolder } from "./quote";

export interface Job {
  id: number;
  client: Client;
  jobTitle: string;
  message: string;
  contractItems: ContractItemsHolder[];
  jobDates: Date[];
  startTime: string; // Time in ISO 8601 format
  endTime: string; // Time in ISO 8601 format
  status: "planned" | "in-progress" | "completed";
  teamId: number;
}
