import { AppAction } from "../Actions/Actions";
import { AppState } from "../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { CodeReviewProjectReducer } from "./CodeReviewApp/ProjectReducer";
import { CodeReviewUserReducer } from "./CodeReviewApp/UserReducer";
import { CodeReviewCommentReducer } from "./CodeReviewApp/CommentReducer";
import { CodeReviewTaskReducer } from "./CodeReviewApp/TaskReducer";

export function AppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    let st = CodeReviewProjectReducer(state, action);
    st = CodeReviewUserReducer(st, action);
    st = CodeReviewCommentReducer(st, action);
    st = CodeReviewTaskReducer(st, action);


    //...
    return st;
    switch (action.type) {

        case "test":
            let str = action.payload as string;
            return Object.assign({}, state, { TestMessage: str });
        default:
            return state;
    }
}