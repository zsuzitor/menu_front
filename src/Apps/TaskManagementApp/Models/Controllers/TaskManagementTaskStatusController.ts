import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { CreateCurrentProjectTaskStatusActionCreator, DeleteCurrentProjectTaskStatusActionCreator, UpdateCurrentProjectTaskStatusActionCreator } from "../Actions/TaskStatusActions";
import { IWorkTaskStatusDataBack } from "../BackModels/IWorkTaskStatusDataBack";
import { TaskManagementPreloader } from "../Consts";
import { WorkTaskStatus } from "../Entity/State/WorkTaskStatus";



export type DeleteStatus = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type CreateStatus = (error: MainErrorObjectBack, data: IWorkTaskStatusDataBack) => void;


export interface ITaskManagementTaskStatusController {
    DeleteStatusRedux: (statusId: number) => void;
    CreateStatusRedux: (name: string, projectId: number) => void;
    UpdateStatusRedux: (statusId: number, status: string) => void;
}


export class TaskManagementTaskStatusController implements ITaskManagementTaskStatusController {
    DeleteStatusRedux = (statusId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteStatus(statusId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DeleteCurrentProjectTaskStatusActionCreator(statusId));
                }
            });
        };

    }

    DeleteStatus = (statusId: number, onSuccess: DeleteStatus) => {
        let data = {
            "statusId": statusId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/status/delete-status'

        });
    }



    CreateStatusRedux = (name: string, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateStatus(name, projectId, (error: MainErrorObjectBack, data: IWorkTaskStatusDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let forAdd = new WorkTaskStatus();
                    forAdd.FillByBackModel(data);
                    dispatch(CreateCurrentProjectTaskStatusActionCreator(forAdd));
                }
            });
        };


    };


    CreateStatus = (name: string, projectId: number, onSuccess: CreateStatus) => {
        let data = {
            "status": name,
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/status/create-status'

        });
    }


    UpdateStatusRedux = (statusId: number, status: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateStatus(statusId, status, (error: MainErrorObjectBack, data: IWorkTaskStatusDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let st = new WorkTaskStatus();
                    st.FillByBackModel(data);
                    dispatch(UpdateCurrentProjectTaskStatusActionCreator(st));
                }
            });
        };

    };

    UpdateStatus = (statusId: number, status: string, onSuccess: CreateStatus) => {
        let data = {
            "status": status,
            "statusId": statusId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/status/update-status'

        });
    }


    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        new ControllerHelper().Preloader(show, TaskManagementPreloader);
        
    }

}