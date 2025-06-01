import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { WorkTaskStatus } from '../../Models/Entity/State/WorkTaskStatus';


export interface IEditTaskStatusOwnProps {
    Status: WorkTaskStatus;

}

interface IEditTaskStatusStateToProps {
    // CurrentProjectId: number;
}

interface IEditTaskStatusDispatchToProps {

    DeleteStatus: (statusId: number) => void;
    UpdateStatus: (statusId: number, name: string) => void;

}


export interface IEditTaskStatusProps extends IEditTaskStatusStateToProps, IEditTaskStatusOwnProps, IEditTaskStatusDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IEditTaskStatusOwnProps) => {
    let res = {} as IEditTaskStatusStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IEditTaskStatusOwnProps) => {
    let res = {} as IEditTaskStatusDispatchToProps;

    res.DeleteStatus = (id: number) => {
        dispatch(window.G_TaskManagementTaskStatusController.DeleteStatusRedux(id));
    };
    res.UpdateStatus = (statusId: number, name: string) => {
        dispatch(window.G_TaskManagementTaskStatusController.UpdateStatusRedux(statusId, name));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);