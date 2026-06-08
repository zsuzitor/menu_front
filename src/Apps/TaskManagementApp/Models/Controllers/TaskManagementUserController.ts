import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { DeleteProjectUserActionCreator, AddProjectUserActionCreator, ChangeProjectUserActionCreator } from "../Actions/UserActions";
import { IProjectUserDataBack } from "../BackModels/IProjectUserDataBack";
import { TaskManagementApiUserUrl, TaskManagementPreloader } from "../Consts";
import { ProjectUser } from "../Entity/State/ProjectUser";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type ChangeUser = (error: MainErrorObjectBack, data: BoolResultBackNew) => void;
export type DeleteUser = (error: MainErrorObjectBack, data: BoolResultBackNew) => void;


export interface ITaskManagementUserController {
    AddUserToProjectRedux: (mainAppUserEmail: string, projectId: number) => void;
    ChangeProjectUserRedux: (user: ProjectUser, projectId: number) => void;
    DeleteProjectUserRedux: (id: number, projectId: number) => void;
}


export class TaskManagementUserController implements ITaskManagementUserController {


    DeleteProjectUserRedux = (id: number, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteProjectUser(id, projectId, (error: MainErrorObjectBack, data: BoolResultBackNew) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Result) {
                    dispatch(DeleteProjectUserActionCreator(id));
                }
            });
        };
    }

    DeleteProjectUser = (id: number, projectId: number, onSuccess: DeleteUser) => {
        let data = {
            "userId": id,
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiUserUrl}/delete-user`

        });
    }


    AddUserToProjectRedux = (mainAppUserEmail: string, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.AddUserToProject(mainAppUserEmail, projectId
                , (error: MainErrorObjectBack, data: IProjectUserDataBack) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        let dt = new ProjectUser();
                        dt.FillByBackModel(data);
                        dispatch(AddProjectUserActionCreator(dt));
                    }
                });
        };
    }

    AddUserToProject = (mainAppUserEmail: string, projectId: number, onSuccess: AddNewUserToProject) => {
        let data = {
            "projectId": projectId,
            "mainAppUserEmail": mainAppUserEmail,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiUserUrl}/add-new-user`,
            ContentType: 'body'

        });
    };


    ChangeProjectUserRedux = (user: ProjectUser, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.ChangeProjectUser(user, projectId, (error: MainErrorObjectBack, data: BoolResultBackNew) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Result) {
                    dispatch(ChangeProjectUserActionCreator(user));
                }
            });
        };
    }

    ChangeProjectUser = (user: ProjectUser, projectId: number, onSuccess: ChangeUser) => {
        let data = {
            "userId": user.MainAppUserId,
            "isAdmin": user.IsAdmin,
            "deactivated": user.Deactivated,
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiUserUrl}/change-user`,
            ContentType: 'body'

        });
    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }
}

