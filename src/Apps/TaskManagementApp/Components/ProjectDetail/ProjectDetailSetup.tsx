import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetFilterTaskCreatorActionCreator, SetFilterTaskExecutorActionCreator, SetFilterTaskNameActionCreator, SetFilterTaskPageActionCreator, SetFilterTaskStatusActionCreator, SetFilterTaskActionCreator, SetFilterTaskSprintActionCreator, SetFilterTaskLabelActionCreator, SetFilterTaskPresetActionCreator } from "../../Models/Actions/TaskActions";
import { ITaskFilter } from "../../Models/Entity/ITaskFilter";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { TasksFilter } from "../../Models/Entity/State/TasksFilter";
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { ProjectSprint } from "../../Models/Entity/State/ProjectSprint";
import { TaskLabel } from "../../Models/Entity/State/TaskLabel";
import { Preset } from "../../Models/Entity/State/Preset";
import { OneTaskInList } from "../../Models/Entity/State/OneTaskInList";


interface IProjectDetailOwnProps {
    Project: OneProjectInListModel;
    Tasks: OneTaskInList[];
}


interface IProjectDetailStateToProps {
    ProjectUsers: ProjectUser[];
    TasksFilters: TasksFilter;
    Statuses: WorkTaskStatus[];
    Sprints: ProjectSprint[];
    Labels: TaskLabel[];
    Presets: Preset[];

    CurrentProjectTasksAllCount: number;
}

interface IProjectDetailDispatchToProps {
    SetFilterTaskCreator: (id: number) => void;
    SetFilterTaskExecutor: (id: number) => void;
    SetFilterTaskName: (name: string) => void;
    SetFilterTaskPage: (num: number) => void;
    SetFilterTaskStatus: (status: number) => void;
    SetFilterTaskSprint: (sprint: number) => void;
    SetFilterTaskLabel: (sprint: number[]) => void;
    SetFilterPreset: (preset: number) => void;
    ClearFilterTask: () => void;

    ReloadTasks: (filters: ITaskFilter) => void;

    DeleteProject: (id: number) => void;
    ClearProjectState: () => void;

}

export interface IProjectDetailProps extends IProjectDetailStateToProps, IProjectDetailOwnProps, IProjectDetailDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IProjectDetailOwnProps) => {
    let res = {} as IProjectDetailStateToProps;
    res.ProjectUsers = state.TaskManagementApp.CurrentProjectUsers;
    res.TasksFilters = state.TaskManagementApp.CurrentProjectTasksFilters;
    res.CurrentProjectTasksAllCount = state.TaskManagementApp.CurrentProjectTasksAllCount;
    res.Statuses = state.TaskManagementApp.CurrentProjectStatuses;
    res.Sprints = state.TaskManagementApp.CurrentProjectSprints;
    res.Labels = state.TaskManagementApp.CurrentProjectLabels;
    res.Presets = state.TaskManagementApp.CurrentProjectPresets;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectDetailOwnProps) => {
    let res = {} as IProjectDetailDispatchToProps;

    res.SetFilterTaskCreator = (id: number) => {
        dispatch(SetFilterTaskCreatorActionCreator(id));
    };
    res.SetFilterTaskExecutor = (id: number) => {
        dispatch(SetFilterTaskExecutorActionCreator(id));
    };
    res.SetFilterTaskName = (name: string) => {
        dispatch(SetFilterTaskNameActionCreator(name));
    };
    res.SetFilterTaskPage = (num: number) => {
        dispatch(SetFilterTaskPageActionCreator(num));
    };
    res.SetFilterTaskStatus = (status: number) => {
        dispatch(SetFilterTaskStatusActionCreator(status));
    };

    res.SetFilterTaskSprint = (sprint: number) => {
        dispatch(SetFilterTaskSprintActionCreator(sprint));
    };

    res.SetFilterTaskLabel = (label: number[]) => {
        dispatch(SetFilterTaskLabelActionCreator(label));
    };

    res.SetFilterPreset = (preset: number) => {
        dispatch(SetFilterTaskPresetActionCreator(preset));
    };

    res.ReloadTasks = (filter: ITaskFilter) => {
        dispatch(window.G_TaskManagementTaskController.LoadTasksRedux(filter));
    };

    res.DeleteProject = (id: number) => {
        dispatch(window.G_TaskManagementProjectController.DeleteProjectRedux(id));
    };

    res.ClearFilterTask = () => {
        dispatch(SetFilterTaskActionCreator(new TasksFilter()));
    }

    res.ClearProjectState = () => {
        dispatch(SetFilterTaskActionCreator(new TasksFilter()));

    }


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);