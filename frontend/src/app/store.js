import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productReducer from "../features/product/ProductSlice";
import purchaseReducer from "../features/purchaseOrder/PurchaseSlice";
import salesReducer from "../features/salesOrder/SalesSlice";
import stockReducer from "../features/stockReport/StockSlice";
import contactReducer from "../features/contacts/ContactSlice";
import rootSaga from "../saga/rootSaga";
import authReducer from "../features/Login/authSlice";

// Create the saga middleware ///
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store ///
const store = configureStore({
  reducer: {
    product: productReducer,
    purchase: purchaseReducer,
    sales: salesReducer,
    stock: stockReducer,
    contacts: contactReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, 
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Run the root saga ///
sagaMiddleware.run(rootSaga);

export default store;
