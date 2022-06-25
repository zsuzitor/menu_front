import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { AppAction } from "../Actions";

export const DeleteProjectUserActionName: string = 'DeleteProjectUserAction';
export function DeleteProjectUserActionCreator(id: number): AppAction<number> {
    return { type: DeleteProjectUserActionName, payload: id };
};



export const AddProjectUserActionName: string = 'AddProjectUserAction';
export function AddProjectUserActionCreator(user: IProjectUserDataBack): AppAction<IProjectUserDataBack> {
    return { type: AddProjectUserActionName, payload: user };
};

export const ChangeProjectUserActionName: string = 'ChangeProjectUserAction';
export function ChangeProjectUserActionCreator(user: IProjectUserDataBack): AppAction<IProjectUserDataBack> {
    return { type: ChangeProjectUserActionName, payload: user };
};