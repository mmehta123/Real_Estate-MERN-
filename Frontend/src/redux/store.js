import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";

const persistConfigs = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({ user: userReducer });
const persistedReducer = persistReducer(persistConfigs, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
