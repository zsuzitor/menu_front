import { AppAction } from "../Actions/Actions";
import { AppState } from "../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { CodeReviewProjectReducer } from "./CodeReviewApp/ProjectReducer";
import { CodeReviewUserReducer } from "./CodeReviewApp/UserReducer";
import { CodeReviewCommentReducer } from "./CodeReviewApp/CommentReducer";
import { CodeReviewTaskReducer } from "./CodeReviewApp/TaskReducer";
import { PlaningPokerReducer } from "./PlaningPokerApp/Reducer";
import { AppReducer } from "./Reducer";

export function ReducerCombiner(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = AppReducer(state, action);

    st = CodeReviewProjectReducer(st, action);
    st = CodeReviewUserReducer(st, action);
    st = CodeReviewCommentReducer(st, action);
    st = CodeReviewTaskReducer(st, action);

    st = PlaningPokerReducer(st, action);



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