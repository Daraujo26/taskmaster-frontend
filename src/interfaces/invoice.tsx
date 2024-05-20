import { Client } from "./client";
import { ContractItemsHolder } from "./quote";

export interface Invoice {
  id: number;
  client: Client;
  jobTitle: string;
  contractItems: ContractItemsHolder[];
  message: string;
  status: "unpaid" | "paid" | "overdue";
  dateIssued: Date;
  expDate: Date;
  teamId: number;
}
