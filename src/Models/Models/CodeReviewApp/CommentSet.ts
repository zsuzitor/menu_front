import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";

export class CommentSet {
    Comments: IOneTaskReviewCommentDataBack[];
    TaskId: number;

    constructor() {
        this.Comments = [];
    }
}