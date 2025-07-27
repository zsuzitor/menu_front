import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { GetSprintsTasksActionCreator, SetCurrentSprintActionCreator } from "../../Models/Actions/SprintActions";

interface ISprintOwnProps {
}


interface ISprintStateToProps {
    ProjectId: number;
    SprintId: number;
    Tasks: OneTask[];
}

interface ISprintDispatchToProps {
    LoadTasks: (sprintId: number) => void;
    ClearSprintTasks: (sprintId: number) => void;
}

export interface ISprintProps extends ISprintStateToProps, ISprintOwnProps, ISprintDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: ISprintOwnProps) => {
    let res = {} as ISprintStateToProps;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    res.SprintId = state.TaskManagementApp.CurrentSprint?.Id;
    res.Tasks = state.TaskManagementApp.CurrentSprint?.Tasks;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ISprintOwnProps) => {
    let res = {} as ISprintDispatchToProps;
    res.LoadTasks = (sprintId: number) => {
        dispatch(window.G_TaskManagementSprintController.GetTasksRedux(sprintId));
    };

    res.ClearSprintTasks = (sprintId: number) => {
        dispatch(SetCurrentSprintActionCreator(sprintId));
    };



    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);