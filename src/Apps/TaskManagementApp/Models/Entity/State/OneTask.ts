
import { IProjectTaskDataBack } from "../../BackModels/IProjectTaskDataBack";
import { ProjectTaskData } from "../LoadWorkTasksResult";
import { OneWorkTaskComment } from "../OneTaskWorkComment";
import { TimeLog } from "./TimeLog";


export class OneTask {
    Id: number;
    Name: string;
    CreatorId: number;
    ExecutorId?: number;
    StatusId: number;
    CreateDate: string;
    LastUpdateDate: string;
    SprintId: number[];
    LabelId: number[];

    Description: string;
    Comments: OneWorkTaskComment[];
    TimeLogs: TimeLog[];

    constructor() {
        this.Comments = [];
        this.TimeLogs = [];
        this.SprintId = [];
        this.LabelId = [];
    }

    FillByProjectTaskData(data: ProjectTaskData): OneTask {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ExecutorId = data.ExecutorId;
        this.StatusId = data.StatusId;
        this.CreateDate = data.CreateDate;
        this.LastUpdateDate = data.LastUpdateDate;
        this.Description = data.Description;
        this.Comments = data.Comments
            .map(x => new OneWorkTaskComment().FillByOneWorkTaskComment(x));
        this.SprintId = data.SprintId;
        this.LabelId = data.LabelId;
        return this;
    }


    FillByIProjectTaskDataBack(data: IProjectTaskDataBack): OneTask {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ExecutorId = data.ExecutorId;
        this.StatusId = data.StatusId;
        this.CreateDate = data.CreateDate;
        this.LastUpdateDate = data.LastUpdateDate;
        this.Description = data.Description;
        this.Comments = data.Comments.
            map(x => new OneWorkTaskComment().FillByBackModel(x));
        this.SprintId = data.SprintId;
        this.LabelId = data.LabelsId;

        return this;
    }
}
