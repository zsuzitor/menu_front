import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { SetTaskTimeLogActionCreator, SetProjectTimeLogDataActionCreator, SetUserTimeLogDataActionCreator, SetUserTempoTimeLogDataActionCreator, AddNewTimeLogTaskActionCreator, AddNewTimeLogTempoActionCreator, DelTimeLogTempoActionCreator } from "../Actions/TimeLogAction";
import { IProjectUserDataBack } from "../BackModels/IProjectUserDataBack";
import { IWorkTimeLogDataBack } from "../BackModels/IWorkTimeLogDataBack";
import { TaskManagementPreloader } from "../Consts";
import { TimeLog } from "../Entity/State/TimeLog";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type CreateTime = (error: MainErrorObjectBack, data: IWorkTimeLogDataBack) => void;


export interface ITaskManagementWorkTimeController {
    CreateTimeLogRedux: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    CreateTimeTempoLogRedux: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    DeleteTimeTempoLogRedux: (timeId: number) => void;
    LoadTimeLogsForTaskRedux: (taskId: number) => void;
    LoadTimeLogsForProjectRedux: (projectId: number, dateFrom: Date, dateTo: Date) => void;
    LoadTimeLogsForUserRedux: (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => void;
    LoadTimeLogsForUserTempoRedux: (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => void;
}


export class TaskManagementWorkTimeController implements ITaskManagementWorkTimeController {


    CreateTimeLogRedux = (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateTimeLog(taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog, (error: MainErrorObjectBack, data: IWorkTimeLogDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let dt = new TimeLog().FillByBackModel(data);
                    dispatch(AddNewTimeLogTaskActionCreator(dt));
                }
            });
        };
    }

    CreateTimeTempoLogRedux = (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateTimeLog(taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog, (error: MainErrorObjectBack, data: IWorkTimeLogDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let dt = new TimeLog().FillByBackModel(data);
                    dispatch(AddNewTimeLogTempoActionCreator(dt));
                }
            });
        };
    }

    CreateTimeLog = (taskId: number, text: string, minutes: number
        , dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date, onSuccess: CreateTime) => {
        let data = {
            "taskId": taskId,
            "text": text,
            "minutes": minutes,
            "dayOfLog": dayOfLog.toISOString(),
            "rangeEndOfLog": new ControllerHelper().ToZeroDate(rangeEndOfLog).toISOString(),
            "rangeStartOfLog": new ControllerHelper().ToZeroDate(rangeStartOfLog).toISOString(),
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/worktimelog/create',
            ContentType: 'body'

        });
    }

    DeleteTimeTempoLogRedux = (timeId: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteTimeLog(timeId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DelTimeLogTempoActionCreator(timeId));
                }
            });
        };
    }

    DeleteTimeLog = (timeId: number, onSuccess: (error: MainErrorObjectBack, data: BoolResultBack) => void) => {
        let data = {
            "id": timeId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/worktimelog/delete'

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
            this.LoadTimeLogsForProject(projectId, null, dateFrom, dateTo
                , (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        let mapped = data.map(x => new TimeLog().FillByBackModel(x));
                        dispatch(SetProjectTimeLogDataActionCreator(mapped));
                    }
                });
        };
    }
    LoadTimeLogsForProject = (projectId: number, userId: number, dateFrom: Date, dateTo: Date
        , onSuccess: (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => void) => {
        let data = {
            "id": projectId,
            "dateFrom": dateFrom.toISOString(),
            "dateTo": dateTo.toISOString(),
            "userId": userId || null
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

    LoadTimeLogsForUserRedux = (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTimeLogsForUser(projectId, userId, dateFrom, dateTo
                , (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        let mapped = data.map(x => new TimeLog().FillByBackModel(x));
                        dispatch(SetUserTimeLogDataActionCreator(mapped));
                    }
                });
        };
    }

    LoadTimeLogsForUserTempoRedux = (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadTimeLogsForUser(projectId, userId, dateFrom, dateTo
                , (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => {
                    this.preloader(false);
                    if (error) {
                        return;
                    }

                    if (data) {
                        let mapped = data.map(x => new TimeLog().FillByBackModel(x));
                        dispatch(SetUserTempoTimeLogDataActionCreator(mapped));
                    }
                });
        };
    }

    LoadTimeLogsForUser = (projectId: number, userId: number, dateFrom: Date, dateTo: Date
        , onSuccess: (error: MainErrorObjectBack, data: IWorkTimeLogDataBack[]) => void) => {
        let data = {
            "projectId": projectId || null,
            "dateFrom": dateFrom.toISOString(),
            "dateTo": dateTo.toISOString(),
            "userId": userId
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/worktimelog/user-time'

        });
    }


    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }
}