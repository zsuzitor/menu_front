

import { IOneProjectInfoDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInfoDataBack";
import { IOneProjectInListDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";

export type ListOfCardOnReturn = (error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => void;
export type CreateNewProject = (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => void;
export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;
export type AddNewProjectTask = (error: MainErrorObjectBack, data: IProjectTaskDataBack) => void;
export type GetProjectInfo = (error: MainErrorObjectBack, data: IOneProjectInfoDataBack) => void;




export interface ICodeReviewController {
    GetUserProjects: (onSuccess: ListOfCardOnReturn) => void;
    CreateNewProject: (newProjectName: string, onSuccess: CreateNewProject) => void;
    AddUserToProject: (newUserName: string, projectId: number, onSuccess: AddNewUserToProject) => void;
    AddTaskToProject: (taskName: string, taskCreatorId: number, taskReviwerId: number, projectId: number, onSuccess: AddNewProjectTask) => void;
    GetProjectInfo: (projectId: number, onSuccess: GetProjectInfo) => void;
}



export class CodeReviewController implements ICodeReviewController {

    GetProjectInfo = (projectId: number, onSuccess: GetProjectInfo) => {
        let data = {
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IOneProjectInfoDataBack;
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/get-project-info'

        });
    };


    AddTaskToProject = (taskName: string, taskCreatorId: number, taskReviwerId: number, projectId: number, onSuccess: AddNewProjectTask) => {
        let data = {
            "taskName": taskName,
            "taskCreatorId": taskCreatorId,
            "taskReviwerId": taskReviwerId,
            "projectId": projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IProjectTaskDataBack;
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/add-new-task'

        });

    }

    AddUserToProject = (newUserName: string, projectId: number, onSuccess: AddNewUserToProject) => {
        let data = {
            "userName": newUserName,
            projectId: projectId,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IProjectUserDataBack;
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/add-new-user'

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
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IOneProjectInListDataBack;
                    onSuccess(null, dataBack);

                }
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
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IOneProjectInListDataBack[];
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/get-projects',

        });
    };
}
