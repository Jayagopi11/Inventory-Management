import { createSlice } from "@reduxjs/toolkit";

const ContactSlice = createSlice({
  name: "contact",
  initialState: {
    contact: [],
    loading: false,
    error: null,
    notification: null,
  },
  reducers: {
    fetchContactsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchContactsSuccess: (state, action) => {
      state.loading = false;
      state.contact = action.payload;
    },
    fetchContactsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addContactRequest: (state) => {
      state.loading = true;
    },
    addContactSuccess: (state, action) => {
      state.loading = false;
      state.contact.push(action.payload);
      state.notification = "Contact added successfully";
    },
    addContactFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateContactRequest: (state) => {
      state.loading = true;
    },
    updateContactSuccess: (state, action) => {
      state.loading = false;
      state.contact = state.contact.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
      state.notification = "Contact updated successfully";
    },
    updateContactFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteContactRequest: (state) => {
      state.loading = true;
    },
    deleteContactSuccess: (state, action) => {
      state.loading = false;
      state.contact = state.contact.filter((c) => c._id !== action.payload);
      state.notification = "Contact deleted successfully";
    },
    deleteContactFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
     setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

export const {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsFailure,
  addContactRequest,
  addContactSuccess,
  addContactFailure,
  updateContactRequest,
  updateContactSuccess,
  updateContactFailure,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactFailure,
  clearNotification,
  setNotification,
} = ContactSlice.actions;

export default ContactSlice.reducer;
