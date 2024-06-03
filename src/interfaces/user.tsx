import {
  Client,
  ContractItem,
  Invoice,
  Job,
  Quote,
  Task,
  TaxRate,
  TeamMembership,
} from ".";
import { E164Number } from "libphonenumber-js";

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: E164Number;
  companyName?: string;
  companyDetails?: CompanyDetails;
  companyData?: CompanyData;
  usageData?: UsageData;
  teams: TeamMembership[];
  role: String;
}

export interface CompanyDetails {
  occupation: string;
  size: number;
  revenue: string;
  about: string;
}

export interface CompanyData {
  quotes: Quote[];
  invoices: Invoice[];
  tasks: Task[];
  clients: Client[];
  jobs: Job[];
}

export interface UsageData {
  contractItems: ContractItem[];
  taxRates: TaxRate[];
}
