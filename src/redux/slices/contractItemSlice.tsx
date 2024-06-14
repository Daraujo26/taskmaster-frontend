import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ContractItem, ContractItemState } from "@/src/interfaces/contractItem";
import { RootState } from "../store";

const initialState: ContractItemState = {
  loading: false,
  contractItems: [],
  error: null,
};

export const fetchContractItems = createAsyncThunk<
  ContractItem[],
  undefined,
  { rejectValue: string; state: RootState }
>(
  "contractItems/fetchContractItems",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.get("http://localhost:8080/contract-items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch contract items"
      );
    }
  }
);

export const addContractItem = createAsyncThunk<
  ContractItem,
  ContractItem,
  { rejectValue: string; state: RootState }
>(
  "contractItems/addContractItem",
  async (contractItem, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.post(
        "http://localhost:8080/contract-items",
        contractItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to add contract item"
      );
    }
  }
);

export const updateContractItem = createAsyncThunk<
  ContractItem,
  { id: number; updates: Partial<ContractItem> },
  { rejectValue: string; state: RootState }
>(
  "contractItems/updateContractItem",
  async ({ id, updates }, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      const response = await axios.put(
        `http://localhost:8080/contract-items/${id}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to update contract item"
      );
    }
  }
);

export const deleteContractItem = createAsyncThunk<
  number,
  number,
  { rejectValue: string; state: RootState }
>(
  "contractItems/deleteContractItem",
  async (id, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    try {
      await axios.delete(`http://localhost:8080/contract-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete contract item"
      );
    }
  }
);

const contractItemSlice = createSlice({
  name: "contractItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContractItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchContractItems.fulfilled,
        (state, action: PayloadAction<ContractItem[]>) => {
          state.loading = false;
          state.contractItems = action.payload;
          state.error = null;
        }
      )
      .addCase(
        fetchContractItems.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch contract items";
        }
      )
      .addCase(addContractItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addContractItem.fulfilled,
        (state, action: PayloadAction<ContractItem>) => {
          state.loading = false;
          state.contractItems.push(action.payload);
          state.error = null;
        }
      )
      .addCase(
        addContractItem.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to add contract item";
        }
      )
      .addCase(updateContractItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateContractItem.fulfilled,
        (state, action: PayloadAction<ContractItem>) => {
          state.loading = false;
          const index = state.contractItems.findIndex(
            (contractItem) => contractItem.id === action.payload.id
          );
          if (index !== -1) {
            state.contractItems[index] = action.payload;
          }
          state.error = null;
        }
      )
      .addCase(
        updateContractItem.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to update contract item";
        }
      )
      .addCase(deleteContractItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteContractItem.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.contractItems = state.contractItems.filter(
            (contractItem) => contractItem.id !== action.payload
          );
          state.error = null;
        }
      )
      .addCase(
        deleteContractItem.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to delete contract item";
        }
      );
  },
});

export default contractItemSlice.reducer;
