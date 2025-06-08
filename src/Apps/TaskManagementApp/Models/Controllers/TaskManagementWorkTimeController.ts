import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AddNewTimeLogActionCreator, SetTaskTimeLogActionCreator, SetTimeLogDataActionCreator, SetTimeLogDataActionName } from "../Actions/TimeLogAction";
import { DeleteProjectUserActionCreator, AddProjectUserActionCreator, ChangeProjectUserActionCreator } from "../Actions/UserActions";
import { IProjectUserDataBack } from "../BackModels/IProjectUserDataBack";
import { IWorkTimeLogDataBack } from "../BackModels/IWorkTimeLogDataBack";
import { TaskManagementPreloader } from "../Consts";
import { TimeLog } from "../Entity/State/TimeLog";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type CreateTime = (error: MainErrorObjectBack, data: IWorkTimeLogDataBack) => void;


export interface ITaskManagementWorkTimeController {
    CreateTimeLogRedux: (taskId: number, text: string, minutes: number, dayOfLog: Date) => void;
    LoadTimeLogsForTaskRedux: (taskId: number) => void;
    LoadTimeLogsForProjectRedux: (projectId: number, dateFrom: Date, dateTo: Date) => void;
}


export class TaskManagementWorkTimeController implements ITaskManagementWorkTimeController {


    CreateTimeLogRedux = (taskId: number, text: string, minutes: number, dayOfLog: Date) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateTimeLog(taskId, text, minutes, dayOfLog, (error: MainErrorObjectBack, data: IWorkTimeLogDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let dt = new TimeLog().FillByBackModel(data);
                    dispatch(AddNewTimeLogActionCreator(dt));
                }
            });
        };
    }

    CreateTimeLog = (taskId: number, text: string, minutes: number, dayOfLog: Date, onSuccess: CreateTime) => {
        let data = {
            "taskId": taskId,
            "text": text,
            "minutes": minutes,
            "dayOfLog": dayOfLog.toISOString(),
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/worktimelog/create'

        });
    }

    LoadTimeLogsForTaskRedux = (taskId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTimeLogsForTask(taskId, (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data) {
                    let mapped = data.map(x => new TimeLog().FillByBackModel(x));
                    dispatch(SetTaskTimeLogActionCreator({ TaskId: taskId, Time: mapped }));
                }
            });
        };
    }

    LoadTimeLogsForTask = (taskId: number, onSuccess: (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => void) => {
        let data = {
            "taskId": taskId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/worktimelog/task-time'

        });
    }


    LoadTimeLogsForProjectRedux = (projectId: number, dateFrom: Date, dateTo: Date) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTimeLogsForProject(projectId, dateFrom, dateTo
                , (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        let mapped = data.map(x => new TimeLog().FillByBackModel(x));
                        dispatch(SetTimeLogDataActionCreator(mapped));
                    }
                });
        };
    }


    LoadTimeLogsForProject = (projectId: number, dateFrom: Date, dateTo: Date
        , onSuccess: (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => void) => {
        let data = {
            "id": projectId,
            "dateFrom": dateFrom.toISOString(),
            "dateTo": dateTo.toISOString(),
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/worktimelog/project-time'

        });
    }


    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        if (!window.TaskManagementCounter) {
            window.TaskManagementCounter = 0;
        }

        var preloader = document.getElementById(TaskManagementPreloader);
        if (!preloader) {
            return;
        }

        if (show) {
            window.TaskManagementCounter++;
            preloader.style.display = 'block';
        }
        else {
            window.TaskManagementCounter--;
            if (!window.TaskManagementCounter) {
                preloader.style.display = 'none';
            }
        }
    }
}