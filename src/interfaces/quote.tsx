import { Client } from "./client";

export interface Quote {
  id: number;
  client: Client;
  jobTitle: string;
  contractItems: { contractItemId: number; quantity: number }[];
  message: string;
  status: "sent" | "viewed" | "accepted" | "rejected";
  dateIssued: Date;
  dateUpdated: Date;
  teamId: number;
}
