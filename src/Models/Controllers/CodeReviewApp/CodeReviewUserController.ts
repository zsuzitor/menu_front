import { AddProjectUserActionCreator, ChangeProjectUserActionCreator, DeleteProjectUserActionCreator } from "../../Actions/CodeReviewApp/UserActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { ControllerHelper } from "../ControllerHelper";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type ChangeUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type DeleteUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewUserController {
    AddUserToProjectRedux: (newUserName: string, mainAppUserEmail: string, projectId: number) => void;
    ChangeProjectUserRedux: (user: IProjectUserDataBack) => void;
    DeleteProjectUserRedux: (id: number) => void;
}


export class CodeReviewUserController implements ICodeReviewUserController {


    DeleteProjectUserRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteProjectUser(id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
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
            this.preloader(true);
            this.AddUserToProject(newUserName, mainAppUserEmail, projectId
                , (error: MainErrorObjectBack, data: IProjectUserDataBack) => {
                    this.preloader(false);
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
            this.preloader(true);
            this.ChangeProjectUser(user, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
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
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        if (!window.CodeReviewCounter) {
            window.CodeReviewCounter = 0;
        }

        var preloader = document.getElementById('code_review_preloader');
        if (!preloader) {
            return;
        }

        if (show) {
            window.CodeReviewCounter++;
            preloader.style.display = 'block';
        }
        else {
            window.CodeReviewCounter--;
            if (!window.CodeReviewCounter) {
                preloader.style.display = 'none';
            }
        }
    }
}

