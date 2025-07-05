import { call, put, takeLatest, all } from "redux-saga/effects";
import {fetchContactsAPI,addContactAPI,updateContactAPI,deleteContactAPI} from "./ContactAPI";
import {
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
} from "./ContactSlice";

function* handleFetchContacts() {
    try {
    const response = yield call(fetchContactsAPI);
    yield put(fetchContactsSuccess(response.data));
  } catch (error) {
    console.error("Fetch failed:", error.message);
    yield put(fetchContactsFailure(error.message));
  }
}

function* handleAddContact(action) {
    try{
        const {data} = yield call(addContactAPI, action.payload);
        yield put(addContactSuccess(data));
    } catch (error) {
        yield put(addContactFailure(error.message));
    }
}

function* handleUpdateContact(action) {
    try {
        const {data} = yield call(updateContactAPI, action.payload);
        yield put(updateContactSuccess(data));
    } catch(error) {
        yield put(updateContactFailure(error.message));
    }
}

function* handleDeleteContact(action) {
    try{
        yield call(deleteContactAPI, action.payload);
        yield put(deleteContactSuccess(action.payload));
    } catch (error) {
        yield put(deleteContactFailure(error.message));
    }
}

export function* ContactSaga() {
    yield all([
        takeLatest(fetchContactsRequest.type, handleFetchContacts),
        takeLatest(addContactRequest.type,handleAddContact),
        takeLatest(updateContactRequest.type,handleUpdateContact),
        takeLatest(deleteContactRequest.type, handleDeleteContact),
    ])
}