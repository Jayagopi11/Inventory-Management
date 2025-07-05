import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
    notification: null,
  },
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProductRequest: (state) => {},
    addProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.notification = 'Product added successfully';
    },
    addProductFailure: (state, action) => {
      state.error = action.payload;
    },

    updateProductRequest: (state) => {},
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) state.products[index] = action.payload;
      state.notification = 'Product updated successfully';
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
    },

    deleteProductRequest: (state) => {},
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter(p => p._id !== action.payload);
      state.notification = 'Product deleted successfully';
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  clearNotification,
} = productSlice.actions;

export default productSlice.reducer;
