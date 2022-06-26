// import { IProjectTaskDataBack } from "../../../BackModel/CodeReviewApp/IProjectTaskDataBack";
// import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";

import { IOneTaskReviewCommentDataBack } from "../../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";


export class OneTask {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    Status: number;
    Comments: IOneTaskReviewCommentDataBack[];//todo

    constructor() {
        this.Comments = [];
    }
}
