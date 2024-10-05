import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobReducer from "./jobSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import companyReducer from "./companySlice";
import applicationReducer from "./applicationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
  company: companyReducer,
  application: applicationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //         serializableCheck: {
  //             ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //         },
  //     }),
});

export default store;
