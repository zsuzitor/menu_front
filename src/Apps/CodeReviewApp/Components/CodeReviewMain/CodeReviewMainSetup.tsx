import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ClearCodeReviewStateActionCreator } from "../../Models/Actions/Actions";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';
import { SetCurrentProjectIdActionCreator } from "../../Models/Actions/ProjectActions";


interface ICodeReviewMainOwnProps {
}


interface ICodeReviewMainStateToProps {
    // Test: string;
    CurrentProjectId: number;
    ProjectsList: OneProjectInListModel[];
    CurrentProjectUsers: ProjectUser[];
    Tasks: OneTask[];
}

interface ICodeReviewMainDispatchToProps {
    SetCurrentProjectId: (id: number) => void;
    GetUserProjects: () => void;
    GetProjectInfo: (id: number) => void;
    ClearCodeReviewState: () => void;
    SetCurrentProject: (projectId: number) => void;
}


export interface CodeReviewMainProps extends ICodeReviewMainStateToProps, ICodeReviewMainOwnProps, ICodeReviewMainDispatchToProps {
}



const mapStateToProps = (state: AppState, ownProps: ICodeReviewMainOwnProps) => {
    let res = {} as ICodeReviewMainStateToProps;
    res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    res.CurrentProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.ProjectsList = state.CodeReviewApp.ProjectsList;
    res.Tasks = state.CodeReviewApp.CurrentProjectTasks;
    // res.Test = state.TestMessage;
    // res.FilmData = state.Films.find(x => x.Id === ownProps.FilmId);
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ICodeReviewMainOwnProps) => {
    let res = {} as ICodeReviewMainDispatchToProps;
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
    
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);