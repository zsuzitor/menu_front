import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";

interface ILabelsOwnProps {
}


interface ILabelsStateToProps {
    ProjectId: number;
}

interface ILabelsDispatchToProps {
    LoadLabels: (projectId: number) => void;
    ClearLabels: (projectId: number) => void;
    CreateLabel: (projectId: number, labelName: string) => void;
    UpdateLabel: (id: number, labelName: string) => void;
    DeleteLabel: (labelId: number) => void;
}

export interface ILabelsProps extends ILabelsStateToProps, ILabelsOwnProps, ILabelsDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: ILabelsOwnProps) => {
    let res = {} as ILabelsStateToProps;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ILabelsOwnProps) => {
    let res = {} as ILabelsDispatchToProps;
    // res.LoadSprints = (projectId: number) => {
    //     dispatch(window.G_TaskManagementSprintController.GetForProjectRedux(projectId));
    // };
    // res.ClearSprints = (projectId: number) => {
    //     let dt = new GetProjectSprintsActionType();
    //     // dt.projectId = projectId;
    //     dt.data = [];
    //     dispatch(GetProjectSprintsActionCreator(dt));
    // };





    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);