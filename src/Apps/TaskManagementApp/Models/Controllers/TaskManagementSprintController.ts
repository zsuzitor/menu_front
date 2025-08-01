import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { IOneWorkTaskCommentDataBack } from "../BackModels/IOneWorkTaskCommentDataBack";
import { CommentUpdate } from "../Entity/CommentUpdate";
import { TaskManagementPreloader } from "../Consts";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { IProjectSprintDataBack } from "../BackModels/IProjectSprintDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { AddTaskToSprintActionCreator, AddTaskToSprintActionName, CreateSprintActionCreator, DeleteSprintActionCreator, DeleteTaskFromSprintActionCreator, GetProjectSprintsActionCreator, GetProjectSprintsActionType, GetSprintsTasksActionCreator, TaskIdWithSprintIdActionType } from "../Actions/SprintActions";
import { OneTask } from "../Entity/State/OneTask";



export type GetSprints = (error: MainErrorObjectBack, data: IProjectSprintDataBack[]) => void;
export type GetTasks = (error: MainErrorObjectBack, data: IProjectTaskDataBack[]) => void;
export type CreateSprint = (error: MainErrorObjectBack, data: IProjectSprintDataBack) => void;
export type Delete = (error: MainErrorObjectBack, data: BoolResultBack) => void;



export interface ITaskManagementSprintController {
    GetForProjectRedux: (projectId: number) => void;
    GetTasksRedux: (sprintId: number) => void;
    CreateSprintRedux: (projectId: number, name: string) => void;
    DeleteSprintRedux: (sprintId: number) => void;
    AddTaskToSprintRedux: (sprintId: number, taskId: number) => void;
    DeleteTaskFromSprintRedux: ( taskId: number) => void;



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


    CreateSprintRedux = (projectId: number, name: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateSprint(projectId, name, (error: MainErrorObjectBack, data: IProjectSprintDataBack) => {
                this.preloader(false);

                if (data?.Id) {
                    let dt = new ProjectSprint();
                    dt.FillByIProjectSprintDataBack(data);
                    dispatch(CreateSprintActionCreator(dt));
                }
            });
        };
    }

    CreateSprint = (projectId: number, name: string, onSuccess: CreateSprint) => {
        let data = {
            "projectId": projectId,
            "name": name,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/sprint/create'

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

    DeleteTaskFromSprintRedux = ( taskId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteTaskFromSprint(taskId, (error: MainErrorObjectBack, data: BoolResultBack) => {
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

    DeleteTaskFromSprint = (taskId: number, onSuccess: Delete) => {
        let data = {
            // "sprintId": sprintId,
            "taskId": taskId,
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

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);
    }

}