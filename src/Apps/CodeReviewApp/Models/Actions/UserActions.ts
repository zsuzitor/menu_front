import { AppAction } from "../../../../Models/Actions/Actions";
import { ProjectUser } from "../Entity/State/ProjectUser";


export const SetCurrentProjectUsersActionName: string = 'SetCurrentProjectUsersAction';
export function SetCurrentProjectUsersActionCreator(users: ProjectUser[]): AppAction<ProjectUser[]> {
    return { type: SetCurrentProjectUsersActionName, payload: users };
};




export const DeleteProjectUserActionName: string = 'DeleteProjectUserAction';
export function DeleteProjectUserActionCreator(id: number): AppAction<number> {
    return { type: DeleteProjectUserActionName, payload: id };
};



export const AddProjectUserActionName: string = 'AddProjectUserAction';
export function AddProjectUserActionCreator(user: ProjectUser): AppAction<ProjectUser> {
    return { type: AddProjectUserActionName, payload: user };
};

export const ChangeProjectUserActionName: string = 'ChangeProjectUserAction';
export function ChangeProjectUserActionCreator(user: ProjectUser): AppAction<ProjectUser> {
    return { type: ChangeProjectUserActionName, payload: user };
};