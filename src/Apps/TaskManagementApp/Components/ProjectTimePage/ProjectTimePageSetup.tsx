import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { TimeLog } from "../../Models/Entity/State/TimeLog";
import { ClearProjectTimeLogActionCreator, SetProjectTimeLogDateFromActionCreator, SetProjectTimeLogDateToActionCreator } from "../../Models/Actions/TimeLogAction";

interface IProjectTimePageOwnProps {
}


interface IProjectTimePageStateToProps {
    ProjectId: number;
    ProjectUsers: ProjectUser[];
    WorkTimeLog: TimeLog[];
    DateFrom: Date;
    DateTo: Date;
}

interface IProjectTimePageDispatchToProps {
    LoadTime: (projectId: number, dateFrom: Date, dateTo: Date) => void;
    SetDateTo: (date: Date) => void;
    SetDateFrom: (date: Date) => void;
    ClearTimeState: () => void;
}

export interface IProjectTimePageProps extends IProjectTimePageStateToProps, IProjectTimePageOwnProps, IProjectTimePageDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IProjectTimePageOwnProps) => {
    let res = {} as IProjectTimePageStateToProps;
    res.ProjectUsers = state.TaskManagementApp.CurrentProjectUsers;
    res.WorkTimeLog = state.TaskManagementApp.CurrentProjectTimes.TimeLogs;
    res.DateFrom = state.TaskManagementApp.CurrentProjectTimes.DateFrom;
    res.DateTo = state.TaskManagementApp.CurrentProjectTimes.DateTo;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectTimePageOwnProps) => {
    let res = {} as IProjectTimePageDispatchToProps;
    res.SetDateFrom = (date: Date) => {
        dispatch(SetProjectTimeLogDateFromActionCreator(date));
    };
    res.SetDateTo = (date: Date) => {
        dispatch(SetProjectTimeLogDateToActionCreator(date));
    };
    res.LoadTime = (projectId: number, dateFrom: Date, dateTo: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.LoadTimeLogsForProjectRedux(projectId, dateFrom, dateTo));
    };

    res.ClearTimeState = () => {
        dispatch(ClearProjectTimeLogActionCreator());
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);