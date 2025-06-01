import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";

interface IProjectUsersOwnProps {
}


interface IProjectUsersStateToProps {
    ProjectId: number;
    ProjectUsers: ProjectUser[];
}

interface IProjectUsersDispatchToProps {
    AddUserToProject: (newUserName: string, userMainAppEmail: string, projectId: number) => void;
}

export interface IProjectUsersProps extends IProjectUsersStateToProps, IProjectUsersOwnProps, IProjectUsersDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IProjectUsersOwnProps) => {
    let res = {} as IProjectUsersStateToProps;
    res.ProjectId = state.CodeReviewApp.CurrentProjectId;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectUsersOwnProps) => {
    let res = {} as IProjectUsersDispatchToProps;
    res.AddUserToProject = (newUserName: string, userMainAppEmail: string, projectId: number) => {
        dispatch(window.G_CodeReviewUserController.AddUserToProjectRedux(newUserName, userMainAppEmail, projectId))
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);