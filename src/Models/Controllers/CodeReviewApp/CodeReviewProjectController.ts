

import { AddNewProjectActionCreator, DeleteProjectActionCreator, SetCurrentProjectIdActionCreator, SetCurrentProjectUsersActionCreator, SetProjectsActionCreator } from "../../Actions/CodeReviewApp/ProjectActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";
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
    GetUserProjectsRedux: () => void;
    CreateNewProjectRedux: (newProjectName: string,) => void;
    GetProjectInfoRedux: (projectId: number) => void;
    DeleteProjectRedux: (projectId: number) => void;
}



export class CodeReviewProjectController implements ICodeReviewProjectController {


    DeleteProjectRedux = (projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.DeleteProject(projectId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (error) {
                    return;
                }

                if (data?.result) {
                    dispatch(DeleteProjectActionCreator(projectId));
                }
            });
        };
    }


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


    GetProjectInfoRedux = (projectId: number) => {
        return (dispatch: any, getState: any) => {
            this.GetProjectInfo(projectId, (error: MainErrorObjectBack, data: IOneProjectInfoDataBack) => {
                if (error) {
                    return;
                }

                if (data) {
                    dispatch(SetCurrentProjectUsersActionCreator(data.Users));
                }
            });
        };
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



    CreateNewProjectRedux = (newProjectName: string) => {
        return (dispatch: any, getState: any) => {
            this.CreateNewProject(newProjectName, (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => {
                if (error) {
                    return;
                }

                if (data) {
                    dispatch(AddNewProjectActionCreator(data));
                }
            });
        };
    }


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


    GetUserProjectsRedux = () => {
        return (dispatch: any, getState: any) => {
            this.GetUserProjects((error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => {
                if (error) {
                    return;
                }

                if (data) {
                    dispatch(SetCurrentProjectIdActionCreator(-1));
                    dispatch(SetProjectsActionCreator(data));
                }
            });
        };
    }

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
