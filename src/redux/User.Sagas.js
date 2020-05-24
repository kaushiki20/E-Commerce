import { call, put, takeLatest, all } from "redux-saga/effects";
import UserActionTypes from "./UserType";
import {
  SignInSuccess,
  SignInFailure,
  signOutSuccess,
  signOutFailure,
} from "./UserAction";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../firebase/FireBaseUtils";

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    put(signOutFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      return;
    }
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(SignInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield SignInFailure(error);
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    SignInFailure(error);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* googleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* emailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(emailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
}
