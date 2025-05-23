import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TaskReviewStatus } from "../../Models/Entity/State/TaskReviewStatus";

interface IEditProjectOwnProps {
}


interface IEditProjectStateToProps {
    ProjectId: number;
    Statuses: TaskReviewStatus[];
}

interface IEditProjectDispatchToProps {
    DeleteStatus: (statusId: number) => void;
    CreateStatus: (name: string, projectId: number) => void;
}

export interface IEditProjectProps extends IEditProjectStateToProps, IEditProjectOwnProps, IEditProjectDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IEditProjectOwnProps) => {
    let res = {} as IEditProjectStateToProps;
    res.ProjectId = state.CodeReviewApp.CurrentProjectId;
    res.Statuses = state.CodeReviewApp.CurrentProjectStatuses;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IEditProjectOwnProps) => {
    let res = {} as IEditProjectDispatchToProps;

    res.DeleteStatus = (id: number) => {
        dispatch(window.G_CodeReviewTaskStatusController.DeleteStatusRedux(id));
    };

    res.CreateStatus = (name: string, projectId: number) => {
        dispatch(window.G_CodeReviewTaskStatusController.CreateStatusRedux(name, projectId));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);