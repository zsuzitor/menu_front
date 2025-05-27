import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { UpdateCommentActionName, DeleteCommentActionName, AddCommentActionName, SetCommentsActionName } from "../Actions/CommentActions";
import { CommentAdd } from "../Entity/CommentAdd";
import { CommentDelete } from "../Entity/CommentDelete";
import { CommentSet } from "../Entity/CommentSet";
import { CommentUpdate } from "../Entity/CommentUpdate";
import { OneTaskReviewComment } from "../Entity/OneTaskReviewComment";


const GetTaskForCommentFromState = (state: AppState, taskId: number) => {
    // console.log(state);
    // console.log(taskId);
    let taskfromProject = state.CodeReviewApp.CurrentProjectTasks.find(x => x.Id === taskId);
    if (taskfromProject) {
        return taskfromProject;
    }

    if (state.CodeReviewApp.CurrentTask.Id == taskId) {
        return state.CodeReviewApp.CurrentTask;
    }

    return null;
}

export function CodeReviewCommentReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case UpdateCommentActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentUpdate;
                let task = GetTaskForCommentFromState(newState, payload.TaskId);

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
                let task = GetTaskForCommentFromState(newState, payload.TaskId);
                if (task) {
                    task.Comments = task.Comments.filter(x => x.Id !== payload.Id);
                    return newState;
                }


                return newState;
            }
        case AddCommentActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentAdd;


                let comment = new OneTaskReviewComment();
                comment.Id = payload.Id;
                comment.Text = payload.Text;
                comment.CreateDate = payload.CreateDate;
                comment.CreatorId = payload.CreatorId;

                let task = GetTaskForCommentFromState(newState, payload.TaskId);
                if (task) {
                    task.Comments.push(comment);
                    return newState;
                }

                return newState;
            }
        case SetCommentsActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as CommentSet;
                let task = GetTaskForCommentFromState(newState, payload.TaskId);
                if (task) {
                    task.Comments = payload.Comments
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