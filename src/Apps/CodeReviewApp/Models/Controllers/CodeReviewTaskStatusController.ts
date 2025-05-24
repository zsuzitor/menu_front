import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { CreateCurrentProjectTaskStatusActionCreator, DeleteCurrentProjectTaskStatusActionCreator } from "../Actions/TaskStatusActions";
import { ITaskReviewStatusDataBack } from "../BackModels/ITaskReviewStatusDataBack";
import { TaskReviewStatus } from "../Entity/State/TaskReviewStatus";



export type DeleteStatus = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type CreateStatus = (error: MainErrorObjectBack, data: ITaskReviewStatusDataBack) => void;


export interface ICodeReviewTaskStatusController {
    DeleteStatusRedux: (statusId: number) => void;
    CreateStatusRedux: (name: string, projectId: number) => void;
}


export class CodeReviewTaskStatusController implements ICodeReviewTaskStatusController {
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
            Url: G_PathToServer + 'api/codereview/status/delete-status'

        });
    }



    CreateStatusRedux = (name: string, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateStatus(name, projectId, (error: MainErrorObjectBack, data: ITaskReviewStatusDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let forAdd = new TaskReviewStatus();
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
            Url: G_PathToServer + 'api/codereview/status/create-status'

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