// import { IProjectTaskDataBack } from "../../../BackModel/CodeReviewApp/IProjectTaskDataBack";
// import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";

import { IOneTaskReviewCommentDataBack } from "../../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { IProjectTaskDataBack } from "../../../BackModel/CodeReviewApp/IProjectTaskDataBack";


export class OneTask {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    Status: number;
    Link: string;
    Comments: IOneTaskReviewCommentDataBack[];//todo

    constructor() {
        this.Comments = [];
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
