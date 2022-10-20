import { AddLoadTriggerActionCreator, AddTaskToProjectActionCreator, DeleteTaskActionCreator, LoadTasksActionCreator, UpdateTaskActionCreator } from "../../Actions/CodeReviewApp/TaskActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { ITaskFilter } from "../../Models/CodeReviewApp/TasksFilter";
import { AppState } from "../../Models/State/AppState";
import { ControllerHelper } from "../ControllerHelper";


export type AddNewProjectTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type UpdateTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type LoadTasks = (error: MainErrorObjectBack, data: ILoadReviewTasksResultDataBack) => void;
export type DeleteTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewTaskController {
    AddTaskToProjectRedux: (taskName: string, taskCreatorId: number, taskReviwerId: number, projectId: number) => void;
    UpdateTaskRedux: (task: IProjectTaskDataBack) => void;
    LoadTasksRedux: (taskFilter: ITaskFilter) => void;
    DeleteTaskRedux: (id: number) => void;
}



export class CodeReviewTaskController implements ICodeReviewTaskController {

    AddTaskToProjectRedux = (taskName: string, taskCreatorId: number, taskReviwerId: number, projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.AddTaskToProject(taskName, taskCreatorId, taskReviwerId, projectId,
                (error: MainErrorObjectBack, data: IProjectTaskDataBack) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        // dispatch(AddTaskToProjectActionCreator(data));
                        dispatch(AddLoadTriggerActionCreator());

                        // let st = getState() as AppState;
                        // let filter = {
                        //     Name: st.CodeReviewApp.CurrentProjectTasksFilters.TaskName
                        //     , CreatorId: st.CodeReviewApp.CurrentProjectTasksFilters.CreatorId
                        //     , PageNumber: st.CodeReviewApp.CurrentProjectTasksFilters.Page, PageSize: tasksOnPageCount
                        //     , ProjectId: st.CodeReviewApp.CurrentProjectId, ReviewerId: st.CodeReviewApp.CurrentProjectTasksFilters.ReviewerId
                        //     , Status: st.CodeReviewApp.CurrentProjectTasksFilters.Status
                        // } as ITaskFilter;
                        // dispatch(this.LoadTasksRedux());
                    }
                });
        };
    }

    AddTaskToProject = (taskName: string, taskCreatorId: number, taskReviwerId: number, projectId: number, onSuccess: AddNewProjectTask) => {
        let data = {
            "taskName": taskName,
            "taskCreatorId": taskCreatorId,
            "taskReviwerId": taskReviwerId,
            "projectId": projectId,
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


    UpdateTaskRedux = (task: IProjectTaskDataBack) => {
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

    UpdateTask = (task: IProjectTaskDataBack, onSuccess: UpdateTask) => {
        let data = {
            "taskId": task.Id,
            "name": task.Name,
            "status": task.Status,
            "creatorId": task.CreatorId,
            "reviewerId": task.ReviewerId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
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
                    dispatch(LoadTasksActionCreator(data));
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
            "status": taskFilter.Status,
            "pageNumber": taskFilter.PageNumber,
            "pageSize": taskFilter.PageSize,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/task/get-project-tasks'

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
            Type: "DELETE",
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