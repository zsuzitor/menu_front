
import { IProjectTaskDataBack } from "../../BackModels/IProjectTaskDataBack";
import { ProjectTaskData } from "../LoadReviewTasksResult";
import { OneTaskReviewComment } from "../OneTaskReviewComment";


export class OneTask {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    StatusId: number;
    CreateDate: string;
    LastUpdateDate: string;

    Description: string;
    Comments: OneTaskReviewComment[];

    constructor() {
        this.Comments = [];
    }

    FillByProjectTaskData(data: ProjectTaskData): OneTask {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ReviewerId = data.ReviewerId;
        this.StatusId = data.StatusId;
        this.CreateDate = data.CreateDate;
        this.LastUpdateDate = data.LastUpdateDate;
        this.Description = data.Description;
        this.Comments = data.Comments
            .map(x => new OneTaskReviewComment().FillByOneTaskReviewComment(x));
        return this;
    }


    FillByIProjectTaskDataBack(data: IProjectTaskDataBack): OneTask {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ReviewerId = data.ReviewerId;
        this.StatusId = data.StatusId;
        this.CreateDate = data.CreateDate;
        this.LastUpdateDate = data.LastUpdateDate;
        this.Description = data.Description;
        this.Comments = data.Comments.
            map(x => new OneTaskReviewComment().FillByBackModel(x));

        return this;
    }
}
