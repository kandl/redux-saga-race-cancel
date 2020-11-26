import { Reducer } from "redux";
import { Actions } from "./actions";
import { Data } from "./types";

export type State = {
    // dashboard module
    dashboardId: string;
    isEditing: boolean;
    // view data module
    viewDataStatus: null | "pending" | "success";
    viewData: null | Data;
    // edit data module
    editDataStatus: null | "pending" | "success";
    editData: null | Data;
};

export const initialState: State = {
    // dashboard module
    dashboardId: "dashboard1",
    isEditing: false,
    // view data module
    viewDataStatus: null,
    viewData: null,
    // edit data module
    editDataStatus: null,
    editData: null,
};

export const reducer: Reducer<State, Actions> = (
    state = initialState,
    action
): State => {
    switch (action.type) {
        case "INITIALIZE_DASHBOARD": {
            return {
                ...state,
                dashboardId: action.payload.dashboardId,
            };
        }
        case "ENTER_DASHBOARD_EDIT_MODE": {
            return {
                ...state,
                isEditing: true,
            };
        }
        case "LEAVE_DASHBOARD_EDIT_MODE": {
            return {
                ...state,
                isEditing: false,
            };
        }
        case "REQUEST_VIEW_DATA": {
            return {
                ...state,
                viewDataStatus: "pending",
            };
        }
        case "RECEIVE_VIEW_DATA": {
            return {
                ...state,
                viewDataStatus: "success",
                viewData: action.payload.data,
            };
        }
        case "RESET_VIEW_DATA": {
            return {
                ...state,
                viewDataStatus: null,
                viewData: null,
            };
        }
        case "REQUEST_EDIT_DATA": {
            return {
                ...state,
                editData: null,
                editDataStatus: "pending",
            };
        }
        case "RECEIVE_EDIT_DATA": {
            return {
                ...state,
                editDataStatus: "success",
                editData: action.payload.data,
            };
        }
        case "RESET_EDIT_DATA": {
            return {
                ...state,
                editDataStatus: null,
                editData: null,
            };
        }
        default:
            return state;
    }
};
