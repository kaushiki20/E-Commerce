import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import CartReducer from "./CartReducer";
import DirectoryReducer from "./DirectoryReducer";
import ShopReducer from "./ShopReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: UserReducer,
  cart: CartReducer,
  directory: DirectoryReducer,
  shop: ShopReducer,
});

export default persistReducer(persistConfig, rootReducer);
