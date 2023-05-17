
import { IProjectTaskDataBack } from "../../BackModels/IProjectTaskDataBack";
import { ProjectTaskData } from "../LoadReviewTasksResult";
import { OneTaskReviewComment } from "../OneTaskReviewComment";


export class OneTask {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    Status: number;
    Link: string;
    Comments: OneTaskReviewComment[];

    constructor() {
        this.Comments = [];
    }

    FillByProjectTaskData(data: ProjectTaskData) {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ReviewerId = data.ReviewerId;
        this.Status = data.Status;
        this.Link = data.Link;
    }
    

    FillByIProjectTaskDataBack(data: IProjectTaskDataBack) {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ReviewerId = data.ReviewerId;
        this.Status = data.Status;
        this.Link = data.Link;
    }
}
