import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { DeleteProjectUserActionCreator, AddProjectUserActionCreator, ChangeProjectUserActionCreator } from "../Actions/UserActions";
import { IProjectUserDataBack } from "../BackModels/IProjectUserDataBack";
import { TaskManagementPreloader } from "../Consts";
import { ProjectUser } from "../Entity/State/ProjectUser";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type ChangeUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type DeleteUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ITaskManagementUserController {
    AddUserToProjectRedux: (newUserName: string, mainAppUserEmail: string, projectId: number) => void;
    ChangeProjectUserRedux: (user: ProjectUser) => void;
    DeleteProjectUserRedux: (id: number) => void;
}


export class TaskManagementUserController implements ITaskManagementUserController {


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
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/user/delete-user'

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
                        let dt = new ProjectUser();
                        dt.FillByBackModel(data);
                        dispatch(AddProjectUserActionCreator(dt));
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
            Url: G_PathToServer + 'api/taskmanagement/user/add-new-user'

        });
    };


    ChangeProjectUserRedux = (user: ProjectUser) => {
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

    ChangeProjectUser = (user: ProjectUser, onSuccess: ChangeUser) => {
        let data = {
            "userId": user.Id,
            "name": user.Name,
            "email": user.Email,
            "isAdmin": user.IsAdmin,
            "deactivated": user.Deactivated,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/user/change-user'

        });
    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        new ControllerHelper().Preloader(show, TaskManagementPreloader);
        
    }
}

