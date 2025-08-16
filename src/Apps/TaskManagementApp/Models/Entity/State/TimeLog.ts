import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IWorkTimeLogDataBack } from "../../BackModels/IWorkTimeLogDataBack";

export class TimeLog implements MappedWithBack<IWorkTimeLogDataBack> {
    Id: number;
    Comment: string;
    TimeMinutes: number;
    DayOfLog: Date;
    RangeStartOfLog?: Date;
    RangeEndOfLog?: Date;
    CreationTime: Date;
    WorkTaskId: number;
    ProjectUserId: number;

    constructor() {

    }


    FillByBackModel(newData: IWorkTimeLogDataBack): TimeLog {
        this.Id = newData.Id;
        this.Comment = newData.Comment;
        this.TimeMinutes = newData.TimeMinutes;
        this.DayOfLog = new Date(newData.DayOfLog);
        this.RangeEndOfLog = newData.RangeEndOfLog ? new Date(newData.RangeEndOfLog) : null;
        this.RangeStartOfLog = newData.RangeStartOfLog ? new Date(newData.RangeStartOfLog) : null;
        this.CreationTime = new Date(newData.CreationTime);
        this.WorkTaskId = newData.WorkTaskId;
        this.ProjectUserId = newData.ProjectUserId;
        return this;
    }

    Copy(newData: TimeLog): TimeLog {

        this.Id = newData.Id;
        this.Comment = newData.Comment;
        this.TimeMinutes = newData.TimeMinutes;
        this.DayOfLog = newData.DayOfLog;
        this.CreationTime = newData.CreationTime;
        this.WorkTaskId = newData.WorkTaskId;
        this.ProjectUserId = newData.ProjectUserId;
        this.RangeEndOfLog = newData.RangeEndOfLog;
        this.RangeStartOfLog = newData.RangeStartOfLog;
        return this;
    }
}


