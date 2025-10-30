import { AppAction } from "../../../../Models/Actions/Actions";
import { LoadWorkTasksResult } from "../Entity/LoadWorkTasksResult";
import { OneTask } from "../Entity/State/OneTask";
import { TaskRelation } from "../Entity/State/TaskRelation";
import { TasksFilter } from "../Entity/State/TasksFilter";


export const AddTaskToProjectActionName: string = 'AddTaskToProjectAction';
export function AddTaskToProjectActionCreator(data: OneTask): AppAction<OneTask> {
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
export function LoadTasksActionCreator(data: LoadWorkTasksResult): AppAction<LoadWorkTasksResult> {
    return { type: LoadTasksActionName, payload: data };
};

export const DeleteTaskActionName: string = 'DeleteTaskAction';
export function DeleteTaskActionCreator(id: number): AppAction<number> {
    return { type: DeleteTaskActionName, payload: id };
};

export const SetFilterTaskCreatorActionName: string = 'SetFilterTaskCreatorAction';
export function SetFilterTaskCreatorActionCreator(id: number): AppAction<number> {
    return { type: SetFilterTaskCreatorActionName, payload: id };
};

export const SetFilterTaskExecutorActionName: string = 'SetFilterTaskExecutorAction';
export function SetFilterTaskExecutorActionCreator(id: number): AppAction<number> {
    return { type: SetFilterTaskExecutorActionName, payload: id };
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

export const SetFilterTaskSprintActionName: string = 'SetFilterTaskSprintAction';
export function SetFilterTaskSprintActionCreator(num: number): AppAction<number> {
    return { type: SetFilterTaskSprintActionName, payload: num };
};

export const SetFilterTaskLabelActionName: string = 'SetFilterTaskLabelAction';
export function SetFilterTaskLabelActionCreator(num: number): AppAction<number> {
    return { type: SetFilterTaskLabelActionName, payload: num };
};

export const SetFilterTaskActionName: string = 'SetFilterTaskAction';
export function SetFilterTaskActionCreator(data: TasksFilter): AppAction<TasksFilter> {
    return { type: SetFilterTaskActionName, payload: data };
};


export const SetCurrentTaskIdActionName: string = 'SetCurrentTaskIdAction';
export function SetCurrentTaskIdActionCreator(data: number): AppAction<number> {
    return { type: SetCurrentTaskIdActionName, payload: data };
};

export const LoadTaskActionName: string = 'LoadTaskAction';
export function LoadTaskActionCreator(data: OneTask): AppAction<OneTask> {
    return { type: LoadTaskActionName, payload: data };
};

export const ClearCurrentTaskStateActionName: string = 'ClearCurrentTaskStateAction';
export function ClearCurrentTaskStateActionCreator(): AppAction<void> {
    return { type: ClearCurrentTaskStateActionName, payload: null };
};

export const AddTaskRelationStateActionName: string = 'AddTaskRelationStateAction';
export function AddTaskRelationStateActionCreator(data: TaskRelation): AppAction<TaskRelation> {
    return { type: AddTaskRelationStateActionName, payload: data };
};

// export const DeleteTaskRelationStateActionName: string = 'DeleteTaskRelationStateAction';
// export function DeleteTaskRelationStateActionCreator(taskId: number, id: number): AppAction<{ taskId: number, id: number }> {
//     return { type: DeleteTaskRelationStateActionName, payload: { taskId: taskId, id: id } };
// };

export const DeleteTaskRelationStateActionName: string = 'DeleteTaskRelationStateAction';
export function DeleteTaskRelationStateActionCreator(id: number): AppAction<number> {
    return { type: DeleteTaskRelationStateActionName, payload: id };
};

export const LoadTaskRelationStateActionName: string = 'LoadTaskRelationStateAction';
export function LoadTaskRelationStateActionCreator(data:TaskRelation[]): AppAction<TaskRelation[]> {
    return { type: LoadTaskRelationStateActionName, payload: data };
};

export class UpdateTaskNameActionParam { Id: number; Text: string }
export const UpdateTaskNameActionName: string = 'UpdateTaskNameAction';
export function UpdateTaskNameActionCreator(param: UpdateTaskNameActionParam): AppAction<UpdateTaskNameActionParam> {
    return { type: UpdateTaskNameActionName, payload: param };
};

export class UpdateTaskDescriptionActionParam { Id: number; Text: string }
export const UpdateTaskDescriptionActionName: string = 'UpdateTaskDescriptionAction';
export function UpdateTaskDescriptionActionCreator(param: UpdateTaskDescriptionActionParam): AppAction<UpdateTaskDescriptionActionParam> {
    return { type: UpdateTaskDescriptionActionName, payload: param };
};

export class UpdateTaskStatusActionParam { Id: number; IdStatus: number }
export const UpdateTaskStatusActionName: string = 'UpdateTaskStatusAction';
export function UpdateTaskStatusActionCreator(param: UpdateTaskStatusActionParam): AppAction<UpdateTaskStatusActionParam> {
    return { type: UpdateTaskStatusActionName, payload: param };
};

export class UpdateTaskExecutorActionParam { Id: number; PersonId: number }
export const UpdateTaskExecutorActionName: string = 'UpdateTaskExecutorAction';
export function UpdateTaskExecutorActionCreator(param: UpdateTaskExecutorActionParam): AppAction<UpdateTaskExecutorActionParam> {
    return { type: UpdateTaskExecutorActionName, payload: param };
};
