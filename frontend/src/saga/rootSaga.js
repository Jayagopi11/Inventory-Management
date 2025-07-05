import { all } from "redux-saga/effects";
import productSaga from "../features/product/ProductSaga";
import purchaseSaga from "../features/purchaseOrder/PurchaseSaga";
import salesSaga from "../features/salesOrder/SalesSaga";
import stockSaga from "../features/stockReport/StockSaga";
import { ContactSaga } from "../features/contacts/ContactSaga";
import authSaga from "../features/Login/authSaga";

export default function* rootSaga() {
  yield all([
    productSaga(),
    purchaseSaga(),
    salesSaga(),
    stockSaga(),
    ContactSaga(),
    authSaga(),
  ]);
}
