import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { AppAction } from "../Actions";


export const AddTaskToProjectActionName: string = 'AddTaskToProjectAction';
export function AddTaskToProjectActionCreator(data: IProjectTaskDataBack): AppAction<IProjectTaskDataBack> {
    return { type: AddTaskToProjectActionName, payload: data };
};

export const UpdateTaskActionName: string = 'UpdateTaskAction';
export function UpdateTaskActionCreator(data: IProjectTaskDataBack): AppAction<IProjectTaskDataBack> {
    return { type: UpdateTaskActionName, payload: data };
};

export const LoadTasksActionName: string = 'LoadTasksAction';
export function LoadTasksActionCreator(data: ILoadReviewTasksResultDataBack): AppAction<ILoadReviewTasksResultDataBack> {
    return { type: LoadTasksActionName, payload: data };
};

export const DeleteTaskActionName: string = 'DeleteTaskAction';
export function DeleteTaskActionCreator(id: number): AppAction<number> {
    return { type: DeleteTaskActionName, payload: id };
};


