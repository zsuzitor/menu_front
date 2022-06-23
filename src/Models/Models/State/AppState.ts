import { CodeReviewAppState } from "../CodeReviewApp/State/CodeReviewAppState";


export class AppState {
    CodeReviewApp: CodeReviewAppState;


    constructor() {
        this.CodeReviewApp = new CodeReviewAppState();
    }
}