import { call, put, takeLatest, all } from "redux-saga/effects";
import UserActionTypes from "./UserType";
import { clearCart } from "./CartAction";
export function* onClearCart() {
  yield put(clearCart());
}

export function* onSignoutCart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, onClearCart);
}

export function* cartSaga() {
  yield all([call(onSignoutCart)]);
}
