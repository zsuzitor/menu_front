import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";

interface IEditProjectOwnProps {
}


interface IEditProjectStateToProps {
    ProjectId: number;
}

interface IEditProjectDispatchToProps {
}

export interface IEditProjectProps extends IEditProjectStateToProps, IEditProjectOwnProps, IEditProjectDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IEditProjectOwnProps) => {
    let res = {} as IEditProjectStateToProps;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IEditProjectOwnProps) => {
    let res = {} as IEditProjectDispatchToProps;


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);