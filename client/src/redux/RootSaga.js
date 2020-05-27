import { call, all } from "redux-saga/effects";
import { fetchCollectionsStart } from "./Shop.Sagas";
import { userSagas } from "./User.Sagas";
import { cartSaga } from "./Cart.Sagas";
export default function* RootSaga() {
  yield all([call(fetchCollectionsStart), call(userSagas), call(cartSaga)]);
}
