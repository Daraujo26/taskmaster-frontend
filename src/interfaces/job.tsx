export interface Job {
  id: number;
  client: number;
  jobTitle: string;
  message: string;
  contractItems: { contractItemId: number; quantity: number }[];
  jobDates: Date[];
  startTime: string;
  endTime: string;
  status: "planned" | "in-progress" | "completed";
}

export interface JobState {
  loading: boolean;
  jobs: Job[];
  error: string | null;
}
