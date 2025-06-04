import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { Helper } from "../../../../Models/BL/Helper";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { AddNewTimeLogActionName, DeleteTimeLogActionName, DeleteTimeLogActionParam, SetTaskTimeLogActionName, SetTaskTimeLogActionParam, SetTimeLogDataActionName, UpdateTimeLogActionName } from "../Actions/TimeLogAction";
import { IWorkTimeLogDataBack } from "../BackModels/IWorkTimeLogDataBack";
import { TimeLog } from "../Entity/State/TimeLog";


export function WorkTimeLogReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case AddNewTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog;
                let tasks = helper.GetTaskFromState(newState, payload.WorkTaskId);
                tasks.forEach(tsk => {
                    tsk.TimeLogs.push(new TimeLog().Copy(payload));
                });
                return newState;
            }

        case DeleteTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as DeleteTimeLogActionParam;
                let tasks = helper.GetTaskFromState(newState, payload.TaskId);


                tasks.forEach(tsk => {
                    let index = helper.GetIndexById(tsk.TimeLogs, payload.Id);
                    if (index >= 0) {
                        tsk.TimeLogs.splice(index, 1);
                    }

                });
                return newState;
            }

        case UpdateTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as TimeLog;
                let tasks = helper.GetTaskFromState(newState, payload.WorkTaskId);
                tasks.forEach(tsk => {
                    let el = helper.GetElemById(tsk.TimeLogs, payload.Id);
                    if (el) {
                        el.Copy(payload);
                    }
                });
                return newState;
            }

        case SetTaskTimeLogActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);

                let payload = action.payload as SetTaskTimeLogActionParam;
                let tasks = helper.GetTaskFromState(newState, payload.TaskId);
                tasks.forEach(tsk => {
                    tsk.TimeLogs = [...payload.Time].map(x => new TimeLog().Copy(x));
                });
                return newState;
            }
            case SetTimeLogDataActionName:
                {
                    let helper = new Helper();
                    let newState = cloneDeep(state);
    
                    let payload = action.payload as TimeLog[];
                    alert("todo asdjalksdjlkasdj");
                    // let tasks = helper.GetTaskFromState(newState, payload.TaskId);
                    // tasks.forEach(tsk => {
                    //     tsk.TimeLogs = [...payload.Time].map(x => new TimeLog().Copy(x));
                    // });
                    return newState;
                }

            

        default:
            return state;
    }
    return state;
}
