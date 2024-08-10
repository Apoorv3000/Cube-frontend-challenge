import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../../lib/types";
import { fetchPhotos } from "../actions/photos-action";

interface CustomerState {
	customers: Customer[];
	loading: boolean;
	error: string | null;
	activeCustomer: Customer | null;
	photos: any[];
	photosLoading: boolean;
	photosError: string | null;
}

const initialState: CustomerState = {
	customers: [],
	loading: false,
	error: null,
	activeCustomer: null,
	photos: [],
	photosLoading: false,
	photosError: null,
};

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		getCustomersSuccess(state, action: PayloadAction<Customer[]>) {
			state.customers = action.payload;
			state.loading = false;
		},
		addCustomer(state, action: PayloadAction<Customer>) {
			state.customers.push(action.payload);
		},
		setAtiveCustomer(state, action: PayloadAction<Customer>) {
			state.activeCustomer = action.payload;
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchPhotos.pending, (state) => {
			state.photosLoading = true;
		});
		builder.addCase(fetchPhotos.fulfilled, (state, action) => {
			state.photos = action.payload;

			state.photosLoading = false;
		});
		builder.addCase(fetchPhotos.rejected, (state, action) => {
			state.photosError = action.payload as string;
			state.photosLoading = false;
		});
	},
});

export const { getCustomersSuccess, addCustomer, setAtiveCustomer } = customerSlice.actions;

export default customerSlice.reducer;
