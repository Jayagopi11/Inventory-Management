import { call, put, takeLatest } from 'redux-saga/effects';
import {
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
} from './ProductSlice';
import * as api from './ProductAPI';

function* fetchProducts() {
  try {
    const products = yield call(api.fetchProducts);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* addProduct(action) {
  try {
    const newProduct = yield call(api.addProduct, action.payload);
    yield put(addProductSuccess(newProduct));
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

function* updateProduct(action) {
  try {
    const updated = yield call(api.updateProduct, action.payload.id, action.payload.data);
    yield put(updateProductSuccess(updated));
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}

function* deleteProduct(action) {
  try {
    yield call(api.deleteProduct, action.payload);
    yield put(deleteProductSuccess(action.payload));
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
  yield takeLatest(addProductRequest.type, addProduct);
  yield takeLatest(updateProductRequest.type, updateProduct);
  yield takeLatest(deleteProductRequest.type, deleteProduct);
}
