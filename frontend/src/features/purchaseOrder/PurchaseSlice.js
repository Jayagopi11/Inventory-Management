import { createSlice } from '@reduxjs/toolkit';

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState: {
    purchases: [],
    loading: false,
    error: null,
    notification: null,
  },
  reducers: {
    fetchPurchasesRequest: (state) => { state.loading = true; },
    fetchPurchasesSuccess: (state, action) => {
      state.loading = false;
      state.purchases = action.payload;
    },
    fetchPurchasesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addPurchaseRequest: (state, action) => {},
    addPurchaseSuccess: (state, action) => {
      state.purchases.push(action.payload);
    },
    addPurchaseFailure: (state, action) => {
      state.error = action.payload;
    },

    updatePurchaseRequest: (state, action) => {},
    updatePurchaseSuccess: (state, action) => {
      const index = state.purchases.findIndex(p => p._id === action.payload._id);
      if (index !== -1) state.purchases[index] = action.payload;
    },
    updatePurchaseFailure: (state, action) => {
      state.error = action.payload;
    },

    deletePurchaseRequest: (state, action) => {},
    deletePurchaseSuccess: (state, action) => {
      state.purchases = state.purchases.filter(p => p._id !== action.payload);
    },
    deletePurchaseFailure: (state, action) => {
      state.error = action.payload;
    },

    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  fetchPurchasesRequest,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
  addPurchaseRequest,
  addPurchaseSuccess,
  addPurchaseFailure,
  updatePurchaseRequest,
  updatePurchaseSuccess,
  updatePurchaseFailure,
  deletePurchaseRequest,
  deletePurchaseSuccess,
  deletePurchaseFailure,
  clearNotification,
} = purchaseSlice.actions;

export default purchaseSlice.reducer;
