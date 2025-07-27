import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ClearTaskManagementStateActionCreator } from "../../Models/Actions/Actions";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';
import { SetCurrentProjectIdActionCreator } from "../../Models/Actions/ProjectActions";
import { SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";
import { SetCurrentUserIdActionCreator } from "../../Models/Actions/UserActions";
import { SetCurrentSprintActionCreator } from "../../Models/Actions/SprintActions";


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
    ClearClearTaskManagementStateState: () => void;
    SetCurrentProject: (projectId: number) => void;
    SetCurrentTask: (taskId: number) => void;
    SetCurrentSprint: (sprint: number) => void;
    SetCurrentUser: (userId: number) => void;
    GetTaskInfo: (taskId: number) => void;
}


export interface TaskManagementMainProps extends ITaskManagementMainStateToProps, ITaskManagementMainOwnProps, ITaskManagementMainDispatchToProps {
}



const mapStateToProps = (state: AppState, ownProps: ITaskManagementMainOwnProps) => {
    let res = {} as ITaskManagementMainStateToProps;
    res.CurrentProjectId = state.TaskManagementApp.CurrentProjectId;
    res.CurrentTaskId = state.TaskManagementApp.CurrentTaskId;
    res.CurrentProjectUsers = state.TaskManagementApp.CurrentProjectUsers;
    res.ProjectsList = state.TaskManagementApp.ProjectsList;
    res.Tasks = state.TaskManagementApp.CurrentProjectTasks;
    res.ProjectsLoaded = state.TaskManagementApp.ProjectsLoaded;
    // res.Test = state.TestMessage;
    // res.FilmData = state.Films.find(x => x.Id === ownProps.FilmId);
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ITaskManagementMainOwnProps) => {
    let res = {} as ITaskManagementMainDispatchToProps;
    res.GetUserProjects = () => {
        dispatch(window.G_TaskManagementProjectController.GetUserProjectsRedux());
    };

    res.GetProjectInfo = (id: number) => {
        dispatch(window.G_TaskManagementProjectController.GetProjectInfoRedux(id));
    }

    res.ClearClearTaskManagementStateState = () => {
        dispatch(ClearTaskManagementStateActionCreator());
    }


    res.SetCurrentProject = (projectId: number) => {
        dispatch(SetCurrentProjectIdActionCreator(projectId));
    };

    res.SetCurrentUser = (userId: number) => {
        dispatch(SetCurrentUserIdActionCreator(userId));
    };

    res.SetCurrentTask = (taskId: number) => {
        dispatch(SetCurrentTaskIdActionCreator(taskId));
    };

    res.GetTaskInfo = (taskId: number) => {
        dispatch(window.G_TaskManagementTaskController.LoadTaskRedux(taskId));
    };

    res.SetCurrentSprint = (sprintId: number) => {
        dispatch(SetCurrentSprintActionCreator(sprintId));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);