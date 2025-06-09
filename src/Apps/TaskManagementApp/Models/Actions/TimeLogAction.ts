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


export const SetProjectTimeLogDataActionName: string = 'SetProjectTimeLogDataAction';
export function SetProjectTimeLogDataActionCreator(data: TimeLog[]): AppAction<TimeLog[]> {
    return { type: SetProjectTimeLogDataActionName, payload: data };
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




export const SetUserTimeLogDataActionName: string = 'SetUserTimeLogDataAction';
export function SetUserTimeLogDataActionCreator(data: TimeLog[]): AppAction<TimeLog[]> {
    return { type: SetUserTimeLogDataActionName, payload: data };
};


export const SetUserTimeLogDateFromActionName: string = 'SetUserTimeLogDateFromAction';
export function SetUserTimeLogDateFromActionCreator(date: Date): AppAction<Date> {
    return { type: SetUserTimeLogDateFromActionName, payload: date };
};

export const SetUserTimeLogDateToActionName: string = 'SetUserTimeLogDateToAction';
export function SetUserTimeLogDateToActionCreator(date: Date): AppAction<Date> {
    return { type: SetUserTimeLogDateToActionName, payload: date };
};

export const ClearUserTimeLogActionName: string = 'ClearUserTimeLogAction';
export function ClearUserTimeLogActionCreator(): AppAction<null> {
    return { type: ClearUserTimeLogActionName, payload: null };
};