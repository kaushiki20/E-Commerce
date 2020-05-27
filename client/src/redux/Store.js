import { createStore, applyMiddleware } from "redux";
import { fetchCollectionsStart } from "./Shop.Sagas";
//import thunk from "redux-thunk";
import RootSaga from "./RootSaga";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import RootReducer from "./RootReducer";
import { persistStore } from "redux-persist";
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const Store = createStore(RootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(RootSaga);
export const persistor = persistStore(Store);
