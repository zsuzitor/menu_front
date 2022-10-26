
import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../Actions/Actions';
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