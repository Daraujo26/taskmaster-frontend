import { UserData } from "./user";
import { ClientState } from "./client";
import { TaskState } from "./task";
import { JobState } from "./job";
import { ContractItemState } from "./contractItem";

export interface AppState {
  user: {
    loading: boolean;
    user: UserData | null;
    token: string | null;
    error: string;
  };
  clients: ClientState;
  tasks: TaskState;
  jobs: JobState;
  contractItems: ContractItemState;
}
