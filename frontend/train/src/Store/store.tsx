// store.ts

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import ProductSliceReducer from "./slices/ProductSlice";
import PokemonSliceReducer from "./slices/pokemon/PokemonSlice";
import LoadingSliceReducer from "./slices/LoadingSlice";
import rootSaga from "./saga/RootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    productSlice: ProductSliceReducer,
    PokemonSlice: PokemonSliceReducer,
    LoadingSlice: LoadingSliceReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
