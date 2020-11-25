import { SagaIterator } from "redux-saga";
import {
    put,
    delay,
    call,
    SagaReturnType,
    cancelled,
} from "redux-saga/effects";
import {
    createEditDataResetAction,
    createEditDataRequestAction,
    createEditDataSuccessAction,
} from "../actions";

export function* getEditData(dashboardId: string): SagaIterator<string> {
    yield delay(2000);
    return `edit data for dashboard: ${dashboardId}`;
}

export function* loadEditDataWorker(dashboardId: string) {
    yield put(createEditDataRequestAction());

    try {
        const data: SagaReturnType<typeof getEditData> = yield call(
            getEditData,
            dashboardId
        );
        yield put(createEditDataSuccessAction(data));
    } finally {
        if (yield cancelled()) {
            yield put(createEditDataResetAction());
        }
    }
}

export function* resetDashboardEditData() {
    yield put(createEditDataResetAction());
}
