import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { Helper } from "../../../../Models/BL/Helper";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { AddNewTimeLogTaskActionName, ClearProjectTimeLogActionName, DeleteTimeLogActionName, DeleteTimeLogActionParam, SetProjectTimeLogDateFromActionName, SetProjectTimeLogDateToActionName, SetTaskTimeLogActionName, SetTaskTimeLogActionParam, SetProjectTimeLogDataActionName, UpdateTimeLogActionName, SetUserTimeLogDataActionName, ClearUserTimeLogActionName, SetUserTimeLogDateFromActionName, SetUserTimeLogDateToActionName, ClearUserTempoTimeLogActionName, SetUserTempoTimeLogDataActionName, SetUserTempoTimeLogDateFromActionName, SetUserTempoTimeLogDateToActionName, AddNewTimeLogTempoActionName, DeleteTimeLogTempoActionName, UpdateTimeLogTempoActionName } from "../Actions/TimeLogAction";
import { TimeLog } from "../Entity/State/TimeLog";
import { ProjectTimes } from "../Entity/State/ProjectTimes";


export function TaskManagementWorkTimeLogReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case AddNewTimeLogTaskActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog;
                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.WorkTaskId)
                    task.TimeLogs.push(new TimeLog().Copy(payload));
                // let tasks = helper.GetTaskFromState(newState, payload.WorkTaskId);
                // tasks.forEach(tsk => {
                //     tsk.TimeLogs.push(new TimeLog().Copy(payload));
                // });
                return newState;
            }

        case AddNewTimeLogTempoActionName:
            {
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog;
                newState.TaskManagementApp.TempoState.TimeLogs.push(payload);
                return newState;
            }

        case UpdateTimeLogTempoActionName:
            {

                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog;
                var log = newState.TaskManagementApp.TempoState.TimeLogs.find(x => x.Id === payload.Id);
                if (log) {
                    log.Copy(payload);
                }
                return newState;
            }

        case DeleteTimeLogTempoActionName:
            {
                let newState = cloneDeep(state);
                let helper = new Helper();
                let payload = action.payload as number;
                let index = helper.GetIndexById(newState.TaskManagementApp.TempoState.TimeLogs, payload);
                if (index >= 0) {
                    newState.TaskManagementApp.TempoState.TimeLogs.splice(index, 1);
                }

                return newState;
            }

        case DeleteTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as DeleteTimeLogActionParam;
                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.TaskId) {

                    let index = helper.GetIndexById(task.TimeLogs, payload.Id);
                    if (index >= 0) {
                        task.TimeLogs.splice(index, 1);
                    }
                }
         
                return newState;
            }

        case UpdateTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog;
                let task = newState.TaskManagementApp.CurrentTask;

                if (task?.Id == payload.Id) {
                    let el = helper.GetElemById(task.TimeLogs, payload.Id);
                    if (el) {
                        el.Copy(payload);
                    }
                }

           
                return newState;
            }

        case SetTaskTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as SetTaskTimeLogActionParam;
                let task = newState.TaskManagementApp.CurrentTask;

                if (task?.Id == payload.TaskId) {
                    task.TimeLogs = [...payload.Time].map(x => new TimeLog().Copy(x));
                }
              
                return newState;
            }
        case SetProjectTimeLogDataActionName:
            {
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog[];
                newState.TaskManagementApp.CurrentProjectTimes.TimeLogs = payload;

                return newState;
            }
        case SetProjectTimeLogDateFromActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Date;

                newState.TaskManagementApp.CurrentProjectTimes.DateFrom = payload;
                return newState;
            }

        case SetProjectTimeLogDateToActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Date;

                newState.TaskManagementApp.CurrentProjectTimes.DateTo = payload;
                return newState;
            }

        case ClearProjectTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);
                newState.TaskManagementApp.CurrentProjectTimes = new ProjectTimes();

                return newState;
            }

        case SetUserTimeLogDataActionName:
            {
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog[];
                newState.TaskManagementApp.PersonTimes.TimeLogs = payload;

                return newState;
            }
        case SetUserTimeLogDateFromActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Date;

                newState.TaskManagementApp.PersonTimes.DateFrom = payload;
                return newState;
            }

        case SetUserTimeLogDateToActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Date;

                newState.TaskManagementApp.PersonTimes.DateTo = payload;
                return newState;
            }

        case ClearUserTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);
                newState.TaskManagementApp.PersonTimes = new ProjectTimes();

                return newState;
            }


        case SetUserTempoTimeLogDataActionName:
            {
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog[];
                newState.TaskManagementApp.TempoState.TimeLogs = payload;

                return newState;
            }
        case SetUserTempoTimeLogDateFromActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Date;

                newState.TaskManagementApp.TempoState.DateFrom = payload;
                return newState;
            }

        case SetUserTempoTimeLogDateToActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Date;

                newState.TaskManagementApp.TempoState.DateTo = payload;
                return newState;
            }

        case ClearUserTempoTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);
                newState.TaskManagementApp.TempoState = new ProjectTimes();

                return newState;
            }





        default:
            return state;
    }
    return state;
}
