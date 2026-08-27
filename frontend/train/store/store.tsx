import { configureStore } from "@reduxjs/toolkit";

//const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {},
  /*   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),*/
});

//sagaMiddleware.run(rootSaga);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
