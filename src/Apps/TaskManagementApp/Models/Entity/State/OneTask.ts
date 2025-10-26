
import { IProjectTaskDataBack } from "../../BackModels/IProjectTaskDataBack";
import { OneWorkTaskComment } from "../OneTaskWorkComment";
import { TaskRelation } from "./TaskRelation";
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
    Relations: TaskRelation[];
    TimeLogs: TimeLog[];

    constructor() {
        this.Comments = [];
        this.TimeLogs = [];
        this.SprintId = [];
        this.LabelId = [];
    }

    // FillByProjectTaskData(data: ProjectTaskData): OneTask {
    //     this.Id = data.Id;
    //     this.Name = data.Name;
    //     this.CreatorId = data.CreatorId;
    //     this.ExecutorId = data.ExecutorId;
    //     this.StatusId = data.StatusId;
    //     this.CreateDate = data.CreateDate;
    //     this.LastUpdateDate = data.LastUpdateDate;
    //     this.Description = data.Description;
    //     this.Comments = data.Comments
    //         .map(x => new OneWorkTaskComment().FillByOneWorkTaskComment(x));
    //     this.SprintId = data.SprintId;
    //     this.LabelId = data.LabelId;
    //     this.Relations = data.Relations;
    //     return this;
    // }


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
        this.Relations = data.Relations.
            map(x => new TaskRelation().FillByDataBack(x));

        return this;
    }
}
