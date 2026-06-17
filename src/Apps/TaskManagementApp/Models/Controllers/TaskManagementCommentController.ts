import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { IOneWorkTaskCommentDataBack } from "../BackModels/IOneWorkTaskCommentDataBack";
import { CommentDelete } from "../Entity/CommentDelete";
import { CommentUpdate } from "../Entity/CommentUpdate";
import { CommentAdd } from "../Entity/CommentAdd";
import { CommentSet } from "../Entity/CommentSet";
import { OneWorkTaskComment } from "../Entity/OneTaskWorkComment";
import { UpdateCommentActionCreator, DeleteCommentActionCreator, AddCommentActionCreator, SetCommentsActionCreator } from "../Actions/CommentActions";
import { TaskManagementApiCommentUrl, TaskManagementPreloader } from "../Consts";
import { ServerResult } from "../../../../Models/AjaxLogic";


export interface ITaskManagementCommentController {
    LoadCommentsRedux: (id: number) => void;
    AddCommentRedux: (taskId: number, text: string) => void;
    DeleteCommentRedux: (data: CommentDelete) => void;
    UpdateCommentRedux: (comment: CommentUpdate) => void;

}


export class TaskManagementCommentController implements ITaskManagementCommentController {



    UpdateCommentRedux = (comment: CommentUpdate) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateCommentAsync(comment.Id, comment.Text);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(UpdateCommentActionCreator(comment));
            }
        };
    }

    UpdateCommentAsync = async (id: number, text: string): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "commentId": id,
            "text": text,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiCommentUrl}/edit-comment`
        });

        return backResult;
    }


    DeleteCommentRedux = (dataForDel: CommentDelete) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteCommentAsync(dataForDel.Id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteCommentActionCreator(dataForDel));
            }
        };
    }

    DeleteCommentAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "commentId": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiCommentUrl}/delete-comment`
        });

        return backResult;
    }

    AddCommentRedux = (taskId: number, text: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.AddCommentAsync(taskId, text);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Id) {
                let forAdd = new CommentAdd(backResult.Data, taskId);
                dispatch(AddCommentActionCreator(forAdd));
            }
        };
    }

    AddCommentAsync = async (taskId: number, text: string): Promise<ServerResult<IOneWorkTaskCommentDataBack>> => {
        let data = {
            "taskId": taskId,
            "text": text,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IOneWorkTaskCommentDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiCommentUrl}/create-comment`
        });

        return backResult;
    }

    LoadCommentsRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.LoadCommentsAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let forSet = new CommentSet();
                forSet.Comments = backResult.Data.map(x => {
                    let cm = new OneWorkTaskComment();
                    cm.FillByBackModel(x);
                    return cm;
                });
                forSet.TaskId = id;
                dispatch(SetCommentsActionCreator(forSet));
            }
        };
    }

    LoadCommentsAsync = async (id: number): Promise<ServerResult<IOneWorkTaskCommentDataBack[]>> => {
        let data = {
            "taskId": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IOneWorkTaskCommentDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiCommentUrl}/get-comments`
        });

        return backResult;
    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);

    }

}