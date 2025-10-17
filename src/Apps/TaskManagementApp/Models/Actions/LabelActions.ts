import { AppAction } from "../../../../Models/Actions/Actions";
import { TaskLabel } from "../Entity/State/TaskLabel";

export const GetTaskLabelsActionName: string = 'GetTaskLabelsAction';
export function GetTaskLabelsActionCreator(data: TaskLabel[]): AppAction<TaskLabel[]> {
    return { type: GetTaskLabelsActionName, payload: data };
};


export const GetProjectLabelsActionName: string = 'GetProjectLabelsAction';
export function GetProjectLabelsActionCreator(data: TaskLabel[]): AppAction<TaskLabel[]> {
    return { type: GetProjectLabelsActionName, payload: data };
};

export const CreateProjectLabelActionName: string = 'CreateProjectLabelAction';
export function CreateProjectLabelActionCreator(data: TaskLabel): AppAction<TaskLabel> {
    return { type: CreateProjectLabelActionName, payload: data };
};

export const UpdateProjectLabelActionName: string = 'UpdateProjectLabelAction';
export function UpdateProjectLabelActionCreator(data: TaskLabel): AppAction<TaskLabel> {
    return { type: UpdateProjectLabelActionName, payload: data };
};

export const DeleteProjectLabelActionName: string = 'DeleteProjectLabelAction';
export function DeleteProjectLabelActionCreator(data: number): AppAction<number> {
    return { type: DeleteProjectLabelActionName, payload: data };
};

export const UpdateTaskLabelsActionName: string = 'UpdateTaskLabelsAction';
export class UpdateTaskLabelsActionDataType {
    TaskId: number;
    LabelId: number[];
}
export function UpdateTaskLabelsActionCreator(data: UpdateTaskLabelsActionDataType): AppAction<UpdateTaskLabelsActionDataType> {
    return { type: UpdateTaskLabelsActionName, payload: data };
};

export const AddLabelToTaskActionName: string = 'AddLabelToTaskAction';
export class UpdateTaskLabelActionDataType {
    TaskId: number;
    LabelId: number;
}
export function AddLabelToTaskActionCreator(data: UpdateTaskLabelActionDataType): AppAction<UpdateTaskLabelActionDataType> {
    return { type: AddLabelToTaskActionName, payload: data };
};

export const DeleteLabelFromTaskActionName: string = 'DeleteLabelFromTaskAction';
export class DeleteLabelFromTaskActionDataType {
    TaskId: number;
    LabelId: number;
}
export function DeleteLabelFromTaskActionCreator(data: DeleteLabelFromTaskActionDataType): AppAction<DeleteLabelFromTaskActionDataType> {
    return { type: DeleteLabelFromTaskActionName, payload: data };
};