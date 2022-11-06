
export class TasksFilter {
    CreatorId: number;
    ReviewerId: number;
    Status: number;
    TaskName: string;
    Page: number;
    Retrigger: number;

    constructor() {
        this.CreatorId = -1;
        this.ReviewerId = -1;
        this.Status = -1;
        this.TaskName = '';
        this.Page = 1;
        this.Retrigger = 0;
    }
}


