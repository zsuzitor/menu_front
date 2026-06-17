import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { DeleteProjectUserActionCreator, AddProjectUserActionCreator, ChangeProjectUserActionCreator } from "../Actions/UserActions";
import { IProjectUserDataBack } from "../BackModels/IProjectUserDataBack";
import { TaskManagementApiUserUrl, TaskManagementPreloader } from "../Consts";
import { ProjectUser } from "../Entity/State/ProjectUser";



export interface ITaskManagementUserController {
    AddUserToProjectRedux: (mainAppUserEmail: string, projectId: number) => void;
    ChangeProjectUserRedux: (user: ProjectUser, projectId: number) => void;
    DeleteProjectUserRedux: (id: number, projectId: number) => void;
}


export class TaskManagementUserController implements ITaskManagementUserController {


    DeleteProjectUserRedux = (id: number, projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteProjectUserAsync(id, projectId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteProjectUserActionCreator(id));
            }
        };
    }

    DeleteProjectUserAsync = async (id: number, projectId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "userId": id,
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiUserUrl}/delete-user`

        });

        return backResult;
    }


    AddUserToProjectRedux = (mainAppUserEmail: string, projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.AddUserToProjectAsync(mainAppUserEmail, projectId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new ProjectUser();
                dt.FillByBackModel(backResult.Data);
                dispatch(AddProjectUserActionCreator(dt));
            }
        };
    }

    AddUserToProjectAsync = async (mainAppUserEmail: string, projectId: number): Promise<ServerResult<IProjectUserDataBack>> => {
        let data = {
            "projectId": projectId,
            "mainAppUserEmail": mainAppUserEmail,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectUserDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiUserUrl}/add-new-user`,
            ContentType: 'body'
        });

        return backResult;
    }


    ChangeProjectUserRedux = (user: ProjectUser, projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.ChangeProjectUserAsync(user, projectId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(ChangeProjectUserActionCreator(user));
            }
        };
    }

    ChangeProjectUserAsync = async (user: ProjectUser, projectId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "userId": user.MainAppUserId,
            "isAdmin": user.IsAdmin,
            "deactivated": user.Deactivated,
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiUserUrl}/change-user`,
            ContentType: 'body'
        });

        return backResult;
    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }
}

