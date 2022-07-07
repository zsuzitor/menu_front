import { AddCommentActionCreator, DeleteCommentActionCreator, SetCommentsActionCreator, UpdateCommentActionCreator } from "../../Actions/CodeReviewApp/CommentActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { CommentAdd } from "../../Models/CodeReviewApp/CommentAdd";
import { CommentDelete } from "../../Models/CodeReviewApp/CommentDelete";
import { CommentSet } from "../../Models/CodeReviewApp/CommentSet";
import { CommentUpdate } from "../../Models/CodeReviewApp/CommentUpdate";



export type LoadComments = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack[]) => void;
export type AddComment = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack) => void;
export type DeleteComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type UpdateComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewCommentController {
    LoadCommentsRedux: (id: number) => void;
    AddCommentRedux: (taskId: number, text: string) => void;
    DeleteCommentRedux: (data: CommentDelete) => void;
    UpdateCommentRedux: (comment: CommentUpdate) => void;
}



export class CodeReviewCommentController implements ICodeReviewCommentController {


    UpdateCommentRedux = (comment: CommentUpdate) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateComment(comment.Id, comment.Text, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
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


    DeleteCommentRedux = (dataForDel: CommentDelete) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteComment(dataForDel.Id, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DeleteCommentActionCreator(dataForDel));
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
            this.preloader(true);
            this.AddComment(taskId, text, (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.Id) {
                    let forAdd = new CommentAdd(data, taskId);
                    dispatch(AddCommentActionCreator(forAdd));
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
            this.preloader(true);
            this.LoadComments(id, (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack[]) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data) {
                    let forSet = new CommentSet();
                    forSet.Comments = data;
                    forSet.TaskId = id;
                    dispatch(SetCommentsActionCreator(forSet));
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

    preloader(show: boolean) {
        if (!window.CodeReviewCounter) {
            window.CodeReviewCounter = 0;
        }

        var preloader = document.getElementById('code_review_preloader');
        if (!preloader) {
            return;
        }

        if (show) {
            window.CodeReviewCounter++;
            preloader.style.display = 'block';
        }
        else {
            window.CodeReviewCounter--;
            if (!window.CodeReviewCounter) {
                preloader.style.display = 'none';
            }
        }
    }

}