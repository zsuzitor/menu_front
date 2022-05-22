

import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { ILoadReviewTasksResultDataBask } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBask";
import { IOneProjectInfoDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInfoDataBack";
import { IOneProjectInListDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";

export type ListOfCardOnReturn = (error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => void;
export type CreateNewProject = (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => void;
export type GetProjectInfo = (error: MainErrorObjectBack, data: IOneProjectInfoDataBack) => void;
export type DeleteProject = (error: MainErrorObjectBack, data: BoolResultBack) => void;

export interface ICodeReviewProjectController {
    GetUserProjects: (onSuccess: ListOfCardOnReturn) => void;
    CreateNewProject: (newProjectName: string, onSuccess: CreateNewProject) => void;
    GetProjectInfo: (projectId: number, onSuccess: GetProjectInfo) => void;
    DeleteProject: (projectId: number, onSuccess: DeleteProject) => void;
}



export class CodeReviewProjectController implements ICodeReviewProjectController {



    DeleteProject = (projectId: number, onSuccess: DeleteProject) => {
        let data = {
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "DELETE",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/delete-project'

        });
    }

    GetProjectInfo = (projectId: number, onSuccess: GetProjectInfo) => {
        let data = {
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/get-project-info'

        });
    };


    

    

    CreateNewProject = (newProjectName: string, onSuccess: CreateNewProject) => {
        let data = {
            "projectName": newProjectName,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/add-new-project'

        });
    };

    GetUserProjects = (onSuccess: ListOfCardOnReturn) => {
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/get-projects',

        });
    };


    //todo вынести в какой то общей кусок
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
