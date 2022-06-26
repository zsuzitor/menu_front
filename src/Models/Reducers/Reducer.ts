import { AppAction } from "../Actions/Actions";
import { AppState } from "../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { CodeReviewProjectReducer } from "./CodeReviewApp/ProjectReducer";
import { CodeReviewUserReducer } from "./CodeReviewApp/UserReducer";

export function AppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    let st = CodeReviewProjectReducer(state, action);
    CodeReviewUserReducer(st, action);

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