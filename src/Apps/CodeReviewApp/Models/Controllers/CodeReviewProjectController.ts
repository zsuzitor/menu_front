import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { DeleteProjectActionCreator, AddNewProjectActionCreator, SetCurrentProjectIdActionCreator, SetProjectsActionCreator } from "../Actions/ProjectActions";
import { SetCurrentProjectStatusesActionCreator } from "../Actions/TaskStatusActions";
import { SetCurrentProjectUsersActionCreator } from "../Actions/UserActions";
import { IOneProjectInListDataBack } from "../BackModels/IOneProjectInListDataBack";
import { IOneProjectInfoDataBack } from "../BackModels/IOneProjectInfoDataBack";
import { OneProjectInList } from "../Entity/State/OneProjectInList";
import { ProjectUser } from "../Entity/State/ProjectUser";
import { TaskReviewStatus } from "../Entity/State/TaskReviewStatus";



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
            Type: ControllerHelper.DeleteHttp,
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
                    let dtUsers = data.Users.map(x => {
                        let u = new ProjectUser();
                        u.FillByBackModel(x);
                        return u;
                    });

                    let dtStatuses = data.Statuses.map(x => {
                        let u = new TaskReviewStatus();
                        u.FillByBackModel(x);
                        return u;

                    });
                    dispatch(SetCurrentProjectUsersActionCreator(dtUsers));
                    dispatch(SetCurrentProjectStatusesActionCreator(dtStatuses));
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
            Type: ControllerHelper.GetHttp,
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
                    let dt = new OneProjectInList();
                    dt.FillByBackModel(data);
                    dispatch(AddNewProjectActionCreator(dt));
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
                    let dt = data.map(x => {
                        let pr = new OneProjectInList();
                        pr.FillByBackModel(x);
                        return pr;
                    });

                    dispatch(SetProjectsActionCreator(dt));
                }
            });
        };
    }

    GetUserProjects = (onSuccess: ListOfCardOnReturn) => {
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: ControllerHelper.GetHttp,
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
