import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TaskLabel } from "../../Models/Entity/State/TaskLabel";
import { GetTaskLabelsActionCreator } from "../../Models/Actions/LabelActions";

interface ILabelsOwnProps {
}


interface ILabelsStateToProps {
    ProjectId: number;
    Labels: TaskLabel[];
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
    res.Labels = state.TaskManagementApp.CurrentProjectLabels;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ILabelsOwnProps) => {
    let res = {} as ILabelsDispatchToProps;
    res.LoadLabels = (projectId: number) => {
        dispatch(window.G_TaskManagementLabelController.GetForProjectRedux(projectId));
    };
    // res.LoadSprints = (projectId: number) => {
    //     dispatch(window.G_TaskManagementSprintController.GetForProjectRedux(projectId));
    // };
    res.ClearLabels = (projectId: number) => {
        dispatch(GetTaskLabelsActionCreator([]));
    };

    res.CreateLabel = (projectId: number, labelName: string) => {
        dispatch(window.G_TaskManagementLabelController.CreateLabelRedux(projectId, labelName));
    };
    res.UpdateLabel = (projectId: number, labelName: string) => {
        dispatch(window.G_TaskManagementLabelController.UpdateLabelRedux(projectId, labelName));
    };
    res.DeleteLabel = (labelId: number) => {
        dispatch(window.G_TaskManagementLabelController.DeleteLabelRedux(labelId));
    };



    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);