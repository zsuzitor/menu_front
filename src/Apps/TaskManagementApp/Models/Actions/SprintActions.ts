import { AppAction } from "../../../../Models/Actions/Actions";
import { OneTask } from "../Entity/State/OneTask";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { TaskLabel } from "../Entity/State/TaskLabel";

export const SetCurrentSprintActionName: string = 'SetCurrentSprintAction';
export function SetCurrentSprintActionCreator(sprintId: number): AppAction<number> {
    return { type: SetCurrentSprintActionName, payload: sprintId };
};

export const GetProjectSprintsActionName: string = 'GetProjectSprintsAction';
export class GetProjectSprintsActionType { //projectId: number;
     data: ProjectSprint[] };
export function GetProjectSprintsActionCreator(data: GetProjectSprintsActionType): AppAction<GetProjectSprintsActionType> {
    return { type: GetProjectSprintsActionName, payload: data };
};

export const GetSprintsTasksActionName: string = 'GetSprintsTasksAction';
export function GetSprintsTasksActionCreator(data: OneTask[]): AppAction<OneTask[]> {
    return { type: GetSprintsTasksActionName, payload: data };
};

export const CreateSprintActionName: string = 'CreateSprintAction';
export function CreateSprintActionCreator(data: ProjectSprint): AppAction<ProjectSprint> {
    return { type: CreateSprintActionName, payload: data };
};

export const UpdateSprintActionName: string = 'UpdateSprintAction';
export function UpdateSprintActionCreator(data: ProjectSprint): AppAction<ProjectSprint> {
    return { type: UpdateSprintActionName, payload: data };
};

export const DeleteSprintActionName: string = 'DeleteSprintAction';
export function DeleteSprintActionCreator(data: number): AppAction<number> {
    return { type: DeleteSprintActionName, payload: data };
};

export const AddTaskToSprintActionName: string = 'AddTaskToSprintAction';
export class TaskIdWithSprintIdActionType { taskId: number; sprintId: number };
export function AddTaskToSprintActionCreator(data: TaskIdWithSprintIdActionType): AppAction<TaskIdWithSprintIdActionType> {
    return { type: AddTaskToSprintActionName, payload: data };
};

export const DeleteTaskFromSprintActionName: string = 'DeleteTaskFromSprintAction';
export function DeleteTaskFromSprintActionCreator(data: TaskIdWithSprintIdActionType): AppAction<TaskIdWithSprintIdActionType> {
    return { type: DeleteTaskFromSprintActionName, payload: data };
};

export const UpdateTaskSprintActionName: string = 'UpdateTaskSprintAction';
export class TaskIdWithSprintIdsActionType { taskId: number; sprintId: number[] };
export function UpdateTaskSprintActionCreator(data: TaskIdWithSprintIdsActionType): AppAction<TaskIdWithSprintIdsActionType> {
    return { type: UpdateTaskSprintActionName, payload: data };
};



