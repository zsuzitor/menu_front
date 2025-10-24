import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { TaskManagementApiSprintUrl, TaskManagementPreloader } from "../Consts";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { IProjectSprintDataBack } from "../BackModels/IProjectSprintDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { AddTaskToSprintActionCreator, CreateSprintActionCreator, DeleteSprintActionCreator, DeleteTaskFromSprintActionCreator, GetProjectSprintsActionCreator, GetProjectSprintsActionType, GetSprintsTasksActionCreator, TaskIdWithSprintIdActionType, TaskIdWithSprintIdsActionType, UpdateSprintActionCreator, UpdateTaskSprintActionCreator } from "../Actions/SprintActions";
import { OneTask } from "../Entity/State/OneTask";
import { SprintCreate } from "../Entity/SprintCreate";
import { SprintUpdate } from "../Entity/SprintUpdate";
import { ServerResult } from "../../../../Models/AjaxLogic";



export type GetSprints = (error: MainErrorObjectBack, data: IProjectSprintDataBack[]) => void;
export type GetTasks = (error: MainErrorObjectBack, data: IProjectTaskDataBack[]) => void;
export type CreateSprint = (error: MainErrorObjectBack, data: IProjectSprintDataBack) => void;
export type Delete = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type Update = (error: MainErrorObjectBack, data: BoolResultBack) => void;



export interface ITaskManagementSprintController {
    // GetForProjectRedux: (projectId: number) => void;
    GetForProjectRedux: (projectId: number, dispatch: any) => Promise<any>;


    GetTasksRedux: (sprintId: number) => void;
    CreateSprintRedux: (req: SprintCreate) => void;
    UpdateSprintRedux: (req: SprintUpdate) => void;
    DeleteSprintRedux: (sprintId: number) => void;
    AddTaskToSprintRedux: (sprintId: number, taskId: number) => void;
    DeleteTaskFromSprintRedux: (taskId: number, sprintId: number) => void;
    UpdateTaskFromSprintRedux: (taskId: number, sprintId: number[]) => void;



}



export class TaskManagementSprintController implements ITaskManagementSprintController {

    GetForProjectRedux = async (projectId: number, dispatch: any): Promise<any> => {
        this.preloader(true);
        let backResult = await this.GetForProject(projectId);
        this.preloader(false);
        if (backResult) {
            let dt = new GetProjectSprintsActionType();
            // dt.projectId = projectId;
            dt.data = backResult.map(x => new ProjectSprint().FillByIProjectSprintDataBack(x));
            dispatch(GetProjectSprintsActionCreator(dt));

        }

    }

    GetForProject = async (projectId: number): Promise<IProjectSprintDataBack[]> => {
        let data = {
            "projectId": projectId,
        };
        let res = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/get-for-project`

        }) as ServerResult<any>;
        return res.Data;
    };

    // GetForProjectRedux = (projectId: number) => {
    //     return (dispatch: any, getState: any) => {
    //         this.preloader(true);
    //         this.GetForProject(projectId, (error: MainErrorObjectBack, data: IProjectSprintDataBack[]) => {
    //             this.preloader(false);


    //             if (data) {
    //                 let dt = new GetProjectSprintsActionType();
    //                 // dt.projectId = projectId;
    //                 dt.data = data.map(x => new ProjectSprint().FillByIProjectSprintDataBack(x));
    //                 dispatch(GetProjectSprintsActionCreator(dt));

    //             }
    //         });
    //     };
    // }

    // GetForProject = (projectId: number, onSuccess: GetSprints) => {
    //     let data = {
    //         "projectId": projectId,
    //     };
    //     G_AjaxHelper.GoAjaxRequest({
    //         Data: data,
    //         Type: ControllerHelper.GetHttp,
    //         FuncSuccess: (xhr, status, jqXHR) => {
    //             this.mapWithResult(onSuccess)(xhr, status, jqXHR);
    //         },
    //         FuncError: (xhr, status, error) => { },
    //         Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/get-for-project`

    //     });
    // };


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
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/get-tasks`

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
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/create`,
            ContentType: 'body'

        });
    };

    UpdateSprintRedux = (req: SprintUpdate) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateSprint(req, (error: MainErrorObjectBack, data: IProjectSprintDataBack) => {
                this.preloader(false);

                if (data?.Id) {
                    let dt = new ProjectSprint();
                    dt.FillByIProjectSprintDataBack(data);
                    dispatch(UpdateSprintActionCreator(dt));
                }
            });
        };
    }

    UpdateSprint = (req: SprintUpdate, onSuccess: CreateSprint) => {
        let data = {
            "Id": req.Id,
            "Name": req.Name,
            "StartDate": new ControllerHelper().ToZeroDate(req.StartDate).toISOString(),
            "EndDate": new ControllerHelper().ToZeroDate(req.EndDate).toISOString()
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,

            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/update`,
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
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/delete`

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
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/add-task-to-sprint`

        });
    };

    DeleteTaskFromSprintRedux = (taskId: number, sprintId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteTaskFromSprint(taskId, sprintId, (error: MainErrorObjectBack, data: BoolResultBack) => {
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
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/delete-task-from-sprint`

        });
    };

    UpdateTaskFromSprintRedux = (taskId: number, sprintId: number[]) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateTaskFromSprint(taskId, sprintId, (error: MainErrorObjectBack, data: BoolResultBack) => {
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
            Url: `${G_PathToServer}${TaskManagementApiSprintUrl}/update-task-sprints`,
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