import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";

interface IOneProjectOneProjectUserOwnProps {
    User: ProjectUser;

}


interface IOneProjectOneProjectUserStateToProps {
    
    CurrentProjectId: number;
}

interface IOneProjectOneProjectUserDispatchToProps {
    ChangeUser: (user: ProjectUser, projectId: number) => void;
}

export interface IOneProjectOneProjectUserProps extends IOneProjectOneProjectUserStateToProps, IOneProjectOneProjectUserOwnProps, IOneProjectOneProjectUserDispatchToProps {
}



const mapStateToProps = (state: AppState, ownProps: IOneProjectOneProjectUserOwnProps) => {
    let res = {} as IOneProjectOneProjectUserStateToProps;

    res.CurrentProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneProjectOneProjectUserOwnProps) => {
    let res = {} as IOneProjectOneProjectUserDispatchToProps;
    res.ChangeUser = (user, projectId) => { dispatch(window.G_TaskManagementUserController.ChangeProjectUserRedux(user, projectId)) };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);