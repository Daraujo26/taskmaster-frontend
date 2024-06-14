import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import clientReducer from "./slices/clientSlice";
import taskReducer from "./slices/taskSlice";
import jobReducer from "./slices/jobSlice";
import contractItemReducer from "./slices/contractItemSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        clients: clientReducer,
        tasks: taskReducer,
        jobs: jobReducer,
        contractItems: contractItemReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
