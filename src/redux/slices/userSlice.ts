import { UserData } from "@/src/interfaces/user";
import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    loading: boolean;
    user: UserData | null;
    token: string | null;
    error: string | null;
}

interface AuthResponse {
    user: UserData;
    jwt: string;
}

const initialState: UserState = {
    loading: false,
    user: null,
    token: null,
    error: null,
};

export const loginUser = createAsyncThunk<AuthResponse, { email: string, password: string }, { rejectValue: string }>(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', { email, password });
            return response.data;
        } catch (error: any) {
            let errorMessage = "An error occurred";
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            } else if (error.response && error.response.data) {
                errorMessage = error.response.data;
            } else if (error.message) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const signupUser = createAsyncThunk<AuthResponse, UserData, { rejectValue: string }>(
    'user/signupUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/register', userData);
            return response.data;
        } catch (error: any) {
            let errorMessage = "An error occurred";
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            } else if (error.response && error.response.data) {
                errorMessage = error.response.data;
            } else if (error.message) {
                errorMessage = error.message;
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const updateUserFields = createAsyncThunk<UserData, { id: number, updates: Partial<UserData>, token: string }>(
    'user/updateUserFields',
    async ({ id, updates, token }) => {
        const response = await axios.put(`http://localhost:8080/user/${id}/update`, updates, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        resetError: (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.jwt;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = action.payload || null;
        });
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.jwt;
            state.error = null;
        });
        builder.addCase(signupUser.rejected, (state, action: PayloadAction<string | undefined>) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = action.payload || null;
        });
        builder.addCase(updateUserFields.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUserFields.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(updateUserFields.rejected, (state, action: PayloadAction<unknown>) => {
            state.loading = false;
            state.error = typeof action.payload === 'string' ? action.payload : null;
        });
    }
});

export const { logout, resetError } = userSlice.actions;
export default userSlice.reducer;
