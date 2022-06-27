import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { AddCommentActionName, DeleteCommentActionName, LoadCommentsActionName, SetEmptyTaskCommentsActionName, UpdateCommentActionName } from "../../Actions/CodeReviewApp/CommentActions";


export function CodeReviewCommentReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case UpdateCommentActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case DeleteCommentActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case AddCommentActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case LoadCommentsActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case SetEmptyTaskCommentsActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }

        default:
            return state;
    }
}