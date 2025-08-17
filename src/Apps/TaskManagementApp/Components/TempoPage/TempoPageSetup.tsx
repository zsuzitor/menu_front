import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { TimeLog } from "../../Models/Entity/State/TimeLog";
import { ClearProjectTimeLogActionCreator, ClearUserTempoTimeLogActionCreator, SetProjectTimeLogDateFromActionCreator, SetProjectTimeLogDateToActionCreator, SetUserTempoTimeLogDateFromActionCreator, SetUserTempoTimeLogDateToActionCreator } from "../../Models/Actions/TimeLogAction";

interface ITempoPageOwnProps {
}


interface ITempoPageStateToProps {
    ProjectId: number;
    WorkTimeLog: TimeLog[];
    DateFrom: Date;
    DateTo: Date;
}

interface ITempoPageDispatchToProps {
    LoadTime: (projectId: number, dateFrom: Date, dateTo: Date) => void;
    SetDateTo: (date: Date) => void;
    SetDateFrom: (date: Date) => void;
    ClearTimeState: () => void;
    CreateTimeLog: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    DeleteTime: (timeId: number) => void;
    CopyTime: (timeId: number) => void;
    UpdateTimeLog: (id: number, taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
}

export interface ITempoPageProps extends ITempoPageStateToProps, ITempoPageOwnProps, ITempoPageDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: ITempoPageOwnProps) => {
    let res = {} as ITempoPageStateToProps;
    res.WorkTimeLog = state.TaskManagementApp.TempoState.TimeLogs;
    res.DateFrom = state.TaskManagementApp.TempoState.DateFrom;
    res.DateTo = state.TaskManagementApp.TempoState.DateTo;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ITempoPageOwnProps) => {
    let res = {} as ITempoPageDispatchToProps;
    res.SetDateFrom = (date: Date) => {
        dispatch(SetUserTempoTimeLogDateFromActionCreator(date));
    };
    res.SetDateTo = (date: Date) => {
        dispatch(SetUserTempoTimeLogDateToActionCreator(date));
    };
    res.LoadTime = (projectId: number, dateFrom: Date, dateTo: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.LoadTimeLogsForUserTempoRedux(projectId, null, dateFrom, dateTo));
    };

    res.ClearTimeState = () => {
        dispatch(ClearUserTempoTimeLogActionCreator());
    };


    res.CreateTimeLog = (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.CreateTimeTempoLogRedux(taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog))
    };

    res.DeleteTime = (timeId: number) => {
        dispatch(window.G_TaskManagementWorkTimeController.DeleteTimeTempoLogRedux(timeId))
    }

    res.CopyTime = (timeId: number) => {
        dispatch(window.G_TaskManagementWorkTimeController.CopyTimeTempoLogRedux(timeId))
    }

    res.UpdateTimeLog = (id: number, taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.UpdateTimeTempoLogRedux(id, taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog))
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);