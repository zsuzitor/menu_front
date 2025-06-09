import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { TimeLog } from "../../Models/Entity/State/TimeLog";
import { ClearProjectTimeLogActionCreator, ClearUserTimeLogActionCreator, SetProjectTimeLogDateFromActionCreator, SetProjectTimeLogDateToActionCreator, SetUserTimeLogDateFromActionCreator, SetUserTimeLogDateToActionCreator } from "../../Models/Actions/TimeLogAction";

interface IPersonTimePageOwnProps {
}


interface IPersonTimePageStateToProps {
    WorkTimeLog: TimeLog[];
    DateFrom: Date;
    DateTo: Date;
    UserId: number;
    CurrentProjectId: number;
}

interface IPersonTimePageDispatchToProps {
    LoadTime: (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => void;
    SetDateTo: (date: Date) => void;
    SetDateFrom: (date: Date) => void;
    ClearTimeState: () => void;
}

export interface IPersonTimePageProps extends IPersonTimePageStateToProps, IPersonTimePageOwnProps, IPersonTimePageDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPersonTimePageOwnProps) => {
    let res = {} as IPersonTimePageStateToProps;
    res.WorkTimeLog = state.TaskManagementApp.PersonTimes.TimeLogs;
    res.DateFrom = state.TaskManagementApp.PersonTimes.DateFrom;
    res.DateTo = state.TaskManagementApp.PersonTimes.DateTo;
    res.UserId = state.TaskManagementApp.CurrentUserId;
    res.CurrentProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPersonTimePageOwnProps) => {
    let res = {} as IPersonTimePageDispatchToProps;
    res.SetDateFrom = (date: Date) => {
        dispatch(SetUserTimeLogDateFromActionCreator(date));
    };
    res.SetDateTo = (date: Date) => {
        dispatch(SetUserTimeLogDateToActionCreator(date));
    };
    res.LoadTime = (projectId: number, userId: number, dateFrom: Date, dateTo: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.LoadTimeLogsForUserRedux(projectId, userId, dateFrom, dateTo));
    };

    res.ClearTimeState = () => {
        dispatch(ClearUserTimeLogActionCreator());
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);