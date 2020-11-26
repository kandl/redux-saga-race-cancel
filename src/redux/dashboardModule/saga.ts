import {
    takeLatest,
    call,
    select,
    race,
    take,
    cancelled,
} from "redux-saga/effects";
import { dashboardIdSelector } from "../selectors";
import {
    loadEditDataWorker,
    resetDashboardEditData,
} from "../editDataModule/saga";
import { loadViewDataWorker } from "../viewDataModule/saga";

export function* loadDashboardViewData() {
    const dashboardId = yield select(dashboardIdSelector);
    yield call(loadViewDataWorker, dashboardId);
}

export function* editDashboardWorker() {
    while (true) {
        const dashboardId = yield select(dashboardIdSelector);
        const result = yield race({
            data: call(loadEditDataWorker, dashboardId),
            initializeDashboard: take("INITIALIZE_DASHBOARD"),
        });

        // Dashboard switched during the load, load again.
        if (result.initializeDashboard) {
            continue;
        }

        try {
            yield take("INITIALIZE_DASHBOARD");
        } finally {
            if (yield cancelled()) {
                yield call(resetDashboardEditData);
            }
        }
    }
}

export function* editDashboard() {
    yield race({
        data: call(editDashboardWorker),
        cancelEdit: take("LEAVE_EDIT_MODE"),
    });
}

export function* dashboardWorker() {
    yield takeLatest("INITIALIZE_DASHBOARD", loadDashboardViewData);
    yield takeLatest("ENTER_EDIT_MODE", editDashboard);
}
