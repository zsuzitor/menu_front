import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { ProjectSprint } from "../../Models/Entity/State/ProjectSprint";
import { TaskLabel } from "../../Models/Entity/State/TaskLabel";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { ITaskFilter } from "../../Models/Entity/ITaskFilter";
import { OneTask } from "../../Models/Entity/State/OneTask";


interface ITasksUserOwnProps {
}


interface ITasksUserStateToProps {
    ProjectId: number;
    Users: ProjectUser[];
    // Presets: Preset[];
    Sprints: ProjectSprint[];
    Labels: TaskLabel[];
    Statuses: WorkTaskStatus[];

}

interface ITasksUserDispatchToProps {
    ReloadTasks: (filter: ITaskFilter) => Promise<OneTask[]>;
}

export interface ITasksUserProps extends ITasksUserStateToProps, ITasksUserOwnProps, ITasksUserDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: ITasksUserOwnProps) => {
    let res = {} as ITasksUserStateToProps;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    res.Sprints = state.TaskManagementApp.CurrentProjectSprints;
    res.Labels = state.TaskManagementApp.CurrentProjectLabels;
    res.Users = state.TaskManagementApp.CurrentProjectUsers;
    res.Statuses = state.TaskManagementApp.CurrentProjectStatuses;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ITasksUserOwnProps) => {
    let res = {} as ITasksUserDispatchToProps;
    res.ReloadTasks = async (filter: ITaskFilter): Promise<OneTask[]> => {
        return await window.G_TaskManagementTaskController.LoadTasksUI(filter);

    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);