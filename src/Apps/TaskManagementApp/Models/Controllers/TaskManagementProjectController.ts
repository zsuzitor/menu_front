import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { GetTaskLabelsActionCreator } from "../Actions/LabelActions";
import { LoadPresetsActionCreator } from "../Actions/PresetActions";
import { DeleteProjectActionCreator, AddNewProjectActionCreator, SetCurrentProjectIdActionCreator, SetProjectsActionCreator } from "../Actions/ProjectActions";
import { GetProjectSprintsActionCreator, GetProjectSprintsActionType } from "../Actions/SprintActions";
import { SetCurrentProjectStatusesActionCreator } from "../Actions/TaskStatusActions";
import { SetCurrentProjectUsersActionCreator } from "../Actions/UserActions";
import { IOneProjectInListDataBack } from "../BackModels/IOneProjectInListDataBack";
import { IOneProjectInfoDataBack } from "../BackModels/IOneProjectInfoDataBack";
import { TaskManagementApiProjectUrl, TaskManagementPreloader } from "../Consts";
import { OneProjectInList } from "../Entity/State/OneProjectInList";
import { Preset } from "../Entity/State/Preset";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { ProjectUser } from "../Entity/State/ProjectUser";
import { TaskLabel } from "../Entity/State/TaskLabel";
import { WorkTaskStatus } from "../Entity/State/WorkTaskStatus";


export interface ITaskManagementProjectController {
    GetUserProjectsRedux: () => void;
    CreateNewProjectRedux: (newProjectName: string,) => void;
    GetProjectInfoRedux: (projectId: number) => void;
    DeleteProjectRedux: (projectId: number) => void;
}



export class TaskManagementProjectController implements ITaskManagementProjectController {


    DeleteProjectRedux = (projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteProjectAsync(projectId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteProjectActionCreator(projectId));
            }
        };
    }

    DeleteProjectAsync = async (projectId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiProjectUrl}/delete-project`
        });

        return backResult;
    }


    GetProjectInfoRedux = (projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetProjectInfoAsync(projectId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dtUsers = backResult.Data.Users.map(x => {
                    let u = new ProjectUser();
                    u.FillByBackModel(x);
                    return u;
                });

                let dtStatuses = backResult.Data.Statuses.map(x => {
                    let u = new WorkTaskStatus();
                    u.FillByBackModel(x);
                    return u;
                });

                let dtSprints = backResult.Data.Sprints.map(x => {
                    let u = new ProjectSprint();
                    u.FillByIProjectSprintDataBack(x);
                    return u;
                });

                let dtLabels = backResult.Data.Labels.map(x => {
                    let u = new TaskLabel();
                    u.FillByIProjectLabelDataBack(x);
                    return u;
                });

                let dtPreset = backResult.Data.Presets.map(x => {
                    let u = new Preset();
                    u.FillByIProjectTaskDataBack(x);
                    return u;
                });

                dispatch(SetCurrentProjectUsersActionCreator(dtUsers));
                dispatch(SetCurrentProjectStatusesActionCreator(dtStatuses));

                let spr = new GetProjectSprintsActionType();
                spr.data = dtSprints;
                dispatch(GetProjectSprintsActionCreator(spr));
                dispatch(GetTaskLabelsActionCreator(dtLabels));
                dispatch(LoadPresetsActionCreator(dtPreset));
            }
        };
    }

    GetProjectInfoAsync = async (projectId: number): Promise<ServerResult<IOneProjectInfoDataBack>> => {
        let data = {
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IOneProjectInfoDataBack>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiProjectUrl}/get-project-info`
        });

        return backResult;
    }



    CreateNewProjectRedux = (newProjectName: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateNewProjectAsync(newProjectName);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new OneProjectInList();
                dt.FillByBackModel(backResult.Data);
                dispatch(AddNewProjectActionCreator(dt));
            }
        };
    }

    CreateNewProjectAsync = async (newProjectName: string): Promise<ServerResult<IOneProjectInListDataBack>> => {
        let data = {
            "projectName": newProjectName,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IOneProjectInListDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiProjectUrl}/add-new-project`
        });

        return backResult;
    }


    GetUserProjectsRedux = () => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetUserProjectsAsync();
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => {
                    let pr = new OneProjectInList();
                    pr.FillByBackModel(x);
                    return pr;
                });

                dispatch(SetProjectsActionCreator(dt));
            }
        };
    }

    GetUserProjectsAsync = async (): Promise<ServerResult<IOneProjectInListDataBack[]>> => {
        const backResult = await G_AjaxHelper.GoAjaxRequest<IOneProjectInListDataBack[]>({
            Data: {},
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiProjectUrl}/get-projects`,
        });

        return backResult;
    }


    //todo вынести в какой то общий кусок
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);
    }
}
