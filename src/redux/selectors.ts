import { State } from "./reducer";

export const isEditingSelector = (state: State) => state.isEditing;
export const viewDataStatusSelector = (state: State) => state.viewDataStatus;
export const viewDataSelector = (state: State) => state.viewData;
export const editDataStatusSelector = (state: State) => state.editDataStatus;
export const dashboardEditDataSelector = (state: State) => state.editData;
export const dashboardIdSelector = (state: State) => state.dashboardId;
