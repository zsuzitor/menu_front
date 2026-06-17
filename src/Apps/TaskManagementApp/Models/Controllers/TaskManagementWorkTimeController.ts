import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetTaskTimeLogActionCreator, SetProjectTimeLogDataActionCreator, SetUserTimeLogDataActionCreator, SetUserTempoTimeLogDataActionCreator, AddNewTimeLogTaskActionCreator, AddNewTimeLogTempoActionCreator, DeleteTimeLogTempoActionCreator, UpdateTimeLogTempoActionCreator, DeleteTimeLogActionCreator, DeleteTimeLogActionParam } from "../Actions/TimeLogAction";
import { IWorkTimeLogDataBack } from "../BackModels/IWorkTimeLogDataBack";
import { TaskManagementApiWorkTimeUrl, TaskManagementPreloader } from "../Consts";
import { TimeLog } from "../Entity/State/TimeLog";



export interface ITaskManagementWorkTimeController {
    CreateTimeLogRedux: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    CreateTimeTempoLogRedux: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    UpdateTimeTempoLogRedux: (id: number, taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    DeleteTimeTempoLogRedux: (timeId: number) => void;
    DeleteTimeTaskLogRedux: (timeId: number, taskId: number) => void;
    CopyTimeTempoLogRedux: (timeId: number) => void;
    LoadTimeLogsForTaskRedux: (taskId: number) => void;
    LoadTimeLogsForProjectRedux: (projectId: number, dateFrom: Date, dateTo: Date) => void;
    LoadTimeLogsForUserRedux: (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => void;
    LoadTimeLogsForUserTempoRedux: (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => void;
}


export class TaskManagementWorkTimeController implements ITaskManagementWorkTimeController {


    CreateTimeLogRedux = (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateTimeLogAsync(taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                // console.log(data);
                let dt = new TimeLog().FillByBackModel(backResult.Data);
                // console.log(dt);
                dispatch(AddNewTimeLogTaskActionCreator(dt));
            }
        };
    }

    CreateTimeTempoLogRedux = (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateTimeLogAsync(taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let dt = new TimeLog().FillByBackModel(backResult.Data);
                dispatch(AddNewTimeLogTempoActionCreator(dt));
            }
        };
    }

    CreateTimeLogAsync = async (taskId: number, text: string, minutes: number
        , dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date): Promise<ServerResult<IWorkTimeLogDataBack>> => {
        let data = {
            "taskId": taskId,
            "text": text,
            "minutes": minutes,
            "dayOfLog": new ControllerHelper().ToZeroDate(dayOfLog).toISOString(),
            "rangeEndOfLog": rangeEndOfLog ? new ControllerHelper().ToZeroDate(rangeEndOfLog).toISOString() : null,
            "rangeStartOfLog": rangeStartOfLog ? new ControllerHelper().ToZeroDate(rangeStartOfLog).toISOString() : null,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTimeLogDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiWorkTimeUrl}/create`,
            ContentType: 'body'

        });


        return backResult;
    }

    UpdateTimeTempoLogRedux = (id: number, taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateTimeLogAsync(id, taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let dt = new TimeLog().FillByBackModel(backResult.Data);
                dispatch(UpdateTimeLogTempoActionCreator(dt));
            }
        };
    }

    UpdateTimeLogAsync = async (id: number, taskId: number, text: string, minutes: number
        , dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date): Promise<ServerResult<IWorkTimeLogDataBack>> => {
        let data = {
            "id": id,
            "taskId": taskId,
            "text": text,
            "minutes": minutes,
            "dayOfLog": new ControllerHelper().ToZeroDate(dayOfLog).toISOString(),
            "rangeEndOfLog": rangeEndOfLog ? new ControllerHelper().ToZeroDate(rangeEndOfLog).toISOString() : null,
            "rangeStartOfLog": rangeStartOfLog ? new ControllerHelper().ToZeroDate(rangeStartOfLog).toISOString() : null,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTimeLogDataBack>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiWorkTimeUrl}/update`,
            ContentType: 'body'

        });
        return backResult;
    }


    DeleteTimeTempoLogRedux = (timeId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            var backResult = await this.DeleteTimeLogAsync(timeId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteTimeLogTempoActionCreator(timeId));
            }
        };
    }

    DeleteTimeTaskLogRedux = (timeId: number, taskId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteTimeLogAsync(timeId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                let d = new DeleteTimeLogActionParam();
                d.Id = timeId;
                d.TaskId = taskId;
                dispatch(DeleteTimeLogActionCreator(d));
            }
        };
    }


    CopyTimeTempoLogRedux = (timeId: number) => {
        return async (dispatch: any, getState: any) => {
            let state = getState() as AppState;
            var oldTime = state.TaskManagementApp.TempoState.TimeLogs.find(x => x.Id == timeId);
            if (oldTime) {
                // let newTime = new TimeLog();
                // newTime.Copy(oldTime);
                this.preloader(true);
                const backResult = await this.CreateTimeLogAsync(oldTime.WorkTaskId!, oldTime.Comment!, oldTime.TimeMinutes!,
                    oldTime.DayOfLog!, oldTime.RangeEndOfLog!, oldTime.RangeStartOfLog!);
                this.preloader(false);
                if (backResult.Error) {
                    return;
                }

                if (backResult.Data?.Id) {
                    let dt = new TimeLog().FillByBackModel(backResult.Data);
                    dispatch(AddNewTimeLogTempoActionCreator(dt));
                }
            }

        };
    }

    DeleteTimeLogAsync = async (timeId: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "id": timeId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiWorkTimeUrl}/delete`

        });
        return backResult;
    }

    LoadTimeLogsForTaskRedux = (taskId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.LoadTimeLogsForTaskAsync(taskId);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                // console.log(data);
                let mapped = backResult.Data.map(x => new TimeLog().FillByBackModel(x));
                // console.log(mapped);
                dispatch(SetTaskTimeLogActionCreator({ TaskId: taskId, Time: mapped }));
            }
        };
    }

    LoadTimeLogsForTaskAsync = async (taskId: number): Promise<ServerResult<IWorkTimeLogDataBack[]>> => {
        let data = {
            "taskId": taskId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTimeLogDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiWorkTimeUrl}/task-time`

        });
        return backResult;
    }


    LoadTimeLogsForProjectRedux = (projectId: number, dateFrom: Date, dateTo: Date) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.LoadTimeLogsForProjectAsync(projectId, null!, dateFrom, dateTo);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let mapped = backResult.Data.map(x => new TimeLog().FillByBackModel(x));
                dispatch(SetProjectTimeLogDataActionCreator(mapped));
            }
        };
    }
    LoadTimeLogsForProjectAsync = async (projectId: number, userId: number, dateFrom: Date, dateTo: Date): Promise<ServerResult<IWorkTimeLogDataBack[]>> => {
        let data = {
            "id": projectId,
            "dateFrom": new ControllerHelper().ToZeroDate(dateFrom).toISOString(),
            "dateTo": new ControllerHelper().ToZeroDate(dateTo).toISOString(),
            "userId": userId || null
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTimeLogDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiWorkTimeUrl}/project-time`

        });
        return backResult;
    }

    LoadTimeLogsForUserRedux = (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.LoadTimeLogsForUserAsync(projectId, userId, dateFrom, dateTo);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let mapped = backResult.Data.map(x => new TimeLog().FillByBackModel(x));
                dispatch(SetUserTimeLogDataActionCreator(mapped));
            }
        };
    }

    LoadTimeLogsForUserTempoRedux = (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.LoadTimeLogsForUserAsync(projectId, userId, dateFrom, dateTo);
            this.preloader(false);
            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let mapped = backResult.Data.map(x => new TimeLog().FillByBackModel(x));
                dispatch(SetUserTempoTimeLogDataActionCreator(mapped));
            }
        };
    }

    LoadTimeLogsForUserAsync = async (projectId: number, userId: number, dateFrom: Date, dateTo: Date): Promise<ServerResult<IWorkTimeLogDataBack[]>> => {
        let data = {
            "projectId": projectId || null,
            "dateFrom": new ControllerHelper().ToZeroDate(dateFrom).toISOString(),
            "dateTo": new ControllerHelper().ToZeroDate(dateTo).toISOString(),
            "userId": userId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IWorkTimeLogDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiWorkTimeUrl}/user-time`

        });
        return backResult;
    }


    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }
}