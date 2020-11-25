import { Reducer } from "redux";
import { Actions } from "./actions";
import { Data } from "./types";

export type State = {
    dashboardId: string;
    isEditing: boolean;
    viewDataStatus: null | "pending" | "success";
    viewData: null | Data;
    editDataStatus: null | "pending" | "success";
    editData: null | Data;
};

export const initialState: State = {
    dashboardId: "dashboard1",
    isEditing: false,
    viewDataStatus: null,
    viewData: null,
    editDataStatus: null,
    editData: null,
};

export const reducer: Reducer<State, Actions> = (
    state = initialState,
    action
): State => {
    switch (action.type) {
        case "EDIT_DASHBOARD": {
            return {
                ...state,
                isEditing: true,
            };
        }
        case "SWITCH_DASHBOARD": {
            return {
                ...state,
                dashboardId: action.payload.dashboardId,
            };
        }
        case "CANCEL_EDIT": {
            return {
                ...state,
                isEditing: false,
            };
        }
        case "VIEW_DATA_REQUEST": {
            return {
                ...state,
                viewDataStatus: "pending",
            };
        }
        case "VIEW_DATA_SUCCESS": {
            return {
                ...state,
                viewDataStatus: "success",
                viewData: action.payload.data,
            };
        }
        case "VIEW_DATA_RESET": {
            return {
                ...state,
                viewDataStatus: null,
                viewData: null,
            };
        }
        case "EDIT_DATA_REQUEST": {
            return {
                ...state,
                editData: null,
                editDataStatus: "pending",
            };
        }
        case "EDIT_DATA_SUCCESS": {
            return {
                ...state,
                editDataStatus: "success",
                editData: action.payload.data,
            };
        }
        case "EDIT_DATA_RESET": {
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
