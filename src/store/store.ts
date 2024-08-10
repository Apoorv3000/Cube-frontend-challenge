import { combineReducers, configureStore } from "@reduxjs/toolkit";

import customerSlice from "./features/customer-slice";

const rootReducer = combineReducers({
	customer: customerSlice,
});

export const makeStore = configureStore({
	reducer: rootReducer,
	devTools: true,
});

export type RootState = ReturnType<typeof makeStore.getState>;
export type AppDispatch = typeof makeStore.dispatch;
