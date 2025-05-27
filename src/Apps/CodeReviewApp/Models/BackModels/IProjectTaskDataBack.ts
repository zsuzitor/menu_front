import { IOneTaskReviewCommentDataBack } from "./IOneTaskReviewCommentDataBack";

export interface IProjectTaskDataBack {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    // Status: ITaskReviewStatusDataBack;
    CreateDate: string;
    LastUpdateDate: string;
    StatusId: number;
    Description: string;
    Comments: IOneTaskReviewCommentDataBack[];

}
