import { IOneProjectInListDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { AppAction } from "../Actions";

export const DeleteProjectActionName: string = 'DeleteProjectAction';
export function DeleteProjectActionCreator(projectId: number): AppAction<number> {
    return { type: DeleteProjectActionName, payload: projectId };
};


export const SetCurrentProjectUsersActionName: string = 'SetCurrentProjectUsersAction';
export function SetCurrentProjectUsersActionCreator(users: IProjectUserDataBack[]): AppAction<IProjectUserDataBack[]> {
    return { type: SetCurrentProjectUsersActionName, payload: users };
};


export const AddNewProjectActionName: string = 'AddNewProjectAction';
export function AddNewProjectActionCreator(data: IOneProjectInListDataBack): AppAction<IOneProjectInListDataBack> {
    return { type: AddNewProjectActionName, payload: data };
};

export const SetCurrentProjectIdActionName: string = 'SetCurrentProjectIdAction';
export function SetCurrentProjectIdActionCreator(projectId: number): AppAction<number> {
    return { type: SetCurrentProjectIdActionName, payload: projectId };
};

export const SetProjectsActionName: string = 'SetProjectsAction';
export function SetProjectsActionCreator(projects: IOneProjectInListDataBack[]): AppAction<IOneProjectInListDataBack[]> {
    return { type: SetProjectsActionName, payload: projects };
};