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
            switchDashboard: take("SWITCH_DASHBOARD"),
        });

        // Dashboard switched during the load, load again.
        if (result.switchDashboard) {
            continue;
        }

        try {
            // Dashboard edit data loaded, wait for switching the dashboard, or canceling this worker
            yield take("SWITCH_DASHBOARD");
        } finally {
            // Worker canceled, perform cleanup
            if (yield cancelled()) {
                yield call(resetDashboardEditData);
            }
        }
    }
}

export function* editDashboard() {
    // Enter edit mode, until cancel event is fired
    yield race({
        data: call(editDashboardWorker),
        cancelEdit: take("CANCEL_EDIT"),
    });
}

export function* dashboardWorker() {
    yield takeLatest(
        ["LOAD_DASHBOARD", "SWITCH_DASHBOARD"],
        loadDashboardViewData
    );

    yield takeLatest("EDIT_DASHBOARD", editDashboard);
}
