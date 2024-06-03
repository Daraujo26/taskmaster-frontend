import { UserData } from "./user";

export interface AppState {
  user: {
    loading: boolean;
    user: UserData | null;
    token: string | null;
    error: string;
  };
}
