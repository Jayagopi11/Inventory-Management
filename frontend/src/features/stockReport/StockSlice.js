import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStockAPI = () => axios.get("/api/stock/report");

const StockSlice = createSlice({
  name: "stock",
  initialState: {
    stockData: [],
    loading: false,
    error: null,
    notification: null,
  },
  reducers: {
    fetchStockRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStockSuccess: (state, action) => {
      state.loading = false;
      state.stockData = action.payload;
    },
    fetchStockFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  fetchStockRequest,
  fetchStockSuccess,
  fetchStockFailure,
  clearNotification,
} = StockSlice.actions;

export default StockSlice.reducer;
