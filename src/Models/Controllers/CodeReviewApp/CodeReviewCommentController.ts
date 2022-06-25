import { AddCommentActionCreator, DeleteCommentActionCreator, LoadCommentsActionCreator, UpdateCommentActionCreator } from "../../Actions/CodeReviewApp/CommentActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { TaskUpdate } from "../../Models/CodeReviewApp/TaskUpdate";



export type LoadComments = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack[]) => void;
export type AddComment = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack) => void;
export type DeleteComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type UpdateComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewCommentController {
    LoadCommentsRedux: (id: number) => void;
    AddCommentRedux: (taskId: number, text: string) => void;
    DeleteCommentRedux: (id: number) => void;
    UpdateCommentRedux: (comment: TaskUpdate) => void;
}



export class CodeReviewCommentController implements ICodeReviewCommentController {


    UpdateCommentRedux = (comment: TaskUpdate) => {
        return (dispatch: any, getState: any) => {
            this.UpdateComment(comment.Id, comment.Text, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(UpdateCommentActionCreator(comment));
                }
            });
        };
    }

    UpdateComment = (id: number, text: string, onSuccess: UpdateComment) => {
        let data = {
            "commentId": id,
            "text": text,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/comment/edit-comment'

        });
    };


    DeleteCommentRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.DeleteComment(id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DeleteCommentActionCreator(id));
                }
            });
        };
    }

    DeleteComment = (id: number, onSuccess: DeleteComment) => {
        let data = {
            "commentId": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "DELETE",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/comment/delete-comment'

        });
    };

    AddCommentRedux = (taskId: number, text: string) => {
        return (dispatch: any, getState: any) => {
            this.AddComment(taskId, text, (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack) => {
                if (error) {
                    return;
                }

                if (data?.Id) {
                    dispatch(AddCommentActionCreator(data));
                }
            });
        };
    }

    AddComment = (taskId: number, text: string, onSuccess: AddComment) => {
        let data = {
            "taskId": taskId,
            "text": text,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/comment/create-comment'

        });
    };

    LoadCommentsRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.LoadComments(id, (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack[]) => {
                if (error) {
                    return;
                }

                if (data) {
                    dispatch(LoadCommentsActionCreator(data));
                }
            });
        };
    }

    LoadComments = (id: number, onSuccess: LoadComments) => {
        let data = {
            "taskId": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/comment/get-comments'

        });
    };

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (xhr: any, status: any, jqXHR: any) => {
            let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
            if (resp.errors) {
                //TODO ошибка
                onSuccess(resp, null);
            }
            else {
                let dataBack = xhr as T;
                onSuccess(null, dataBack);

            }
        }
    }

}