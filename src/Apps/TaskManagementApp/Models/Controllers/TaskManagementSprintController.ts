import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { IOneWorkTaskCommentDataBack } from "../BackModels/IOneWorkTaskCommentDataBack";
import { CommentUpdate } from "../Entity/CommentUpdate";
import { TaskManagementPreloader } from "../Consts";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { IProjectSprintDataBack } from "../BackModels/IProjectSprintDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { AddTaskToSprintActionCreator, CreateSprintActionCreator, DeleteSprintActionCreator, DeleteTaskFromSprintActionCreator, GetProjectSprintsActionCreator, GetProjectSprintsActionType, GetSprintsTasksActionCreator, TaskIdWithSprintIdActionType, TaskIdWithSprintIdsActionType, UpdateTaskSprintActionCreator } from "../Actions/SprintActions";
import { OneTask } from "../Entity/State/OneTask";
import { SprintCreate } from "../Entity/SprintCreate";



export type GetSprints = (error: MainErrorObjectBack, data: IProjectSprintDataBack[]) => void;
export type GetTasks = (error: MainErrorObjectBack, data: IProjectTaskDataBack[]) => void;
export type CreateSprint = (error: MainErrorObjectBack, data: IProjectSprintDataBack) => void;
export type Delete = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type Update = (error: MainErrorObjectBack, data: BoolResultBack) => void;



export interface ITaskManagementSprintController {
    GetForProjectRedux: (projectId: number) => void;
    GetTasksRedux: (sprintId: number) => void;
    CreateSprintRedux: (req: SprintCreate) => void;
    DeleteSprintRedux: (sprintId: number) => void;
    AddTaskToSprintRedux: (sprintId: number, taskId: number) => void;
    DeleteTaskFromSprintRedux: (taskId: number, sprintId: number) => void;
    UpdateTaskFromSprintRedux: (taskId: number, sprintId: number[]) => void;



}



export class TaskManagementSprintController implements ITaskManagementSprintController {



    GetForProjectRedux = (projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetForProject(projectId, (error: MainErrorObjectBack, data: IProjectSprintDataBack[]) => {
                this.preloader(false);


                if (data) {
                    let dt = new GetProjectSprintsActionType();
                    dt.projectId = projectId;
                    dt.data = data.map(x => new ProjectSprint().FillByIProjectSprintDataBack(x));
                    dispatch(GetProjectSprintsActionCreator(dt));

                }
            });
        };
    }

    GetForProject = (projectId: number, onSuccess: GetSprints) => {
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
            Url: G_PathToServer + 'api/taskmanagement/sprint/get-for-project'

        });
    };


    GetTasksRedux = (sprintId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetTasks(sprintId, (error: MainErrorObjectBack, data: IProjectTaskDataBack[]) => {
                this.preloader(false);

                if (data) {
                    let dt = data.map(x => new OneTask().FillByIProjectTaskDataBack(x));
                    dispatch(GetSprintsTasksActionCreator(dt));

                }
            });
        };
    }

    GetTasks = (sprintId: number, onSuccess: GetTasks) => {
        let data = {
            "sprintId": sprintId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/get-tasks'

        });
    };


    CreateSprintRedux = (req: SprintCreate) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateSprint(req, (error: MainErrorObjectBack, data: IProjectSprintDataBack) => {
                this.preloader(false);

                if (data?.Id) {
                    let dt = new ProjectSprint();
                    dt.FillByIProjectSprintDataBack(data);
                    dispatch(CreateSprintActionCreator(dt));
                }
            });
        };
    }

    CreateSprint = (req: SprintCreate, onSuccess: CreateSprint) => {
        let data = {
            "ProjectId": req.ProjectId,
            "Name": req.Name,
            "StartDate": new ControllerHelper().ToZeroDate(req.StartDate).toISOString(),
            "EndDate": new ControllerHelper().ToZeroDate(req.EndDate).toISOString()
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/create',
            ContentType: 'body'

        });
    };

    DeleteSprintRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteSprint(id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data.result) {
                    dispatch(DeleteSprintActionCreator(id));
                }
            });
        };
    }

    DeleteSprint = (id: number, onSuccess: Delete) => {
        let data = {
            "id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/delete'

        });
    };

    AddTaskToSprintRedux = (sprintId: number, taskId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.AddTaskToSprint(sprintId, taskId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);


                if (data?.result) {
                    let dt = new TaskIdWithSprintIdActionType();
                    dt.sprintId = sprintId;
                    dt.taskId = taskId;
                    dispatch(AddTaskToSprintActionCreator(dt));

                }
            });
        };
    }

    AddTaskToSprint = (sprintId: number, taskId: number, onSuccess: Delete) => {
        let data = {
            "sprintId": sprintId,
            "taskId": taskId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/add-task-to-sprint'

        });
    };

    DeleteTaskFromSprintRedux = (taskId: number, sprintId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteTaskFromSprint(taskId,sprintId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data?.result) {
                    let dt = new TaskIdWithSprintIdActionType();
                    dt.sprintId = null;
                    dt.taskId = taskId;
                    dispatch(DeleteTaskFromSprintActionCreator(dt));

                }
            });
        };
    }

    DeleteTaskFromSprint = (taskId: number, sprintId: number, onSuccess: Delete) => {
        let data = {
            // "sprintId": sprintId,
            "taskId": taskId,
            "sprintId": sprintId
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/delete-task-from-sprint'

        });
    };

    UpdateTaskFromSprintRedux = (taskId: number, sprintId: number[]) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskFromSprint(taskId,sprintId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);

                if (data?.result) {
                    let dt = new TaskIdWithSprintIdsActionType();
                    dt.sprintId = sprintId;
                    dt.taskId = taskId;
                    dispatch(UpdateTaskSprintActionCreator(dt));

                }
            });
        };
    }

        UpdateTaskFromSprint = (taskId: number, sprintId: number[], onSuccess: Update) => {
        let data = {
            // "sprintId": sprintId,
            "taskId": taskId,
            "sprintId": sprintId
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/update-task-sprints',
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