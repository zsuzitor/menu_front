import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AddLabelToTaskActionCreator, CreateProjectLabelActionCreator, DeleteLabelFromTaskActionCreator, DeleteLabelFromTaskActionDataType, DeleteProjectLabelActionCreator, GetProjectLabelsActionCreator, UpdateProjectLabelActionCreator, UpdateTaskLabelActionDataType, UpdateTaskLabelsActionCreator, UpdateTaskLabelsActionDataType } from "../Actions/LabelActions";
import { ITaskLabelDataBack } from "../BackModels/ITaskLabelDataBack";
import { TaskManagementPreloader } from "../Consts";
import { TaskLabel } from "../Entity/State/TaskLabel";


export type GetLabels = (error: MainErrorObjectBack, data: ITaskLabelDataBack[]) => void;
export type CreateLabel = (error: MainErrorObjectBack, data: ITaskLabelDataBack) => void;
export type Boolres = (error: MainErrorObjectBack, data: BoolResultBack) => void;

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
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetForProject(projectId, (error: MainErrorObjectBack, data: ITaskLabelDataBack[]) => {
                this.preloader(false);
                if (data) {
                    // dt.projectId = projectId;
                    let dt = data.map(x => new TaskLabel().FillByIProjectLabelDataBack(x));
                    dispatch(GetProjectLabelsActionCreator(dt));

                }
            });
        };
    }

    GetForProject = (projectId: number, onSuccess: GetLabels) => {
        let data = {
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/get-all'

        });
    };


    CreateLabelRedux = (projectId: number, labelName: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateLabel(projectId, labelName, (error: MainErrorObjectBack, data: ITaskLabelDataBack) => {
                this.preloader(false);

                if (data?.Id) {
                    let dt = new TaskLabel().FillByIProjectLabelDataBack(data);
                    dispatch(CreateProjectLabelActionCreator(dt));
                }
            });
        };
    }

    CreateLabel = (projectId: number, labelName: string, onSuccess: CreateLabel) => {
        let data = {
            "ProjectId": projectId,
            "Name": labelName,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/create',
            ContentType: 'body'

        });
    };

    UpdateLabelRedux = (id: number, labelName: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateLabel(id, labelName, (error: MainErrorObjectBack, data: ITaskLabelDataBack) => {
                this.preloader(false);

                if (data?.Id) {
                    let dt = new TaskLabel().FillByIProjectLabelDataBack(data);
                    dispatch(UpdateProjectLabelActionCreator(dt));
                }
            });
        };
    }

    UpdateLabel = (id: number, labelName: string, onSuccess: CreateLabel) => {
        let data = {
            "Id": id,
            "Name": labelName,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/update',
            ContentType: 'body'

        });
    };

    DeleteLabelRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteLabel(id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data?.result) {
                    dispatch(DeleteProjectLabelActionCreator(id));
                }
            });
        };
    }

    DeleteLabel = (id: number, onSuccess: Boolres) => {
        let data = {
            "Id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/delete',
            ContentType: 'body'

        });
    };


    UpdateTaskLabelsRedux = (taskId: number, labelId: number[]) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskLabels(taskId, labelId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data?.result) {
                    let dt = new UpdateTaskLabelsActionDataType();
                    dt.LabelId = labelId;
                    dt.TaskId = taskId;
                    dispatch(UpdateTaskLabelsActionCreator(dt));
                }
            });
        };
    }

    UpdateTaskLabels = (taskId: number, labelId: number[], onSuccess: Boolres) => {
        let data = {
            "TaskId": taskId,
            "LabelId": labelId
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/update-task-labels',
            ContentType: 'body'

        });
    };



    AddLabelToTaskRedux = (taskId: number, labelId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.AddLabelToTask(taskId, labelId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data?.result) {
                    let dt = new UpdateTaskLabelActionDataType();
                    dt.LabelId = labelId;
                    dt.TaskId = taskId;
                    dispatch(AddLabelToTaskActionCreator(dt));
                }
            });
        };
    }

    AddLabelToTask = (taskId: number, labelId: number, onSuccess: Boolres) => {
        let data = {
            "LabelId": taskId,
            "TaskId": labelId
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/add-to-task',
            ContentType: 'body'

        });
    };


    DeleteLabelFromTaskRedux = (taskId: number, labelId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteLabelFromTask(taskId, labelId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data?.result) {
                    let dt = new DeleteLabelFromTaskActionDataType();
                    dt.LabelId = labelId;
                    dt.TaskId = taskId;
                    dispatch(DeleteLabelFromTaskActionCreator(dt));
                }
            });
        };
    }

    DeleteLabelFromTask = (taskId: number, labelId: number, onSuccess: Boolres) => {
        let data = {
            "LabelId": taskId,
            "TaskId": labelId
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/label/delete-from-task',
            ContentType: 'body'

        });
    };



    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);
    }

}
