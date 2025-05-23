
import cloneDeep from 'lodash/cloneDeep';
import { CodeReviewProjectReducer } from './ProjectReducer';
import { CodeReviewTaskReducer } from './TaskReducer';
import { CodeReviewUserReducer } from './UserReducer';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ClearCodeReviewStateActionName } from '../Actions/Actions';
import { CodeReviewAppState } from '../Entity/State/CodeReviewAppState';
import { CodeReviewCommentReducer } from './CommentReducer';
import { CodeReviewTaskStatusReducer } from './TaskStatusReducer';



export function CodeReviewAppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = CodeReviewProjectReducer(state, action);

    st = CodeReviewUserReducer(st, action);
    st = CodeReviewCommentReducer(st, action);
    st = CodeReviewTaskReducer(st, action);
    st = CodeReviewTaskStatusReducer(st, action);

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