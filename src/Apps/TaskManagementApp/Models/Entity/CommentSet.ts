import { OneWorkTaskComment } from "./OneTaskWorkComment";

export class CommentSet {
    Comments: OneWorkTaskComment[];
    TaskId: number;

    constructor() {
        this.Comments = [];
    }
}