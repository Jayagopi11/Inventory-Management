import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchStockRequest,
  fetchStockSuccess,
  fetchStockFailure,
} from "./StockSlice";
import { fetchStockAPI } from "./StockAPI";

function* handleFetchStock() {
  try {
    const data = yield call(fetchStockAPI);
    yield put(fetchStockSuccess(data));
  } catch (error) {
    yield put(fetchStockFailure(error.message));
  }
}

export default function* StockSaga() {
  yield takeLatest(fetchStockRequest.type, handleFetchStock);
}
