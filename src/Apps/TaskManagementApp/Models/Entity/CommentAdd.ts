import { IOneWorkTaskCommentDataBack } from "../BackModels/IOneWorkTaskCommentDataBack";

export class CommentAdd {
    Id: number;
    CreatorId: number;
    Text: string;
    CreateDate: string;
    TaskId: number;

    constructor(bk: IOneWorkTaskCommentDataBack, taskId: number) {
        this.Id = bk.Id;
        this.CreatorId = bk.CreatorId;
        this.Text = bk.Text;
        this.CreateDate = bk.CreateDate;
        this.TaskId = taskId;
    }
}