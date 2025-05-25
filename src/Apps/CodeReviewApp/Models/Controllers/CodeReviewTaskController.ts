import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AddLoadTriggerActionCreator, UpdateTaskActionCreator, LoadTasksActionCreator, DeleteTaskActionCreator, LoadTaskActionCreator } from "../Actions/TaskActions";
import { ILoadReviewTasksResultDataBack } from "../BackModels/ILoadReviewTasksResultDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { ITaskFilter } from "../Entity/ITaskFilter";
import { LoadReviewTasksResult, ProjectTaskData } from "../Entity/LoadReviewTasksResult";
import { OneTask } from "../Entity/State/OneTask";


export type AddNewProjectTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type UpdateTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type LoadTasks = (error: MainErrorObjectBack, data: ILoadReviewTasksResultDataBack) => void;
export type LoadTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type DeleteTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewTaskController {
    AddTaskToProjectRedux: (task: OneTask, projectId: number) => void;
    UpdateTaskRedux: (task: OneTask) => void;
    LoadTasksRedux: (taskFilter: ITaskFilter) => void;
    LoadTaskRedux: (taskId: number) => void;
    DeleteTaskRedux: (id: number) => void;
}



export class CodeReviewTaskController implements ICodeReviewTaskController {

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
            "taskReviwerId": task.ReviewerId,
            "taskLink": task.Link,
            "projectId": projectId,
            "statusId": task.StatusId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/task/add-new-task'

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
            "reviewerId": task.ReviewerId,
            "taskLink": task.Link,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/task/update-task'

        });
    }

    LoadTasksRedux = (taskFilter: ITaskFilter) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTasks(taskFilter, (error: MainErrorObjectBack, data: ILoadReviewTasksResultDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data) {
                    let dt = new LoadReviewTasksResult();
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
            "reviewerId": taskFilter.ReviewerId,
            "statusId": taskFilter.StatusId,
            "pageNumber": taskFilter.PageNumber,
            "pageSize": taskFilter.PageSize,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/task/get-project-tasks'

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
            Url: G_PathToServer + 'api/codereview/task/get-project-task'

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
            Url: G_PathToServer + 'api/codereview/task/delete-task'

        });
    };

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