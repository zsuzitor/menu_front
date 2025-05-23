import { AppAction } from "../../../../Models/Actions/Actions";
import { TaskReviewStatus } from "../Entity/State/TaskReviewStatus";

export const SetCurrentProjectStatusesActionName: string = 'SetCurrentProjectStatusesAction';
export function SetCurrentProjectStatusesActionCreator(statuses: TaskReviewStatus[]): AppAction<TaskReviewStatus[]> {
    return { type: SetCurrentProjectStatusesActionName, payload: statuses };
};


export const DeleteCurrentProjectTaskStatusActionName: string = 'DeleteCurrentProjectTaskStatusAction';
export function DeleteCurrentProjectTaskStatusActionCreator(statusId: number): AppAction<number> {
    return { type: DeleteCurrentProjectTaskStatusActionName, payload: statusId };
};


export const CreateCurrentProjectTaskStatusActionName: string = 'CreateCurrentProjectTaskStatusAction';
export function CreateCurrentProjectTaskStatusActionCreator(status: TaskReviewStatus): AppAction<TaskReviewStatus> {
    return { type: CreateCurrentProjectTaskStatusActionName, payload: status };
};
