import { SagaIterator } from "redux-saga";
import {
    put,
    delay,
    call,
    SagaReturnType,
    cancelled,
} from "redux-saga/effects";
import {
    createViewDataResetAction,
    createViewDataRequestAction,
    createViewDataSuccessAction,
} from "../actions";

export function* getViewData(dashboardId: string): SagaIterator<string> {
    yield delay(2000);
    return `view data for dashboard: ${dashboardId}`;
}

export function* loadViewDataWorker(dashboardId: string) {
    yield put(createViewDataRequestAction());

    try {
        const data: SagaReturnType<typeof getViewData> = yield call(
            getViewData,
            dashboardId
        );
        yield put(createViewDataSuccessAction(data));
    } finally {
        if (yield cancelled()) {
            yield put(createViewDataResetAction());
        }
    }
}
