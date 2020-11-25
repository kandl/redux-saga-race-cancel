import { Data } from "./types";

export type ActionKey =
    | "LOAD_DASHBOARD"
    | "EDIT_DASHBOARD"
    | "CANCEL_EDIT"
    | "SWITCH_DASHBOARD"

    // View module
    | "VIEW_DATA_REQUEST"
    | "VIEW_DATA_SUCCESS"
    | "VIEW_DATA_RESET"

    // Edit module
    | "EDIT_DATA_REQUEST"
    | "EDIT_DATA_SUCCESS"
    | "EDIT_DATA_RESET";

export type Action<T extends ActionKey, P> = {
    type: T;
    payload: P;
};

export const createAction = <T extends ActionKey, P>(
    type: T,
    payload: P
): Action<T, P> => ({
    type,
    payload,
});

export type Actions = ReturnType<
    // Dashboard module
    | typeof createLoadDashboardAction
    | typeof createEditDashboardAction
    | typeof createCancelEditAction
    | typeof createSwitchDashboardAction

    // View module
    | typeof createViewDataRequestAction
    | typeof createViewDataSuccessAction
    | typeof createViewDataResetAction

    // Edit module
    | typeof createEditDataRequestAction
    | typeof createEditDataSuccessAction
    | typeof createEditDataResetAction
>;

// Dashboard module
export const createLoadDashboardAction = () =>
    createAction("LOAD_DASHBOARD", {});
export const createEditDashboardAction = () =>
    createAction("EDIT_DASHBOARD", {});
export const createCancelEditAction = () => createAction("CANCEL_EDIT", {});
export const createSwitchDashboardAction = (dashboardId: string) =>
    createAction("SWITCH_DASHBOARD", { dashboardId });

// View module
export const createViewDataRequestAction = () =>
    createAction("VIEW_DATA_REQUEST", {});
export const createViewDataSuccessAction = (data: Data) =>
    createAction("VIEW_DATA_SUCCESS", { data });
export const createViewDataResetAction = () =>
    createAction("VIEW_DATA_RESET", {});

// Edit module
export const createEditDataRequestAction = () =>
    createAction("EDIT_DATA_REQUEST", {});
export const createEditDataSuccessAction = (data: Data) =>
    createAction("EDIT_DATA_SUCCESS", { data });
export const createEditDataResetAction = () =>
    createAction("EDIT_DATA_RESET", {});
