import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";

interface IOneProjectOneProjectUserOwnProps {
    User: ProjectUser;

}


interface IOneProjectOneProjectUserStateToProps {
}

interface IOneProjectOneProjectUserDispatchToProps {
    ChangeUser: (user: ProjectUser) => void;
}

export interface IOneProjectOneProjectUserProps extends IOneProjectOneProjectUserStateToProps, IOneProjectOneProjectUserOwnProps, IOneProjectOneProjectUserDispatchToProps {
}



const mapStateToProps = (state: AppState, ownProps: IOneProjectOneProjectUserOwnProps) => {
    let res = {} as IOneProjectOneProjectUserStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneProjectOneProjectUserOwnProps) => {
    let res = {} as IOneProjectOneProjectUserDispatchToProps;
    res.ChangeUser = (user) => { dispatch(window.G_TaskManagementUserController.ChangeProjectUserRedux(user)) };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);