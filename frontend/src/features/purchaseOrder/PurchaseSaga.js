import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from './PurchaseSlice';
import * as api from './PurchaseAPI';

function* fetchPurchases() {
  try {
    const purchases = yield call(api.fetchPurchases);
    yield put(fetchPurchasesSuccess(purchases));
  } catch (error) {
    yield put(fetchPurchasesFailure(error.message));
  }
}

function* addPurchase(action) {
  try {
    const newPurchase = yield call(api.addPurchase, action.payload);
    yield put(addPurchaseSuccess(newPurchase));
  } catch (error) {
    yield put(addPurchaseFailure(error.message));
  }
}

function* updatePurchase(action) {
  try {
    const updated = yield call(api.updatePurchase, action.payload.id, action.payload.data);
    yield put(updatePurchaseSuccess(updated));
  } catch (error) {
    yield put(updatePurchaseFailure(error.message));
  }
}

function* deletePurchase(action) {
  try {
    yield call(api.deletePurchase, action.payload);
    yield put(deletePurchaseSuccess(action.payload));
  } catch (error) {
    yield put(deletePurchaseFailure(error.message));
  }
}

export default function* purchaseSaga() {
  yield takeLatest(fetchPurchasesRequest.type, fetchPurchases);
  yield takeLatest(addPurchaseRequest.type, addPurchase);
  yield takeLatest(updatePurchaseRequest.type, updatePurchase);
  yield takeLatest(deletePurchaseRequest.type, deletePurchase);
}
