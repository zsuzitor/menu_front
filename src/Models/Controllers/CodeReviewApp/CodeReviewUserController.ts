import { AddProjectUserActionCreator, ChangeProjectUserActionCreator, DeleteProjectUserActionCreator } from "../../Actions/CodeReviewApp/UserActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type ChangeUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type DeleteUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewUserController {
    // AddUserToProject: (newUserName: string, mainAppUserEmail: string, projectId: number, onSuccess: AddNewUserToProject) => void;
    // ChangeProjectUser: (user: IProjectUserDataBack, onSuccess: ChangeUser) => void;
    // DeleteProjectUser: (id: number, onSuccess: DeleteUser) => void;
    AddUserToProjectRedux: (newUserName: string, mainAppUserEmail: string, projectId: number) => void;
    ChangeProjectUserRedux: (user: IProjectUserDataBack) => void;
    DeleteProjectUserRedux: (id: number) => void;
}


export class CodeReviewUserController implements ICodeReviewUserController {


    DeleteProjectUserRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.DeleteProjectUser(id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DeleteProjectUserActionCreator(id));
                }
            });
        };
    }

    DeleteProjectUser = (id: number, onSuccess: DeleteUser) => {
        let data = {
            "userId": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "DELETE",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/user/delete-user'

        });
    }


    AddUserToProjectRedux = (newUserName: string, mainAppUserEmail: string, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.AddUserToProject(newUserName, mainAppUserEmail, projectId
                , (error: MainErrorObjectBack, data: IProjectUserDataBack) => {
                    if (error) {
                        return;
                    }

                    if (data) {
                        dispatch(AddProjectUserActionCreator(data));
                    }
                });
        };
    }

    AddUserToProject = (newUserName: string, mainAppUserEmail: string, projectId: number, onSuccess: AddNewUserToProject) => {
        let data = {
            "userName": newUserName,
            "projectId": projectId,
            "mainAppUserEmail": mainAppUserEmail,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/user/add-new-user'

        });
    };


    ChangeProjectUserRedux = (user: IProjectUserDataBack) => {
        return (dispatch: any, getState: any) => {
            this.ChangeProjectUser(user, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(ChangeProjectUserActionCreator(user));
                }
            });
        };
    }

    ChangeProjectUser = (user: IProjectUserDataBack, onSuccess: ChangeUser) => {
        let data = {
            "userId": user.Id,
            "name": user.Name,
            "email": user.Email,
            "isAdmin": user.IsAdmin,
            "deactivated": user.Deactivated,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/user/change-user'

        });
    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (xhr: any, status: any, jqXHR: any) => {
            let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
            if (resp.errors) {
                //TODO ошибка
                onSuccess(resp, null);
            }
            else {
                let dataBack = xhr as T;
                onSuccess(null, dataBack);

            }
        }
    }

}

