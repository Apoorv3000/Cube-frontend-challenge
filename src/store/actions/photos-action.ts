import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const UNSPLASH_ACCOUNT_KEY = process.env.VITE_APP_UNSPLASH_ACCOUNT_KEY;
if (!UNSPLASH_ACCOUNT_KEY) {
	throw new Error("UNSPLASH_ACCOUNT_KEY is not defined");
}

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
	const response = await axios.get(`https://api.unsplash.com/photos?client_id=${UNSPLASH_ACCOUNT_KEY}&per_page=9`);
	return response.data;
});
