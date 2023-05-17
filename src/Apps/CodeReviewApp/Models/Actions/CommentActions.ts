import { AppAction } from "../../../../Models/Actions/Actions";
import { CommentAdd } from "../Entity/CommentAdd";
import { CommentDelete } from "../Entity/CommentDelete";
import { CommentSet } from "../Entity/CommentSet";
import { CommentUpdate } from "../Entity/CommentUpdate";



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


