import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";

export class CommentAdd {
    Id: number;
    CreatorId: number;
    Text: string;
    CreateDate: string;
    TaskId: number;

    constructor(bk: IOneTaskReviewCommentDataBack, taskId: number) {
        this.Id = bk.Id;
        this.CreatorId = bk.CreatorId;
        this.Text = bk.Text;
        this.CreateDate = bk.CreateDate;
        this.TaskId = taskId;
    }
}