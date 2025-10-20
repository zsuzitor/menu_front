import { IOneWorkTaskCommentDataBack } from "./IOneWorkTaskCommentDataBack";

export interface IProjectTaskDataBack {
    Id: number;
    Name: string;
    CreatorId: number;
    ExecutorId?: number;
    CreateDate: string;
    LastUpdateDate: string;
    StatusId: number;
    Description: string;
    Comments: IOneWorkTaskCommentDataBack[];
    SprintId: number[];
    LabelsId: number[];

}
