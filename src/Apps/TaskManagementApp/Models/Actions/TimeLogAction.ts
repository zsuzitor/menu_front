import { AppAction } from "../../../../Models/Actions/Actions";
import { TimeLog } from "../Entity/State/TimeLog";


export const AddNewTimeLogActionName: string = 'AddNewTimeLogAction';
export function AddNewTimeLogActionCreator(time: TimeLog): AppAction<TimeLog> {
    return { type: AddNewTimeLogActionName, payload: time };
};

export const UpdateTimeLogActionName: string = 'UpdateTimeLogLogAction';
export function UpdateTimeLogActionCreator(time: TimeLog): AppAction<TimeLog> {
    return { type: UpdateTimeLogActionName, payload: time };
};


export class SetTaskTimeLogActionParam {
    TaskId: number;
    Time: TimeLog[];
}
export const SetTaskTimeLogActionName: string = 'SetTaskTimeLogAction';
export function SetTaskTimeLogActionCreator(time: SetTaskTimeLogActionParam): AppAction<SetTaskTimeLogActionParam> {
    return { type: SetTaskTimeLogActionName, payload: time };
};


export class DeleteTimeLogActionParam {
    TaskId: number;
    Id: number;
}
export const DeleteTimeLogActionName: string = 'DeleteTimeLogAction';
export function DeleteTimeLogActionCreator(data: DeleteTimeLogActionParam): AppAction<DeleteTimeLogActionParam> {
    return { type: DeleteTimeLogActionName, payload: data };
};


export const SetTimeLogDataActionName: string = 'SetTimeLogDataAction';
export function SetTimeLogDataActionCreator(data: TimeLog[]): AppAction<TimeLog[]> {
    return { type: SetTimeLogDataActionName, payload: data };
};


export const SetProjectTimeLogDateFromActionName: string = 'SetProjectTimeLogDateFromAction';
export function SetProjectTimeLogDateFromActionCreator(date: Date): AppAction<Date> {
    return { type: SetProjectTimeLogDateFromActionName, payload: date };
};

export const SetProjectTimeLogDateToActionName: string = 'SetProjectTimeLogDateToAction';
export function SetProjectTimeLogDateToActionCreator(date: Date): AppAction<Date> {
    return { type: SetProjectTimeLogDateToActionName, payload: date };
};

export const ClearProjectTimeLogActionName: string = 'ClearProjectTimeLogAction';
export function ClearProjectTimeLogActionCreator(): AppAction<null> {
    return { type: ClearProjectTimeLogActionName, payload: null };
};
