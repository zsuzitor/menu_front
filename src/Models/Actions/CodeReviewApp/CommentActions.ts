import { CommentAdd } from "../../Models/CodeReviewApp/CommentAdd";
import { CommentDelete } from "../../Models/CodeReviewApp/CommentDelete";
import { CommentSet } from "../../Models/CodeReviewApp/CommentSet";
import { CommentUpdate } from "../../Models/CodeReviewApp/CommentUpdate";
import { AppAction } from "../Actions";



export const UpdateCommentActionName: string = 'UpdateCommentAction';
export function UpdateCommentActionCreator(data: CommentUpdate): AppAction<CommentUpdate> {
    return { type: UpdateCommentActionName, payload: data };
};

export const DeleteCommentActionName: string = 'DeleteCommentAction';
export function DeleteCommentActionCreator(data: CommentDelete): AppAction<CommentDelete> {
    return { type: DeleteCommentActionName, payload: data };
};


export const AddCommentActionName: string = 'AddCommentAction';
export function AddCommentActionCreator(data: CommentAdd): AppAction<CommentAdd> {
    return { type: AddCommentActionName, payload: data };
};

export const SetCommentsActionName: string = 'LoadCommentsAction';
export function SetCommentsActionCreator(data: CommentSet): AppAction<CommentSet> {
    return { type: SetCommentsActionName, payload: data };
};

// export const SetEmptyTaskCommentsActionName: string = 'SetEmptyTaskCommentsAction';
// export function SetEmptyTaskCommentsActionCreator(taskId: number): AppAction<number> {
//     return { type: SetEmptyTaskCommentsActionName, payload: taskId };
// };

