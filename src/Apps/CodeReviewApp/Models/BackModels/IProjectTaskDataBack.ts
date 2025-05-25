import { IOneTaskReviewCommentDataBack } from "./IOneTaskReviewCommentDataBack";

export interface IProjectTaskDataBack {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    // Status: ITaskReviewStatusDataBack;
    StatusId: number;
    Link: string;
    Description: string;
    Comments: IOneTaskReviewCommentDataBack[];

}
