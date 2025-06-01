import { AppAction } from "../../../../Models/Actions/Actions";
import { OneProjectInList } from "../Entity/State/OneProjectInList";
import { WorkTaskStatus } from "../Entity/State/WorkTaskStatus";

export const DeleteProjectActionName: string = 'DeleteProjectAction';
export function DeleteProjectActionCreator(projectId: number): AppAction<number> {
    return { type: DeleteProjectActionName, payload: projectId };
};





export const AddNewProjectActionName: string = 'AddNewProjectAction';
export function AddNewProjectActionCreator(data: OneProjectInList): AppAction<OneProjectInList> {
    return { type: AddNewProjectActionName, payload: data };
};

export const SetCurrentProjectIdActionName: string = 'SetCurrentProjectIdAction';
export function SetCurrentProjectIdActionCreator(projectId: number): AppAction<number> {
    return { type: SetCurrentProjectIdActionName, payload: projectId };
};

export const SetProjectsActionName: string = 'SetProjectsAction';
export function SetProjectsActionCreator(projects: OneProjectInList[]): AppAction<OneProjectInList[]> {
    return { type: SetProjectsActionName, payload: projects };
};

export const ClearProjectStateActionName: string = 'ClearProjectStateAction';
export function ClearProjectStateActionCreator(): AppAction<void> {
    return { type: ClearProjectStateActionName, payload: null };
};
