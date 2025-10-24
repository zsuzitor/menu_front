import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AddLoadTriggerActionCreator, UpdateTaskActionCreator, LoadTasksActionCreator, DeleteTaskActionCreator, LoadTaskActionCreator, UpdateTaskNameActionCreator, UpdateTaskDescriptionActionCreator, UpdateTaskStatusActionCreator, UpdateTaskExecutorActionCreator } from "../Actions/TaskActions";
import { ILoadWorkTasksResultDataBack } from "../BackModels/ILoadWorkTasksResultDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { TaskManagementApiTaskUrl, TaskManagementPreloader, TaskManagementTaskAddNewUrl, TaskManagementTaskCopyUrl, TaskManagementTaskDeleteUrl, TaskManagementTaskGetUrl, TaskManagementTasksGetUrl, TaskManagementTaskUpdateDescriptionUrl, TaskManagementTaskUpdateExecutorUrl, TaskManagementTaskUpdateNameUrl, TaskManagementTaskUpdateStatusUrl, TaskManagementTaskUpdateUrl } from "../Consts";
import { ITaskFilter } from "../Entity/ITaskFilter";
import { LoadWorkTasksResult, ProjectTaskData } from "../Entity/LoadWorkTasksResult";
import { OneTask } from "../Entity/State/OneTask";


export type AddNewProjectTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type UpdateTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type LoadTasks = (error: MainErrorObjectBack, data: ILoadWorkTasksResultDataBack) => void;
export type LoadTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type DeleteTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type UpdatePartTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ITaskManagementTaskController {
    AddTaskToProjectRedux: (task: OneTask, projectId: number) => void;
    UpdateTaskRedux: (task: OneTask) => void;
    LoadTasksRedux: (taskFilter: ITaskFilter) => void;
    LoadTaskRedux: (taskId: number) => void;
    DeleteTaskRedux: (id: number) => void;
    CopyTaskUI: (id: number) => Promise<number>;


    UpdateTaskNameRedux: (id: number, text: string) => void;
    UpdateTaskDescriptionRedux: (id: number, text: string) => void;
    UpdateTaskStatusRedux: (id: number, idStatus: number) => void;
    UpdateTaskExecutorRedux: (id: number, personId: number) => void;
}



export class TaskManagementTaskController implements ITaskManagementTaskController {


    UpdateTaskNameRedux = (id: number, text: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskName(id, text, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(UpdateTaskNameActionCreator({ Id: id, Text: text }));

                }
            });
        };
    }

    UpdateTaskName = (id: number, text: string, onSuccess: UpdatePartTask) => {
        let data = {
            "name": text,
            "id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateNameUrl}`

        });
    }


    UpdateTaskDescriptionRedux = (id: number, text: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskDescription(id, text, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(UpdateTaskDescriptionActionCreator({ Id: id, Text: text }));

                }
            });
        };
    }

    UpdateTaskDescription = (id: number, text: string, onSuccess: UpdatePartTask) => {
        let data = {
            "description": text,
            "id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateDescriptionUrl}`

        });
    }

    UpdateTaskStatusRedux = (id: number, idStatus: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskStatus(id, idStatus, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(UpdateTaskStatusActionCreator({ Id: id, IdStatus: idStatus }));

                }
            });
        };
    }

    UpdateTaskStatus = (id: number, idStatus: number, onSuccess: UpdatePartTask) => {
        let data = {
            "statusId": idStatus,
            "id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateStatusUrl}`

        });
    }

    UpdateTaskExecutorRedux = (id: number, personId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskExecutor(id, personId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(UpdateTaskExecutorActionCreator({ Id: id, PersonId: personId }));

                }
            });
        };
    }

    UpdateTaskExecutor = (id: number, personId: number, onSuccess: UpdatePartTask) => {
        let data = {
            "personId": personId,
            "id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateExecutorUrl}`

        });
    }


    AddTaskToProjectRedux = (task: OneTask, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.AddTaskToProject(task, projectId,
                (error: MainErrorObjectBack, data: IProjectTaskDataBack) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        dispatch(AddLoadTriggerActionCreator());
                    }
                });
        };
    }

    AddTaskToProject = (task: OneTask, projectId: number, onSuccess: AddNewProjectTask) => {
        let data = {
            "taskName": task.Name,
            "taskCreatorId": task.CreatorId,
            "taskReviwerId": task.ExecutorId,
            "description": task.Description,
            "projectId": projectId,
            "statusId": task.StatusId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskAddNewUrl}`,
            ContentType: 'body'

        });

    }


    UpdateTaskRedux = (task: OneTask) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTask(task, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(UpdateTaskActionCreator(task));
                }
            });
        };
    }

    UpdateTask = (task: OneTask, onSuccess: UpdateTask) => {
        let data = {
            "taskId": task.Id,
            "name": task.Name,
            "statusId": task.StatusId,
            "creatorId": task.CreatorId,
            "executorId": task.ExecutorId,
            "description": task.Description,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskUpdateUrl}`,
            ContentType: 'body'

        });
    }

    LoadTasksRedux = (taskFilter: ITaskFilter) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTasks(taskFilter, (error: MainErrorObjectBack, data: ILoadWorkTasksResultDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data) {
                    let dt = new LoadWorkTasksResult();
                    dt.FillByBackModel(data);
                    dispatch(LoadTasksActionCreator(dt));
                }
            });
        };
    }

    LoadTasks = (taskFilter: ITaskFilter, onSuccess: LoadTasks) => {
        let data = {
            "projectId": taskFilter.ProjectId,
            "nameLike": taskFilter.Name,
            "creatorId": taskFilter.CreatorId,
            "executorId": taskFilter.ExecutorId,
            "statusId": taskFilter.StatusId,
            "pageNumber": taskFilter.PageNumber,
            "pageSize": taskFilter.PageSize,
            "sprintId": taskFilter.SprintId,
            "labelId": taskFilter.LabelId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTasksGetUrl}`

        });
    };

    LoadTaskRedux = (taskId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTask(taskId, (error: MainErrorObjectBack, data: IProjectTaskDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data) {
                    let dt = new ProjectTaskData();
                    dt.FillByBackModel(data);
                    dispatch(LoadTaskActionCreator(dt));
                }
            });
        };
    }

    LoadTask = (taskId: number, onSuccess: LoadTask) => {
        let data = {
            "id": taskId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskGetUrl}`

        });
    };


    DeleteTaskRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteTask(id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DeleteTaskActionCreator(id));
                }
            });
        };
    }

    DeleteTask = (id: number, onSuccess: DeleteTask) => {
        let data = {
            "taskId": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskDeleteUrl}`

        });
    };

    CopyTaskUI = async (id: number): Promise<number> => {
        this.preloader(true);
        let backResult = await this.CopyTaskAsync(id);
        this.preloader(false);
        return backResult.Id;
    }

    CopyTaskAsync = async (id: number): Promise<IProjectTaskDataBack> => {
        let data = {
            "id": id,
        };
        let backResult = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => { },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiTaskUrl}/${TaskManagementTaskCopyUrl}`
        });
        return backResult as IProjectTaskDataBack;
    };



    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }
}