import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Preset } from "../../Models/Entity/State/Preset";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { ProjectSprint } from "../../Models/Entity/State/ProjectSprint";
import { TaskLabel } from "../../Models/Entity/State/TaskLabel";



interface IEditPresetOwnProps {
    Preset: Preset;

    UpdatePreset: (preset: Preset) => void;
}


interface IEditPresetStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: WorkTaskStatus[];
    Sprints: ProjectSprint[];
    Labels: TaskLabel[];
}

interface IEditPresetDispatchToProps {
}

export interface IEditPresetProps extends IEditPresetStateToProps, IEditPresetOwnProps, IEditPresetDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IEditPresetOwnProps) => {
    let res = {} as IEditPresetStateToProps;
    
    res.ProjectUsers = state.TaskManagementApp.CurrentProjectUsers;
    res.Statuses = state.TaskManagementApp.CurrentProjectStatuses;
    res.Sprints = state.TaskManagementApp.CurrentProjectSprints;
    res.Labels = state.TaskManagementApp.CurrentProjectLabels;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IEditPresetOwnProps) => {
    let res = {} as IEditPresetDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);