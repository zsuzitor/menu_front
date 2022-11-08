
import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../Actions/Actions';
import { ClearCodeReviewStateActionName } from '../../Actions/CodeReviewApp/Actions';
import { CodeReviewAppState } from '../../Models/CodeReviewApp/State/CodeReviewAppState';
import { AppState } from '../../Models/State/AppState';
import { CodeReviewCommentReducer } from './CommentReducer';
import { CodeReviewProjectReducer } from './ProjectReducer';
import { CodeReviewTaskReducer } from './TaskReducer';
import { CodeReviewUserReducer } from './UserReducer';



export function CodeReviewAppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = CodeReviewProjectReducer(state, action);

    st = CodeReviewUserReducer(st, action);
    st = CodeReviewCommentReducer(st, action);
    st = CodeReviewTaskReducer(st, action);

    switch (action.type) {
        case ClearCodeReviewStateActionName:
            {
                let newState = cloneDeep(st);
                newState.CodeReviewApp = new CodeReviewAppState();
                return newState;
            }
    }


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