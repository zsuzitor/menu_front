import { AppAction } from "../../../../Models/Actions/Actions";


export const ClearTaskManagementStateActionName: string = 'ClearTaskManagementStateAction';
export function ClearTaskManagementStateActionCreator(): AppAction<null> {
    return { type: ClearTaskManagementStateActionName, payload: null };
};