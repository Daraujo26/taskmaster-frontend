import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, TaskState } from "@/src/interfaces/task";
import { RootState } from "../store";

const initialState: TaskState = {
    loading: false,
    tasks: [],
    error: null,
};

export const fetchTasks = createAsyncThunk<Task[], undefined, { rejectValue: string, state: RootState }>(
    'tasks/fetchTasks',
    async (_, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.get('http://localhost:8080/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to fetch tasks");
        }
    }
);

export const addTask = createAsyncThunk<Task, Task, { rejectValue: string, state: RootState }>(
    'tasks/addTask',
    async (task, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.post('http://localhost:8080/tasks', task, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to add task");
        }
    }
);

export const updateTask = createAsyncThunk<Task, { id: number, updates: Partial<Task> }, { rejectValue: string, state: RootState }>(
    'tasks/updateTask',
    async ({ id, updates }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.put(`http://localhost:8080/tasks/${id}`, updates, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to update task");
        }
    }
);

export const deleteTask = createAsyncThunk<number, number, { rejectValue: string, state: RootState }>(
    'tasks/deleteTask',
    async (id, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            await axios.delete(`http://localhost:8080/tasks/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to delete task");
        }
    }
);

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload;
                state.error = null;
            })
            .addCase(fetchTasks.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch tasks";
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.tasks.push(action.payload);
                state.error = null;
            })
            .addCase(addTask.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to add task";
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.loading = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateTask.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to update task";
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteTask.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete task";
            });
    }
});

export default taskSlice.reducer;
