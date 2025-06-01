import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ClearCodeReviewStateActionCreator } from "../../Models/Actions/Actions";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';
import { SetCurrentProjectIdActionCreator } from "../../Models/Actions/ProjectActions";
import { SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";


interface ITaskManagementMainOwnProps {
}


interface ITaskManagementMainStateToProps {
    // Test: string;
    CurrentProjectId: number;
    CurrentTaskId: number;
    ProjectsList: OneProjectInListModel[];
    ProjectsLoaded: boolean;
    CurrentProjectUsers: ProjectUser[];
    Tasks: OneTask[];
}

interface ITaskManagementMainDispatchToProps {
    GetUserProjects: () => void;
    GetProjectInfo: (id: number) => void;
    ClearCodeReviewState: () => void;
    SetCurrentProject: (projectId: number) => void;
    SetCurrentTask: (taskId: number) => void;
    GetTaskInfo: (taskId: number) => void;
}


export interface TaskManagementMainProps extends ITaskManagementMainStateToProps, ITaskManagementMainOwnProps, ITaskManagementMainDispatchToProps {
}



const mapStateToProps = (state: AppState, ownProps: ITaskManagementMainOwnProps) => {
    let res = {} as ITaskManagementMainStateToProps;
    res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    res.CurrentTaskId = state.CodeReviewApp.CurrentTaskId;
    res.CurrentProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.ProjectsList = state.CodeReviewApp.ProjectsList;
    res.Tasks = state.CodeReviewApp.CurrentProjectTasks;
    res.ProjectsLoaded = state.CodeReviewApp.ProjectsLoaded;
    // res.Test = state.TestMessage;
    // res.FilmData = state.Films.find(x => x.Id === ownProps.FilmId);
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ITaskManagementMainOwnProps) => {
    let res = {} as ITaskManagementMainDispatchToProps;
    res.GetUserProjects = () => {
        dispatch(window.G_CodeReviewProjectController.GetUserProjectsRedux());
    };

    res.GetProjectInfo = (id: number) => {
        dispatch(window.G_CodeReviewProjectController.GetProjectInfoRedux(id));
    }

    res.ClearCodeReviewState = () => {
        dispatch(ClearCodeReviewStateActionCreator());
    }


    res.SetCurrentProject = (projectId: number) => {
        dispatch(SetCurrentProjectIdActionCreator(projectId));
    };

    res.SetCurrentTask = (taskId: number) => {
        dispatch(SetCurrentTaskIdActionCreator(taskId));
    };

    res.GetTaskInfo = (taskId: number) => {
        dispatch(window.G_CodeReviewTaskController.LoadTaskRedux(taskId));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);