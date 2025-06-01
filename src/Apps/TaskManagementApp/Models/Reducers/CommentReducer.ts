import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { UpdateCommentActionName, DeleteCommentActionName, AddCommentActionName, SetCommentsActionName } from "../Actions/CommentActions";
import { CommentAdd } from "../Entity/CommentAdd";
import { CommentDelete } from "../Entity/CommentDelete";
import { CommentSet } from "../Entity/CommentSet";
import { CommentUpdate } from "../Entity/CommentUpdate";
import { OneWorkTaskComment } from "../Entity/OneTaskWorkComment";
import { OneTask } from "../Entity/State/OneTask";
import { Helper } from "../../../../Models/BL/Helper";




export function CodeReviewCommentReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case UpdateCommentActionName:
            {

                let helper = new Helper();
                let newState = cloneDeep(state);
                let payload = action.payload as CommentUpdate;
                let task = helper.GetTaskFromState(newState, payload.TaskId);

                if (task.length == 0) {
                    return newState;
                }

                task.forEach(tsk => {
                    var comm = tsk.Comments.find(x => x.Id === payload.Id);
                    if (!comm) {
                        return newState;
                    }

                    comm.Text = payload.Text;
                });

                return newState;
            }
        case DeleteCommentActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);
                let payload = action.payload as CommentDelete;
                let task = helper.GetTaskFromState(newState, payload.TaskId);
                if (task.length > 0) {
                    task.forEach(tsk => {
                        tsk.Comments = tsk.Comments.filter(x => x.Id !== payload.Id);
                    });
                    return newState;
                }


                return newState;
            }
        case AddCommentActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);
                let payload = action.payload as CommentAdd;

                let comment = new OneWorkTaskComment();
                comment.Id = payload.Id;
                comment.Text = payload.Text;
                comment.CreateDate = payload.CreateDate;
                comment.CreatorId = payload.CreatorId;

                let task = helper.GetTaskFromState(newState, payload.TaskId);
                if (task.length > 0) {
                    task.forEach(tsk => {
                        tsk.Comments.push(comment);
                    });
                    return newState;
                }

                return newState;
            }
        case SetCommentsActionName:
            {
                let helper = new Helper();
                let newState = cloneDeep(state);
                let payload = action.payload as CommentSet;
                let task = helper.GetTaskFromState(newState, payload.TaskId);
                if (task.length > 0) {
                    task.forEach(tsk => {
                        tsk.Comments = payload.Comments
                    });
                    return newState;
                }

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

    return state;
}