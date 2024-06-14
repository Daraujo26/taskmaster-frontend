import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Job, JobState } from "@/src/interfaces/job";
import { RootState } from "../store";

const initialState: JobState = {
    loading: false,
    jobs: [],
    error: null,
};

export const fetchJobs = createAsyncThunk<Job[], undefined, { rejectValue: string, state: RootState }>(
    'jobs/fetchJobs',
    async (_, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.get('http://localhost:8080/jobs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to fetch jobs");
        }
    }
);

export const addJob = createAsyncThunk<Job, Job, { rejectValue: string, state: RootState }>(
    'jobs/addJob',
    async (job, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.post('http://localhost:8080/jobs', job, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to add job");
        }
    }
);

export const updateJob = createAsyncThunk<Job, { id: number, updates: Partial<Job> }, { rejectValue: string, state: RootState }>(
    'jobs/updateJob',
    async ({ id, updates }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.put(`http://localhost:8080/jobs/${id}`, updates, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to update job");
        }
    }
);

export const deleteJob = createAsyncThunk<number, number, { rejectValue: string, state: RootState }>(
    'jobs/deleteJob',
    async (id, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            await axios.delete(`http://localhost:8080/jobs/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to delete job");
        }
    }
);

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
                state.loading = false;
                state.jobs = action.payload;
                state.error = null;
            })
            .addCase(fetchJobs.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch jobs";
            })
            .addCase(addJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(addJob.fulfilled, (state, action: PayloadAction<Job>) => {
                state.loading = false;
                state.jobs.push(action.payload);
                state.error = null;
            })
            .addCase(addJob.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to add job";
            })
            .addCase(updateJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateJob.fulfilled, (state, action: PayloadAction<Job>) => {
                state.loading = false;
                const index = state.jobs.findIndex(job => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateJob.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to update job";
            })
            .addCase(deleteJob.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteJob.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.jobs = state.jobs.filter(job => job.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteJob.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete job";
            });
    }
});

export default jobSlice.reducer;
