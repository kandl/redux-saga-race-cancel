import { SagaIterator } from "redux-saga";
import {
    put,
    delay,
    call,
    SagaReturnType,
    cancelled,
} from "redux-saga/effects";
import { resetEditData, requestEditData, receiveEditData } from "../actions";

export function* getEditData(dashboardId: string): SagaIterator<string> {
    yield delay(2000);
    return `edit data for dashboard: ${dashboardId}`;
}

export function* loadEditDataWorker(dashboardId: string) {
    yield put(requestEditData());

    try {
        const data: SagaReturnType<typeof getEditData> = yield call(
            getEditData,
            dashboardId
        );
        yield put(receiveEditData(data));
    } finally {
        if (yield cancelled()) {
            yield put(resetEditData());
        }
    }
}

export function* resetDashboardEditData() {
    yield put(resetEditData());
}
