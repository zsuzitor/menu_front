import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TimeLog } from "../../Models/Entity/State/TimeLog";



interface IAddWorkTimeLogOwnProps {
    TaskId: number | null;
    TaskName?: string | null;
    DefaultDate: Date | null;
    TimeLog?: TimeLog;

    Close: () => void;
    CreateTimeLog: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    UpdateTimeLog?: (id: number, taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    DeleteTimeLog?: (id: number) => void;
}


interface IAddWorkTimeLogStateToProps {
}

interface IAddWorkTimeLogDispatchToProps {
    GetTaskName: (taskId: number) => Promise<string>;

}

export interface IAddWorkTimeLogProps extends IAddWorkTimeLogStateToProps, IAddWorkTimeLogOwnProps, IAddWorkTimeLogDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddWorkTimeLogOwnProps) => {
    let res = {} as IAddWorkTimeLogStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddWorkTimeLogOwnProps) => {
    let res = {} as IAddWorkTimeLogDispatchToProps;

    res.GetTaskName = async (taskId: number): Promise<string> => {
        return await window.G_TaskManagementTaskController.GetTaskNameUI(taskId);

    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);