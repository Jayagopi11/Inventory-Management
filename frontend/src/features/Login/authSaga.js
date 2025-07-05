import {call,put,takeLatest} from "redux-saga/effects";
import axios from "axios";
import {loginRequest,loginSuccess,loginFailure} from "./authSlice";

function* loginSaga(action){
     try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/api/auth/login",
      action.payload
    );

    yield put(loginSuccess(response.data));


    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);


    const role = response.data.user.role;
    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/admin";
    }

  } catch (error) {
    yield put(loginFailure(error.response?.data?.error || "Login failed"));
  }
}

export default function* authWatcher(){
    yield takeLatest(loginRequest.type,loginSaga);
}

