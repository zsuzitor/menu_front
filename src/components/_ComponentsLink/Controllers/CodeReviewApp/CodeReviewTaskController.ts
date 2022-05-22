import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { ILoadReviewTasksResultDataBask } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBask";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { ITaskFilter } from "../../Models/CodeReviewApp/TasksFilter";


export type AddNewProjectTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type UpdateTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type LoadTasks = (error: MainErrorObjectBack, data: ILoadReviewTasksResultDataBask) => void;
export type DeleteTask = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewTaskController {
    AddTaskToProject: (taskName: string, taskCreatorId: number, taskReviwerId: number, projectId: number, onSuccess: AddNewProjectTask) => void;
    UpdateTask: (task: IProjectTaskDataBack, onSuccess: UpdateTask) => void;
    LoadTasks: (taskFilter: ITaskFilter, onSuccess: LoadTasks) => void;
    DeleteTask: (id: number, onSuccess: DeleteTask) => void;
}



export class CodeReviewTaskController implements ICodeReviewTaskController {
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
            Url: G_PathToServer + 'api/codereview/project/add-new-task'

        });

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
            Url: G_PathToServer + 'api/codereview/project/update-task'

        });
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
            Url: G_PathToServer + 'api/codereview/project/get-project-tasks'

        });
    };

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
            Url: G_PathToServer + 'api/codereview/project/delete-task'

        });
    };

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (xhr: any, status: any, jqXHR: any) => {
            let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
            if (resp.errors) {
                //TODO ошибка
                onSuccess(resp, null);
            }
            else {
                let dataBack = xhr as T;
                onSuccess(null, dataBack);

            }
        }
    }
}