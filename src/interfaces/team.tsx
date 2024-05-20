export interface Team {
  id: number;
  name: string;
  members: TeamMembership[];
  permissions: TeamPermissions;
}

export interface TeamMembership {
  userId: number;
  role: "admin" | "member";
}

export interface TeamPermissions {
  canCreateQuotes: boolean;
  canEditQuotes: boolean;
  canViewInvoices: boolean;
  canEditInvoices: boolean;
  canManageClients: boolean;
  canManageTasks: boolean;
  canManageJobs: boolean;
}
