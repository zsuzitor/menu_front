import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { TaskUpdate } from "../../Models/CodeReviewApp/TaskUpdate";
import { AppAction } from "../Actions";



export const UpdateCommentActionName: string = 'UpdateCommentAction';
export function UpdateCommentActionCreator(data: TaskUpdate): AppAction<TaskUpdate> {
    return { type: UpdateCommentActionName, payload: data };
};

export const DeleteCommentActionName: string = 'DeleteCommentAction';
export function DeleteCommentActionCreator(id: number): AppAction<number> {
    return { type: DeleteCommentActionName, payload: id };
};


export const AddCommentActionName: string = 'AddCommentAction';
export function AddCommentActionCreator(data: IOneTaskReviewCommentDataBack): AppAction<IOneTaskReviewCommentDataBack> {
    return { type: AddCommentActionName, payload: data };
};

export const LoadCommentsActionName: string = 'LoadCommentsAction';
export function LoadCommentsActionCreator(data: IOneTaskReviewCommentDataBack[]): AppAction<IOneTaskReviewCommentDataBack[]> {
    return { type: LoadCommentsActionName, payload: data };
};

export const SetEmptyTaskCommentsActionName: string = 'SetEmptyTaskCommentsAction';
export function SetEmptyTaskCommentsActionCreator(taskId: number): AppAction<number> {
    return { type: SetEmptyTaskCommentsActionName, payload: taskId };
};

