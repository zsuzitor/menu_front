import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";



export type LoadComments = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack[]) => void;
export type AddComment = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack) => void;
export type DeleteComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type UpdateComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewCommentController {
    LoadComments: (id: number, onSuccess: LoadComments) => void;
    AddComment: (taskId: number, text: string, onSuccess: AddComment) => void;
    DeleteComment: (id: number, onSuccess: DeleteComment) => void;
    UpdateComment: (id: number, text: string, onSuccess: UpdateComment) => void;
}



export class CodeReviewCommentController implements ICodeReviewCommentController {


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