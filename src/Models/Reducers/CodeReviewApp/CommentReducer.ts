import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { AddCommentActionName, DeleteCommentActionName, SetCommentsActionName, UpdateCommentActionName } from "../../Actions/CodeReviewApp/CommentActions";
import { CommentUpdate } from "../../Models/CodeReviewApp/CommentUpdate";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { CommentDelete } from "../../Models/CodeReviewApp/CommentDelete";
import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { CommentAdd } from "../../Models/CodeReviewApp/CommentAdd";
import { CommentSet } from "../../Models/CodeReviewApp/CommentSet";


export function CodeReviewCommentReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case UpdateCommentActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentUpdate;
                let task = newState.CodeReviewApp.CurrentProjectTasks.find(x => x.Id === payload.TaskId);
                if (!task) {
                    return newState;
                }

                var comm = task.Comments.find(x => x.Id === payload.Id);
                if (!comm) {
                    return newState;
                }

                comm.Text = payload.Text;
                return newState;
            }
        case DeleteCommentActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentDelete;
                let task = newState.CodeReviewApp.CurrentProjectTasks.find(x => x.Id === payload.TaskId);
                if (!task) {
                    return newState;
                }

                task.Comments = task.Comments.filter(x => x.Id !== payload.Id);

                return newState;
            }
        case AddCommentActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentAdd;

                let task = newState.CodeReviewApp.CurrentProjectTasks.find(x => x.Id === payload.TaskId);
                if (!task) {
                    return newState;
                }

                task.Comments.push(payload);

                return newState;
            }
        case SetCommentsActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentSet;
                let task = newState.CodeReviewApp.CurrentProjectTasks.find(x => x.Id === payload.TaskId);
                if (!task) {
                    return newState;
                }

                task.Comments = payload.Comments

                return newState;
            }
        // case SetEmptyTaskCommentsActionName:
        //     {
        //         let newState = cloneDeep(state);

        //         return newState;
        //     }

        default:
            return state;
    }
}