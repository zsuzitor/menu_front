

import { AddNewProjectActionCreator, DeleteProjectActionCreator, SetCurrentProjectIdActionCreator, SetProjectsActionCreator } from "../../Actions/CodeReviewApp/ProjectActions";
import { LoadTasksActionCreator, SetFilterTaskActionCreator } from "../../Actions/CodeReviewApp/TaskActions";
import { SetCurrentProjectUsersActionCreator } from "../../Actions/CodeReviewApp/UserActions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";
import { IOneProjectInfoDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInfoDataBack";
import { IOneProjectInListDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { IOneTaskReviewCommentDataBack } from "../../BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { TasksFilter } from "../../Models/CodeReviewApp/State/TasksFilter";
import { AppState } from "../../Models/State/AppState";
import { ControllerHelper } from "../ControllerHelper";

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
            this.preloader(true);
            this.DeleteProject(projectId, (error: MainErrorObjectBack, data: BoolResultBack) => {
                this.preloader(false);
                if (error) {
                    return;
                }

                if (data?.result) {
                    //let state = getState() as AppState;
                    // if (state.CodeReviewApp.CurrentProjectId === projectId) {
                    //     dispatch(SetCurrentProjectUsersActionCreator([]));
                    //     let tasks = {} as ILoadReviewTasksResultDataBack;
                    //     tasks.Tasks = [];
                    //     tasks.TasksCount = 0;
                    //     dispatch(SetFilterTaskActionCreator(new TasksFilter()));
                    //     dispatch(LoadTasksActionCreator(tasks));
                    // }

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
            this.preloader(true);
            this.GetProjectInfo(projectId, (error: MainErrorObjectBack, data: IOneProjectInfoDataBack) => {
                this.preloader(false);
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
            this.preloader(true);
            this.CreateNewProject(newProjectName, (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => {
                this.preloader(false);
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
            this.preloader(true);
            this.GetUserProjects((error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => {
                this.preloader(false);
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


    //todo вынести в какой то общий кусок
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

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
