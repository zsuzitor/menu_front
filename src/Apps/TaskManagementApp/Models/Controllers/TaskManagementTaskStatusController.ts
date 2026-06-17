import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { CreateCurrentProjectTaskStatusActionCreator, DeleteCurrentProjectTaskStatusActionCreator, UpdateCurrentProjectTaskStatusActionCreator } from "../Actions/TaskStatusActions";
import { IWorkTaskStatusDataBack } from "../BackModels/IWorkTaskStatusDataBack";
import { TaskManagementApiStatusUrl, TaskManagementPreloader } from "../Consts";
import { WorkTaskStatus } from "../Entity/State/WorkTaskStatus";




export interface ITaskManagementTaskStatusController {
    DeleteStatusRedux: (statusId: number) => void;
    CreateStatusRedux: (name: string, projectId: number) => void;
    UpdateStatusRedux: (statusId: number, status: string) => void;
}


export class TaskManagementTaskStatusController implements ITaskManagementTaskStatusController {


    DeleteStatusRedux = (statusId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteStatusAsync(statusId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteCurrentProjectTaskStatusActionCreator(statusId));
            }
        };
    }

    DeleteStatusAsync = async (statusId: number) : Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "statusId": statusId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiStatusUrl}/delete-status`
        });

        return backResult;
    }



    CreateStatusRedux = (name: string, projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateStatusAsync(name, projectId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let forAdd = new WorkTaskStatus();
                forAdd.FillByBackModel(backResult.Data);
                dispatch(CreateCurrentProjectTaskStatusActionCreator(forAdd));
            }
        };
    }

    CreateStatusAsync = async (name: string, projectId: number): Promise<ServerResult<IWorkTaskStatusDataBack>> => {
        let data = {
            "status": name,
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTaskStatusDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiStatusUrl}/create-status`
        });

        return backResult;
    }


    UpdateStatusRedux = (statusId: number, status: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateStatusAsync(statusId, status);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let st = new WorkTaskStatus();
                st.FillByBackModel(backResult.Data);
                dispatch(UpdateCurrentProjectTaskStatusActionCreator(st));
            }
        };
    }

    UpdateStatusAsync = async (statusId: number, status: string): Promise<ServerResult<IWorkTaskStatusDataBack>> => {
        let data = {
            "status": status,
            "statusId": statusId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTaskStatusDataBack>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiStatusUrl}/update-status`
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