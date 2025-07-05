import { createSlice } from "@reduxjs/toolkit";

const initialState = {  
    salesOrders: [],
    loading: false,
    error: null,
    Notification: null,  
}

const SalesSlice = createSlice({
  name: "sales",
  initialState, 
  reducers: {
    fetchSalesOrdersRequest: (state) => {
      state.loading = true;
    },
    fetchSalesOrdersSuccess: (state, action) => {
      state.loading = false;
      state.salesOrders = action.payload;
    },
    fetchSalesOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSalesOrderRequest: (state) => {
      state.loading = true;
    },
    addSalesOrderSuccess: (state, action) => {
      state.loading = false;
      state.salesOrders.push(action.payload);
      state.Notification = "Sales order added Successfully";
    },
    addSalesOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSalesOrderRequest: (state) => {
      state.loading = true;
    },
    updateSalesOrderSuccess: (state, action) => {
      state.loading = false;
      const index = state.salesOrders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) state.salesOrders[index] = action.payload;
      state.Notification = "Sales order updated Successfully";
    },
    updateSalesOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSalesOrderRequest: (state) => {
      state.loading = true;
    },
    deleteSalesOrderSuccess: (state, action) => {
      state.loading = false;
      state.salesOrders = state.salesOrders.filter(
        (order) => order._id !== action.payload
      );
      state.Notification = "Sales order deleted successfully";
    },
    deleteSalesOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNotification: (state) => {
      state.Notification = null;
    },
  },
});

export const {
  fetchSalesOrdersRequest,
  fetchSalesOrdersSuccess,
  fetchSalesOrdersFailure,
  addSalesOrderRequest,
  addSalesOrderSuccess,
  addSalesOrderFailure,
  updateSalesOrderRequest,
  updateSalesOrderSuccess,
  updateSalesOrderFailure,
  deleteSalesOrderRequest,
  deleteSalesOrderSuccess,
  deleteSalesOrderFailure,
  clearNotification,
} = SalesSlice.actions;

export default SalesSlice.reducer;
