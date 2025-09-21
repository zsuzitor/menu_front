import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectSprint } from "../../Models/Entity/State/ProjectSprint";
import { GetProjectSprintsActionCreator, GetProjectSprintsActionType } from "../../Models/Actions/SprintActions";

interface ISprintsOwnProps {
}


interface ISprintsStateToProps {
    ProjectId: number;
    Sprints: ProjectSprint[];
}

interface ISprintsDispatchToProps {
    LoadSprints: (projectId: number) => void;
    ClearSprints: (projectId: number) => void;
    CreateSprint: (projectId: number, sprintName: string, dateFrom: Date, dateTo: Date) => void;
    UpdateSprint: (id: number, sprintName: string, dateFrom: Date, dateTo: Date) => void;
    DeleteSprint: (sprintId: number) => void;
}

export interface ISprintsProps extends ISprintsStateToProps, ISprintsOwnProps, ISprintsDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: ISprintsOwnProps) => {
    let res = {} as ISprintsStateToProps;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    res.Sprints = state.TaskManagementApp.CurrentProjectSprints;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ISprintsOwnProps) => {
    let res = {} as ISprintsDispatchToProps;
    res.LoadSprints = (projectId: number) => {
        dispatch(window.G_TaskManagementSprintController.GetForProjectRedux(projectId));
    };
    res.ClearSprints = (projectId: number) => {
        let dt = new GetProjectSprintsActionType();
        dt.projectId = projectId;
        dt.data = [];
        dispatch(GetProjectSprintsActionCreator(dt));
    };

    res.CreateSprint = (projectId: number, sprintName: string, dateFrom: Date, dateTo: Date) => {
        dispatch(window.G_TaskManagementSprintController.CreateSprintRedux({
            ProjectId: projectId,
            Name: sprintName, StartDate: dateFrom, EndDate: dateTo
        }));
    };

    res.UpdateSprint = (id: number, sprintName: string, dateFrom: Date, dateTo: Date) => {
        dispatch(window.G_TaskManagementSprintController.UpdateSprintRedux({
            Id: id,
            Name: sprintName, StartDate: dateFrom, EndDate: dateTo
        }));
    };

    res.DeleteSprint = (sprintId: number) => {
        dispatch(window.G_TaskManagementSprintController.DeleteSprintRedux(sprintId));

    };



    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);