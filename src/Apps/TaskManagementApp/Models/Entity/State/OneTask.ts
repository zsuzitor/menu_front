
import { IProjectTaskDataBack } from "../../BackModels/IProjectTaskDataBack";
import { ProjectTaskData } from "../LoadWorkTasksResult";
import { OneWorkTaskComment } from "../OneTaskWorkComment";


export class OneTask {
    Id: number;
    Name: string;
    CreatorId: number;
    ExecutorId?: number;
    StatusId: number;
    CreateDate: string;
    LastUpdateDate: string;

    Description: string;
    Comments: OneWorkTaskComment[];

    constructor() {
        this.Comments = [];
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

        return this;
    }
}
