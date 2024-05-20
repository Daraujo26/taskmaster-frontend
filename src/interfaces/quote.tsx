import { Client } from "./client";

export interface Quote {
  id: number;
  client: Client;
  jobTitle: string;
  contractItems: ContractItemsHolder[];
  message: string;
  status: "draft" | "sent" | "accepted" | "rejected";
  dateIssued: Date;
  dateUpdated: Date;
  teamId: number;
}

export interface ContractItemsHolder {
  id: number;
  item: ContractItem;
  quantity: number;
}

export interface ContractItem {
  id: number;
  itemClass: string;
  itemName: string;
  itemMessage: string;
  itemPrice: number;
  images: string[];
  saveItem: boolean;
  chargeTax: boolean;
  optional: boolean;
}
