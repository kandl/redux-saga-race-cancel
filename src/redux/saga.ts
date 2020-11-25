import { call } from "redux-saga/effects";

import { dashboardWorker } from "./dashboardModule/saga";

export function* rootSaga() {
    yield call(dashboardWorker);
}
