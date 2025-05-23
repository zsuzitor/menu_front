import { ITaskReviewStatusDataBack } from "./ITaskReviewStatusDataBack";

export interface IProjectTaskDataBack {
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    // Status: ITaskReviewStatusDataBack;
    StatusId: number;
    Link: string;
}
