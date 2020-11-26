import { Data } from "./types";

export type ActionKey =
    | "INITIALIZE_DASHBOARD"
    | "ENTER_DASHBOARD_EDIT_MODE"
    | "LEAVE_DASHBOARD_EDIT_MODE"

    // View module
    | "REQUEST_VIEW_DATA"
    | "RECEIVE_VIEW_DATA"
    | "RESET_VIEW_DATA"

    // Edit module
    | "REQUEST_EDIT_DATA"
    | "RECEIVE_EDIT_DATA"
    | "RESET_EDIT_DATA";

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
    | typeof enterDashboardEditMode
    | typeof leaveDashboardEditMode
    | typeof initializeDashboard

    // View module
    | typeof requestViewData
    | typeof receiveViewData
    | typeof resetViewData

    // Edit module
    | typeof requestEditData
    | typeof receiveEditData
    | typeof resetEditData
>;

// Dashboard module
export const enterDashboardEditMode = () =>
    createAction("ENTER_DASHBOARD_EDIT_MODE", {});
export const leaveDashboardEditMode = () =>
    createAction("LEAVE_DASHBOARD_EDIT_MODE", {});
export const initializeDashboard = (dashboardId: string) =>
    createAction("INITIALIZE_DASHBOARD", { dashboardId });

// View module
export const requestViewData = () => createAction("REQUEST_VIEW_DATA", {});
export const receiveViewData = (data: Data) =>
    createAction("RECEIVE_VIEW_DATA", { data });
export const resetViewData = () => createAction("RESET_VIEW_DATA", {});

// Edit module
export const requestEditData = () => createAction("REQUEST_EDIT_DATA", {});
export const receiveEditData = (data: Data) =>
    createAction("RECEIVE_EDIT_DATA", { data });
export const resetEditData = () => createAction("RESET_EDIT_DATA", {});
