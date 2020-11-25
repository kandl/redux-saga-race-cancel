import { applyMiddleware, createStore } from "redux";
import loggerMiddleware from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./reducer";
import { rootSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, loggerMiddleware)
);

sagaMiddleware.run(rootSaga);
