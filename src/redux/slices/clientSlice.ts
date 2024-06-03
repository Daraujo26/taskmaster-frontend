import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Client, ClientState } from "@/src/interfaces/client";
import { RootState } from "../store";

const initialState: ClientState = {
    loading: false,
    clients: [],
    error: null,
};

export const fetchClients = createAsyncThunk<Client[], undefined, { rejectValue: string, state: RootState }>(
    'clients/fetchClients',
    async (_, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.get('http://localhost:8080/clients', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to fetch clients");
        }
    }
);

export const addClient = createAsyncThunk<Client, Client, { rejectValue: string, state: RootState }>(
    'clients/addClient',
    async (client, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.post('http://localhost:8080/clients', client, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to add client");
        }
    }
);

export const updateClient = createAsyncThunk<Client, { id: number, updates: Partial<Client> }, { rejectValue: string, state: RootState }>(
    'clients/updateClient',
    async ({ id, updates }, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            const response = await axios.put(`http://localhost:8080/clients/${id}`, updates, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to update client");
        }
    }
);

export const deleteClient = createAsyncThunk<number, number, { rejectValue: string, state: RootState }>(
    'clients/deleteClient',
    async (id, { rejectWithValue, getState }) => {
        const token = getState().user.token;
        try {
            await axios.delete(`http://localhost:8080/clients/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Failed to delete client");
        }
    }
);

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
                state.loading = false;
                state.clients = action.payload;
                state.error = null;
            })
            .addCase(fetchClients.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch clients";
            })
            .addCase(addClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(addClient.fulfilled, (state, action: PayloadAction<Client>) => {
                state.loading = false;
                state.clients.push(action.payload);
                state.error = null;
            })
            .addCase(addClient.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to add client";
            })
            .addCase(updateClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateClient.fulfilled, (state, action: PayloadAction<Client>) => {
                state.loading = false;
                const index = state.clients.findIndex(client => client.id === action.payload.id);
                if (index !== -1) {
                    state.clients[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateClient.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to update client";
            })
            .addCase(deleteClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteClient.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                state.clients = state.clients.filter(client => client.id !== action.payload);
                state.error = null;
            })
            .addCase(deleteClient.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete client";
            });
    }
});

export default clientSlice.reducer;
