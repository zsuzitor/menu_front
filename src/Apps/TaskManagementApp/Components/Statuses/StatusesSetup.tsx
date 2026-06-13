import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";


interface IStatusesOwnProps {
}


interface IStatusesStateToProps {
    ProjectId: number;
    Statuses: WorkTaskStatus[];

}

interface IStatusesDispatchToProps {
    CreateStatus: (name: string, projectId: number) => void;
}

export interface IStatusesProps extends IStatusesStateToProps, IStatusesOwnProps, IStatusesDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IStatusesOwnProps) => {
    let res = {} as IStatusesStateToProps;
    res.Statuses = state.TaskManagementApp.CurrentProjectStatuses;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IStatusesOwnProps) => {
    let res = {} as IStatusesDispatchToProps;

    res.CreateStatus = (name: string, projectId: number) => {
        dispatch(window.G_TaskManagementTaskStatusController.CreateStatusRedux(name, projectId));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);