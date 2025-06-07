import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";

interface IProjectTimePageOwnProps {
}


interface IProjectTimePageStateToProps {
}

interface IProjectTimePageDispatchToProps {
}

export interface IProjectTimePageProps extends IProjectTimePageStateToProps, IProjectTimePageOwnProps, IProjectTimePageDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IProjectTimePageOwnProps) => {
    let res = {} as IProjectTimePageStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectTimePageOwnProps) => {
    let res = {} as IProjectTimePageDispatchToProps;
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);