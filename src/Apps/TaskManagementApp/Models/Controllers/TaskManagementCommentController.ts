import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { IOneWorkTaskCommentDataBack } from "../BackModels/IOneWorkTaskCommentDataBack";
import { CommentDelete } from "../Entity/CommentDelete";
import { CommentUpdate } from "../Entity/CommentUpdate";
import { CommentAdd } from "../Entity/CommentAdd";
import { CommentSet } from "../Entity/CommentSet";
import { OneWorkTaskComment } from "../Entity/OneTaskWorkComment";
import { UpdateCommentActionCreator, DeleteCommentActionCreator, AddCommentActionCreator, SetCommentsActionCreator } from "../Actions/CommentActions";
import { TaskManagementPreloader } from "../Consts";



export type LoadComments = (error: MainErrorObjectBack, data: IOneWorkTaskCommentDataBack[]) => void;
export type AddComment = (error: MainErrorObjectBack, data: IOneWorkTaskCommentDataBack) => void;
export type DeleteComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type UpdateComment = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ITaskManagementCommentController {
    LoadCommentsRedux: (id: number) => void;
    AddCommentRedux: (taskId: number, text: string) => void;
    DeleteCommentRedux: (data: CommentDelete) => void;
    UpdateCommentRedux: (comment: CommentUpdate) => void;


}



export class TaskManagementCommentController implements ITaskManagementCommentController {



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
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/comment/edit-comment'

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
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/comment/delete-comment'

        });
    };

    AddCommentRedux = (taskId: number, text: string) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.AddComment(taskId, text, (error: MainErrorObjectBack, data: IOneWorkTaskCommentDataBack) => {
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
            Url: G_PathToServer + 'api/taskmanagement/comment/create-comment'

        });
    };

    LoadCommentsRedux = (id: number) => {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadComments(id, (error: MainErrorObjectBack, data: IOneWorkTaskCommentDataBack[]) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data) {
                    let forSet = new CommentSet();
                    forSet.Comments = data.map(x => {
                        let cm = new OneWorkTaskComment();
                        cm.FillByBackModel(x);
                        return cm;
                    });
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
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/taskmanagement/comment/get-comments'

        });
    };

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }

}