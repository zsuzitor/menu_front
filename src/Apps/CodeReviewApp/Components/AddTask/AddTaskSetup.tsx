import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";



interface IAddTaskOwnProps {
    ProjectUsers: ProjectUser[];
    ProjectId: number;
}


interface IAddTaskStateToProps {
    Auth: IAuthState;
}

interface IAddTaskDispatchToProps {
    AddTaskToProject: (task: OneTask, projectId: number) => void;
}

export interface IAddTaskProps extends IAddTaskStateToProps, IAddTaskOwnProps, IAddTaskDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddTaskOwnProps) => {
    let res = {} as IAddTaskStateToProps;
    res.Auth = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddTaskOwnProps) => {
    let res = {} as IAddTaskDispatchToProps;
    res.AddTaskToProject = (task: OneTask, projectId: number) => {
        dispatch(window.G_CodeReviewTaskController.AddTaskToProjectRedux(task, projectId));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);