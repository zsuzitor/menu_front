import { AppAction } from "../../../../Models/Actions/Actions";
import { ProjectTaskData, LoadReviewTasksResult } from "../Entity/LoadReviewTasksResult";
import { OneTask } from "../Entity/State/OneTask";
import { TasksFilter } from "../Entity/State/TasksFilter";


export const AddTaskToProjectActionName: string = 'AddTaskToProjectAction';
export function AddTaskToProjectActionCreator(data: ProjectTaskData): AppAction<ProjectTaskData> {
    return { type: AddTaskToProjectActionName, payload: data };
};

export const AddLoadTriggerActionName: string = 'AddLoadTriggerAction';
export function AddLoadTriggerActionCreator(): AppAction<null> {
    return { type: AddLoadTriggerActionName, payload: null };
};


export const UpdateTaskActionName: string = 'UpdateTaskAction';
export function UpdateTaskActionCreator(data: OneTask): AppAction<OneTask> {
    return { type: UpdateTaskActionName, payload: data };
};

export const LoadTasksActionName: string = 'LoadTasksAction';
export function LoadTasksActionCreator(data: LoadReviewTasksResult): AppAction<LoadReviewTasksResult> {
    return { type: LoadTasksActionName, payload: data };
};

export const DeleteTaskActionName: string = 'DeleteTaskAction';
export function DeleteTaskActionCreator(id: number): AppAction<number> {
    return { type: DeleteTaskActionName, payload: id };
};

export const SetFilterTaskCreatorActionName: string = 'SetFilterTaskCreator';
export function SetFilterTaskCreatorActionCreator(id: number): AppAction<number> {
    return { type: SetFilterTaskCreatorActionName, payload: id };
};

export const SetFilterTaskReviewerName: string = 'SetFilterTaskReviewer';
export function SetFilterTaskReviewerActionCreator(id: number): AppAction<number> {
    return { type: SetFilterTaskReviewerName, payload: id };
};

export const SetFilterTaskNameActionName: string = 'SetFilterTaskNameAction';
export function SetFilterTaskNameActionCreator(name: string): AppAction<string> {
    return { type: SetFilterTaskNameActionName, payload: name };
};

export const SetFilterTaskPageActionName: string = 'SetFilterTaskPageAction';
export function SetFilterTaskPageActionCreator(num: number): AppAction<number> {
    return { type: SetFilterTaskPageActionName, payload: num };
};

export const SetFilterTaskStatusActionName: string = 'SetFilterTaskStatusAction';
export function SetFilterTaskStatusActionCreator(num: number): AppAction<number> {
    return { type: SetFilterTaskStatusActionName, payload: num };
};

export const SetFilterTaskActionName: string = 'SetFilterTaskAction';
export function SetFilterTaskActionCreator(data: TasksFilter): AppAction<TasksFilter> {
    return { type: SetFilterTaskActionName, payload: data };
};

