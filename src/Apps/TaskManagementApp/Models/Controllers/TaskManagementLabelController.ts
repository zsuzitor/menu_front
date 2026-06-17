import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AddLabelToTaskActionCreator, CreateProjectLabelActionCreator, DeleteLabelFromTaskActionCreator, DeleteLabelFromTaskActionDataType, DeleteProjectLabelActionCreator, GetTaskLabelsActionCreator, UpdateProjectLabelActionCreator, UpdateTaskLabelActionDataType, UpdateTaskLabelsActionCreator, UpdateTaskLabelsActionDataType } from "../Actions/LabelActions";
import { ITaskLabelDataBack } from "../BackModels/ITaskLabelDataBack";
import { TaskManagementApiLabelUrl, TaskManagementPreloader } from "../Consts";
import { TaskLabel } from "../Entity/State/TaskLabel";



export interface ITaskManagementLabelController {
    GetForProjectRedux: (projectId: number) => void;
    CreateLabelRedux: (projectId: number, labelName: string) => void;
    UpdateLabelRedux: (Id: number, labelName: string) => void;
    DeleteLabelRedux: (Id: number) => void;
    UpdateTaskLabelsRedux: (taskId: number, labelId: number[]) => void;
    AddLabelToTaskRedux: (taskId: number, labelId: number) => void;
    DeleteLabelFromTaskRedux: (taskId: number, labelId: number) => void;
}

export class TaskManagementLabelController implements ITaskManagementLabelController {

    GetForProjectRedux = (projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetForProjectAsync(projectId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new TaskLabel().FillByIProjectLabelDataBack(x));
                dispatch(GetTaskLabelsActionCreator(dt));
            }
        };
    }

    GetForProjectAsync = async (projectId: number): Promise<ServerResult<ITaskLabelDataBack[]>> => {
        let data = {
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<ITaskLabelDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/get-all`
        });

        return backResult;
    }


    CreateLabelRedux = (projectId: number, labelName: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateLabelAsync(projectId, labelName);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let dt = new TaskLabel().FillByIProjectLabelDataBack(backResult.Data);
                dispatch(CreateProjectLabelActionCreator(dt));
            }
        };
    }

    CreateLabelAsync = async (projectId: number, labelName: string): Promise<ServerResult<ITaskLabelDataBack>> => {
        let data = {
            "ProjectId": projectId,
            "Name": labelName,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<ITaskLabelDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/create`,
            ContentType: 'body'
        });

        return backResult;
    }

    UpdateLabelRedux = (id: number, labelName: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateLabelAsync(id, labelName);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let dt = new TaskLabel().FillByIProjectLabelDataBack(backResult.Data);
                dispatch(UpdateProjectLabelActionCreator(dt));
            }
        };
    }

    UpdateLabelAsync = async (id: number, labelName: string): Promise<ServerResult<ITaskLabelDataBack>> => {
        let data = {
            "Id": id,
            "Name": labelName,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<ITaskLabelDataBack>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/update`,
            ContentType: 'body'
        });

        return backResult;
    }

    DeleteLabelRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteLabelAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteProjectLabelActionCreator(id));
            }
        };
    }

    DeleteLabelAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "Id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/delete`,
            ContentType: 'body'
        });

        return backResult;
    }


    UpdateTaskLabelsRedux = (taskId: number, labelId: number[]) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskLabelsAsync(taskId, labelId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let dt = new UpdateTaskLabelsActionDataType();
                dt.LabelId = labelId;
                dt.TaskId = taskId;
                dispatch(UpdateTaskLabelsActionCreator(dt));
            }
        };
    }

    UpdateTaskLabelsAsync = async (taskId: number, labelId: number[]): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "TaskId": taskId,
            "LabelId": labelId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/update-task-labels`,
            ContentType: 'body'
        });

        return backResult;
    }



    AddLabelToTaskRedux = (taskId: number, labelId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.AddLabelToTaskAsync(taskId, labelId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let dt = new UpdateTaskLabelActionDataType();
                dt.LabelId = labelId;
                dt.TaskId = taskId;
                dispatch(AddLabelToTaskActionCreator(dt));
            }
        };
    }

    AddLabelToTaskAsync = async (taskId: number, labelId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "LabelId": taskId,
            "TaskId": labelId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/add-to-task`,
            ContentType: 'body'
        });

        return backResult;
    }


    DeleteLabelFromTaskRedux = (taskId: number, labelId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteLabelFromTaskAsync(taskId, labelId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let dt = new DeleteLabelFromTaskActionDataType();
                dt.LabelId = labelId;
                dt.TaskId = taskId;
                dispatch(DeleteLabelFromTaskActionCreator(dt));
            }
        };
    }

    DeleteLabelFromTaskAsync = async (taskId: number, labelId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "LabelId": taskId,
            "TaskId": labelId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiLabelUrl}/delete-from-task`,
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
