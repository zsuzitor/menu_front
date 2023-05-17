import { OneTaskReviewComment } from "./OneTaskReviewComment";

export class CommentSet {
    Comments: OneTaskReviewComment[];
    TaskId: number;

    constructor() {
        this.Comments = [];
    }
}