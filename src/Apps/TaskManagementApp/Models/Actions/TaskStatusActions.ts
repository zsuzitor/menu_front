import { AppAction } from "../../../../Models/Actions/Actions";
import { WorkTaskStatus } from "../Entity/State/WorkTaskStatus";

export const SetCurrentProjectStatusesActionName: string = 'SetCurrentProjectStatusesAction';
export function SetCurrentProjectStatusesActionCreator(statuses: WorkTaskStatus[]): AppAction<WorkTaskStatus[]> {
    return { type: SetCurrentProjectStatusesActionName, payload: statuses };
};


export const DeleteCurrentProjectTaskStatusActionName: string = 'DeleteCurrentProjectTaskStatusAction';
export function DeleteCurrentProjectTaskStatusActionCreator(statusId: number): AppAction<number> {
    return { type: DeleteCurrentProjectTaskStatusActionName, payload: statusId };
};


export const CreateCurrentProjectTaskStatusActionName: string = 'CreateCurrentProjectTaskStatusAction';
export function CreateCurrentProjectTaskStatusActionCreator(status: WorkTaskStatus): AppAction<WorkTaskStatus> {
    return { type: CreateCurrentProjectTaskStatusActionName, payload: status };
};

export const UpdateCurrentProjectTaskStatusActionName: string = 'UpdateCurrentProjectTaskStatusAction';
export function UpdateCurrentProjectTaskStatusActionCreator(status: WorkTaskStatus): AppAction<WorkTaskStatus> {
    return { type: UpdateCurrentProjectTaskStatusActionName, payload: status };
};
