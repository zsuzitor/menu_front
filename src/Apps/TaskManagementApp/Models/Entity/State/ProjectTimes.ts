import { TimeLog } from "./TimeLog";

export class ProjectTimes {
    DateFrom: Date;
    DateTo: Date;

    TimeLogs: TimeLog[];

    constructor() {
        this.DateFrom = new Date();
        this.DateFrom.setHours(0, 0, 0, 0);
        this.DateTo = new Date();
        this.DateTo.setHours(0, 0, 0, 0);
        this.TimeLogs = [];

    }
}
