import { SagaIterator } from "redux-saga";
import {
    put,
    delay,
    call,
    SagaReturnType,
    cancelled,
} from "redux-saga/effects";
import { resetViewData, requestViewData, receiveViewData } from "../actions";

export function* getViewData(dashboardId: string): SagaIterator<string> {
    yield delay(2000);
    return `view data for dashboard: ${dashboardId}`;
}

export function* loadViewDataWorker(dashboardId: string) {
    yield put(requestViewData());

    try {
        const data: SagaReturnType<typeof getViewData> = yield call(
            getViewData,
            dashboardId
        );
        yield put(receiveViewData(data));
    } finally {
        if (yield cancelled()) {
            yield put(resetViewData());
        }
    }
}
