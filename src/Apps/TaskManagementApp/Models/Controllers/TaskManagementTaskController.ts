import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AddLoadTriggerActionCreator, UpdateTaskActionCreator, LoadTasksActionCreator, DeleteTaskActionCreator, LoadTaskActionCreator, UpdateTaskNameActionCreator, UpdateTaskDescriptionActionCreator, UpdateTaskStatusActionCreator, UpdateTaskExecutorActionCreator, AddTaskRelationStateActionCreator, DeleteTaskRelationStateActionCreator, LoadTaskRelationStateActionCreator } from "../Actions/TaskActions";
import { ILoadWorkTasksResultDataBack } from "../BackModels/ILoadWorkTasksResultDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { IProjectTaskNameDataBack } from "../BackModels/IProjectTaskNameDataBack";
import { IProjectTaskRelationDataBack } from "../BackModels/IProjectTaskRelationDataBack";
import { TaskManagementAddTaskRelationUrl, TaskManagementApiTaskUrl, TaskManagementDeleteTaskRelationUrl, TaskManagementGetTaskRelationUrl, TaskManagementPreloader, TaskManagementTaskAddNewUrl, TaskManagementTaskCopyUrl, TaskManagementTaskDeleteUrl, TaskManagementTaskGetUrl, TaskManagementTaskNameUrl, TaskManagementTasksGetUrl, TaskManagementTaskUpdateDescriptionUrl, TaskManagementTaskUpdateExecutorUrl, TaskManagementTaskUpdateNameUrl, TaskManagementTaskUpdateStatusUrl, TaskManagementTaskUpdateUrl } from "../Consts";
import { ITaskFilter } from "../Entity/ITaskFilter";
import { LoadWorkTasksResult } from "../Entity/LoadWorkTasksResult";
import { OneTask } from "../Entity/State/OneTask";
import { OneTaskInList } from "../Entity/State/OneTaskInList";
import { TaskRelation } from "../Entity/State/TaskRelation";




export interface ITaskManagementTaskController {
    AddTaskToProjectRedux: (task: OneTask, projectId: number) => void;
    UpdateTaskRedux: (task: OneTaskInList) => void;
    LoadTasksRedux: (taskFilter: ITaskFilter) => void;
    LoadTaskRedux: (taskId: number) => void;
    DeleteTaskRedux: (id: number) => void;
    CopyTaskUI: (id: number) => Promise<number>;
    AddTaskRelationRedux: (mainTaskid: number, subTaskid: number, type: number, dispatch: any) => Promise<TaskRelation>;
    DeleteTaskRelationRedux: (id: number, dispatch: any) => Promise<boolean>;
    LoadRelationsForTaskRedux: (taskId: number, dispatch: any) => void;


    UpdateTaskNameRedux: (id: number, text: string) => void;
    UpdateTaskDescriptionRedux: (id: number, text: string) => void;
    UpdateTaskStatusRedux: (id: number, idStatus: number) => void;
    UpdateTaskExecutorRedux: (id: number, personId: number) => void;


    GetTaskNameUI: (id: number) => Promise<string>;
    FindTaskUI: (projectId: number, text: string) => Promise<IProjectTaskNameDataBack[]>;
    LoadTasksUI: (taskFilter: ITaskFilter) => Promise<OneTask[]>;

}



export class TaskManagementTaskController implements ITaskManagementTaskController {


    AddTaskRelationRedux = async (mainTaskid: number, subTaskid: number, type: number, dispatch: any): Promise<TaskRelation> => {

        this.preloader(true);
        let res = await this.AddTaskRelationAsync(mainTaskid, subTaskid, type);

        this.preloader(false);
        if (res.Data) {
            var result = new TaskRelation().FillByDataBack(res.Data);
            dispatch(AddTaskRelationStateActionCreator(result));
            return result;
        }

        return null;
    }

    AddTaskRelationAsync = async (mainTaskid: number, subTaskid: number, type: number): Promise<ServerResult<IProjectTaskRelationDataBack>> => {
        let data = {
            "mainTaskid": mainTaskid,
            "subTaskid": subTaskid,
            "type": type
        };
        let backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskRelationDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementAddTaskRelationUrl}`,
            ContentType: 'body'
        });
        return backResult;
    };


    DeleteTaskRelationRedux = async (id: number, dispatch: any): Promise<boolean> => {
        this.preloader(true);
        let res = await this.DeleteTaskRelationAsync(id);
        this.preloader(false);
        if (res.Data?.Result) {

            dispatch(DeleteTaskRelationStateActionCreator(id));
        }
        return res.Data?.Result ?? false;
    }

    DeleteTaskRelationAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "id": id
        };
        let backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementDeleteTaskRelationUrl}`
        });
        return backResult;
    };

    LoadRelationsForTaskRedux = async (id: number, dispatch: any): Promise<TaskRelation[]> => {
        this.preloader(true);
        let res = await this.LoadRelationsForTaskAsync(id);
        this.preloader(false);
        if (res.Data) {
            var result = res.Data.map(x => new TaskRelation().FillByDataBack(x));
            dispatch(LoadTaskRelationStateActionCreator(result));
            return result;
        }
        return null;
    }

    LoadRelationsForTaskAsync = async (id: number): Promise<ServerResult<IProjectTaskRelationDataBack[]>> => {
        let data = {
            "taskId": id
        };
        let backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskRelationDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementGetTaskRelationUrl}`
        });
        return backResult;
    };



    UpdateTaskNameRedux = (id: number, text: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskNameAsync(id, text);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(UpdateTaskNameActionCreator({ Id: id, Text: text }));
            }
        };
    }

    UpdateTaskNameAsync = async (id: number, text: string): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "name": text,
            "id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateNameUrl}`
        });

        return backResult;
    }


    UpdateTaskDescriptionRedux = (id: number, text: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskDescriptionAsync(id, text);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(UpdateTaskDescriptionActionCreator({ Id: id, Text: text }));
            }
        };
    }

    UpdateTaskDescriptionAsync = async (id: number, text: string): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "description": text,
            "id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateDescriptionUrl}`
        });

        return backResult;
    }

    UpdateTaskStatusRedux = (id: number, idStatus: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskStatusAsync(id, idStatus);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(UpdateTaskStatusActionCreator({ Id: id, IdStatus: idStatus }));
            }
        };
    }

    UpdateTaskStatusAsync = async (id: number, idStatus: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "statusId": idStatus,
            "id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateStatusUrl}`
        });

        return backResult;
    }

    UpdateTaskExecutorRedux = (id: number, personId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskExecutorAsync(id, personId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(UpdateTaskExecutorActionCreator({ Id: id, PersonId: personId }));
            }
        };
    }

    UpdateTaskExecutorAsync = async (id: number, personId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "personId": personId,
            "id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateExecutorUrl}`
        });

        return backResult;
    }



    AddTaskToProjectRedux = (task: OneTask, projectId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.AddTaskToProjectAsync(task, projectId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                dispatch(AddLoadTriggerActionCreator());
            }
        };
    }

    AddTaskToProjectAsync = async (task: OneTask, projectId: number): Promise<ServerResult<IProjectTaskDataBack>> => {
        let data = {
            "taskName": task.Name,
            "taskReviwerId": task.ExecutorId,
            "description": task.Description,
            "projectId": projectId,
            "statusId": task.StatusId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskAddNewUrl}`,
            ContentType: 'body'
        });

        return backResult;
    }






    UpdateTaskRedux = (task: OneTaskInList) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTaskAsync(task);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(UpdateTaskActionCreator(task));
            }
        };
    }

    UpdateTaskAsync = async (task: OneTaskInList): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "taskId": task.Id,
            "name": task.Name,
            "statusId": task.StatusId,
            "executorId": task.ExecutorId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateUrl}`,
            ContentType: 'body'
        });

        return backResult;
    }



    LoadTasksUI = async (taskFilter: ITaskFilter): Promise<OneTask[]> => {
        this.preloader(true);
        let backResult = await this.LoadTasksAsync(taskFilter);
        this.preloader(false);
        let dt = new LoadWorkTasksResult();
        dt.FillByBackModel(backResult);
        return dt.Tasks;

    }

    LoadTasksAsync = async (taskFilter: ITaskFilter): Promise<ILoadWorkTasksResultDataBack> => {

        let data = {
            "projectId": taskFilter.ProjectId,
            "nameLike": taskFilter.Name,
            "creatorId": taskFilter.CreatorId,
            "executorId": taskFilter.ExecutorId,
            "statusId": taskFilter.StatusId,
            "pageNumber": taskFilter.PageNumber,
            "pageSize": taskFilter.PageSize,
            "sprintId": taskFilter.SprintId,
            "labelId": taskFilter.LabelIds,
            "presetId": taskFilter.PresetId,
        };

        let backResult = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTasksGetUrl}`,
            ContentType: 'body'

        });

        return (backResult as ServerResult<ILoadWorkTasksResultDataBack>).Data;
    };



    LoadTasksRedux = (taskFilter: ITaskFilter) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            var data = await this.LoadTasksAsync(taskFilter);
            this.preloader(false);
            if (data) {
                let dt = new LoadWorkTasksResult();
                dt.FillByBackModel(data);
                dispatch(LoadTasksActionCreator(dt));
            }
        };
    }


    LoadTaskRedux = (taskId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.LoadTaskAsync(taskId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new OneTask();
                dt.FillByIProjectTaskDataBack(backResult.Data);
                dispatch(LoadTaskActionCreator(dt));
            }
        };
    }

    LoadTaskAsync = async (taskId: number): Promise<ServerResult<IProjectTaskDataBack>> => {
        let data = {
            "id": taskId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskDataBack>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskGetUrl}`
        });

        return backResult;
    }


    DeleteTaskRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteTaskAsync(id);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteTaskActionCreator(id));
            }
        };
    }

    DeleteTaskAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "taskId": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskDeleteUrl}`
        });

        return backResult;
    }

    CopyTaskUI = async (id: number): Promise<number> => {
        this.preloader(true);
        const backResult = await this.CopyTaskAsync(id);
        this.preloader(false);
        return backResult.Data?.Id ?? 0;
    }

    CopyTaskAsync = async (id: number): Promise<ServerResult<IProjectTaskDataBack>> => {
        let data = {
            "id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskCopyUrl}`
        });

        return backResult;
    }



    FindTaskUI = async (projectId: number, text: string): Promise<IProjectTaskNameDataBack[]> => {

        this.preloader(true);
        let res = await this.FindTaskAsync(projectId, text);

        this.preloader(false);
        if (res.Data) {
            return res.Data;
        }

        return [];
    }

    FindTaskAsync = async (projectId: number, text: string): Promise<ServerResult<IProjectTaskNameDataBack[]>> => {
        let data = {
            "projectId": projectId,
            "text": text,
        };
        let backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskNameDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/find-task`,
        });
        return backResult;
    };

    GetTaskNameUI = async (id: number): Promise<string> => {
        this.preloader(true);
        let backResult = await this.GetTaskNameAsync(id);
        this.preloader(false);
        return backResult?.Data?.Name;

    }

    GetTaskNameAsync = async (id: number): Promise<ServerResult<IProjectTaskNameDataBack>> => {
        let data = {
            "id": id,
        };
        let backResult = await G_AjaxHelper.GoAjaxRequest<IProjectTaskNameDataBack>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskNameUrl}`
        });

        return backResult;
    };



    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }
}