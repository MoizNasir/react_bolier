import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import { loaderReducer, AuthReducer } from "./reducers";

import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

//////// ^^^ imports

const combinedReducer = combineReducers({
  loaderReducer,
  AuthReducer, //^^new reduceers here
});
//for logout use >>> dispatch(clearStore())

const rootReducer = (state: any, action: any) => {
  if (action.type === "root/clearStore") {
    state = undefined;
    //logout logic here
    window.open(`http://localhost:3001`, "_self");
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["layoutReducer"],//include to persist reducer on reload
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
