import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchSalesOrdersRequest,
  fetchSalesOrdersSuccess,
  fetchSalesOrdersFailure,
  addSalesOrderRequest,
  addSalesOrderSuccess,
  addSalesOrderFailure,
  updateSalesOrderRequest,
  // updateSalesOrderSuccess,
  // updateSalesOrderFailure,
  deleteSalesOrderRequest,
  deleteSalesOrderSuccess,
  deleteSalesOrderFailure,
} from "./SalesSlice";
import {
  fetchSalesOrdersAPI,
  addSalesOrderAPI,
  updateSalesOrderAPI,
  deleteSalesOrderAPI,
} from "./SalesAPI";

function* fetchSalesOrdersSaga() {
  try {
    const data = yield call(fetchSalesOrdersAPI);
    yield put(fetchSalesOrdersSuccess(data));
  } catch (error) {
    yield put(fetchSalesOrdersFailure(error.message));
  }
}

function* addSalesOrderSaga(action) {
  try {
    const data = yield call(addSalesOrderAPI, action.payload);
    yield put(addSalesOrderSuccess(data));
  } catch (error) {
    yield put(addSalesOrderFailure(error.message));
  }
}

function* updateSalesOrderSaga(action) {
  try {
    const { id, updatedData } = action.payload;
    const response = yield call(updateSalesOrderAPI, id, updatedData);
    yield put(fetchSalesOrdersRequest());
  } catch (error) {
    console.error("Update failed", error);
  }
}

function* deleteSalesOrderSaga(action) {
  try {
    yield call(deleteSalesOrderAPI, action.payload);
    yield put(deleteSalesOrderSuccess(action.payload));
  } catch (error) {
    yield put(deleteSalesOrderFailure(error.message));
  }
}

export default function* SalesSaga() {
  yield all([
    takeLatest(fetchSalesOrdersRequest.type, fetchSalesOrdersSaga),
    takeLatest(addSalesOrderRequest.type, addSalesOrderSaga),
    takeLatest(updateSalesOrderRequest.type, updateSalesOrderSaga),
    takeLatest(deleteSalesOrderRequest.type, deleteSalesOrderSaga),
  ]);
}
