import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { TaskManagementApiSprintUrl, TaskManagementPreloader } from "../Consts";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { IProjectSprintDataBack } from "../BackModels/IProjectSprintDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { AddTaskToSprintActionCreator, CreateSprintActionCreator, DeleteSprintActionCreator, DeleteTaskFromSprintActionCreator, GetProjectSprintsActionCreator, GetProjectSprintsActionType, GetSprintsTasksActionCreator, TaskIdWithSprintIdActionType, TaskIdWithSprintIdsActionType, UpdateSprintActionCreator, UpdateTaskSprintActionCreator } from "../Actions/SprintActions";
import { OneTask } from "../Entity/State/OneTask";
import { SprintCreate } from "../Entity/SprintCreate";
import { SprintUpdate } from "../Entity/SprintUpdate";
import { ServerResult } from "../../../../Models/AjaxLogic";





export interface ITaskManagementSprintController {
    // GetForProjectRedux: (projectId: number) => void;
    GetForProjectRedux: (projectId: number, dispatch: any) => Promise<any>;


    GetTasksRedux: (sprintId: number) => void;
    CreateSprintRedux: (req: SprintCreate) => void;
    UpdateSprintRedux: (req: SprintUpdate) => void;
    DeleteSprintRedux: (sprintId: number) => void;
    AddTaskToSprintRedux: (sprintId: number, taskId: number) => void;
    DeleteTaskFromSprintRedux: (taskId: number, sprintId: number) => void;
    UpdateTaskFromSprintRedux: (taskId: number, sprintId: number[]) => void;



}



export class TaskManagementSprintController implements ITaskManagementSprintController {

    GetForProjectRedux = async (projectId: number, dispatch: any): Promise<IProjectSprintDataBack[]> => {
        this.preloader(true);
        const backResult = await this.GetForProjectAsync(projectId);
        this.preloader(false);

        if (backResult.Error) {
            return null!;
        }

        if (backResult.Data) {
            let dt = new GetProjectSprintsActionType();
            dt.data = backResult.Data.map(x => new ProjectSprint().FillByIProjectSprintDataBack(x));
            dispatch(GetProjectSprintsActionCreator(dt));
            return backResult.Data;
        }
        return null!;
    }

    GetForProjectAsync = async (projectId: number): Promise<ServerResult<IProjectSprintDataBack[]>> => {
        let data = {
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectSprintDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/get-for-project`
        });

        return backResult;
    }


    GetTasksRedux = (sprintId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetTasksAsync(sprintId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new OneTask().FillByIProjectTaskDataBack(x));
                dispatch(GetSprintsTasksActionCreator(dt));
            }
        };
    }

    GetTasksAsync = async (sprintId: number): Promise<ServerResult<IProjectTaskDataBack[]>> => {
        let data = {
            "sprintId": sprintId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/get-tasks`
        });

        return backResult;
    }


    CreateSprintRedux = (req: SprintCreate) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateSprintAsync(req);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let dt = new ProjectSprint();
                dt.FillByIProjectSprintDataBack(backResult.Data);
                dispatch(CreateSprintActionCreator(dt));
            }
        };
    }

    CreateSprintAsync = async (req: SprintCreate): Promise<ServerResult<IProjectSprintDataBack>> => {
        let data = {
            "ProjectId": req.ProjectId,
            "Name": req.Name,
            "StartDate": new ControllerHelper().ToZeroDate(req.StartDate).toISOString(),
            "EndDate": new ControllerHelper().ToZeroDate(req.EndDate).toISOString()
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectSprintDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/create`,
            ContentType: 'body'
        });

        return backResult;
    }

    UpdateSprintRedux = (req: SprintUpdate) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateSprintAsync(req);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let dt = new ProjectSprint();
                dt.FillByIProjectSprintDataBack(backResult.Data);
                dispatch(UpdateSprintActionCreator(dt));
            }
        };
    }

    UpdateSprintAsync = async (req: SprintUpdate): Promise<ServerResult<IProjectSprintDataBack>> => {
        let data = {
            "Id": req.Id,
            "Name": req.Name,
            "StartDate": new ControllerHelper().ToZeroDate(req.StartDate).toISOString(),
            "EndDate": new ControllerHelper().ToZeroDate(req.EndDate).toISOString()
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectSprintDataBack>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/update`,
            ContentType: 'body'
        });

        return backResult;
    }



    DeleteSprintRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteSprintAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteSprintActionCreator(id));
            }
        };
    }

    DeleteSprintAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/delete`
        });

        return backResult;
    }


    AddTaskToSprintRedux = (sprintId: number, taskId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.AddTaskToSprintAsync(sprintId, taskId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let dt = new TaskIdWithSprintIdActionType();
                dt.sprintId = sprintId;
                dt.taskId = taskId;
                dispatch(AddTaskToSprintActionCreator(dt));
            }
        };
    }

    AddTaskToSprintAsync = async (sprintId: number, taskId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "sprintId": sprintId,
            "taskId": taskId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/add-task-to-sprint`
        });

        return backResult;
    }

    DeleteTaskFromSprintRedux = (taskId: number, sprintId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteTaskFromSprintAsync(taskId, sprintId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let dt = new TaskIdWithSprintIdActionType();
                dt.sprintId = null;
                dt.taskId = taskId;
                dispatch(DeleteTaskFromSprintActionCreator(dt));
            }
        };
    }

    DeleteTaskFromSprintAsync = async (taskId: number, sprintId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "taskId": taskId,
            "sprintId": sprintId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/delete-task-from-sprint`
        });

        return backResult;
    }

    UpdateTaskFromSprintRedux = (taskId: number, sprintId: number[]) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskFromSprintAsync(taskId, sprintId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let dt = new TaskIdWithSprintIdsActionType();
                dt.sprintId = sprintId;
                dt.taskId = taskId;
                dispatch(UpdateTaskSprintActionCreator(dt));
            }
        };
    }

    UpdateTaskFromSprintAsync = async (taskId: number, sprintId: number[]): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "taskId": taskId,
            "sprintId": sprintId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/update-task-sprints`,
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