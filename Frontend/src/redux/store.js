import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobReducer from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "auth",
  storage: storageSession,
  version: 1,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    job: jobReducer,
    company: companySlice,
    application: applicationSlice, // ✅ Now valid
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
