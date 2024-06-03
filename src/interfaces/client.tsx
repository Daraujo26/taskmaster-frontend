export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber?: string;
  email?: string;
  clientNotes?: string; // optional and they won’t see this
  propertyAddress: string;
  userId?: number;
}

export interface ClientState {
  loading: boolean;
  clients: Client[];
  error: string | null;
}
