
export class TasksFilter {
    CreatorId: number;
    ExecutorId: number;
    Status: number;
    Sprint: number;
    Label: number;
    TaskName: string;
    Page: number;
    Retrigger: number;

    constructor() {
        this.CreatorId = -1;
        this.ExecutorId = -1;
        this.Status = -1;
        this.TaskName = '';
        this.Page = 1;
        this.Retrigger = 0;
        this.Sprint = -1;
        this.Label = -1;
    }
}


