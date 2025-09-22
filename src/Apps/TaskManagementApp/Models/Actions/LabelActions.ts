import { AppAction } from "../../../../Models/Actions/Actions";
import { TaskLabel } from "../Entity/State/TaskLabel";

export const GetTaskLabelsActionName: string = 'GetTaskLabelsAction';
export function GetTaskLabelsActionCreator(data: TaskLabel[]): AppAction<TaskLabel[]> {
    return { type: GetTaskLabelsActionName, payload: data };
};