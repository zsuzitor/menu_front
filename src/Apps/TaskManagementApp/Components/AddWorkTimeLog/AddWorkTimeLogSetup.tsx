import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TimeLog } from "../../Models/Entity/State/TimeLog";
import { IProjectTaskNameDataBack } from "../../Models/BackModels/IProjectTaskNameDataBack";



interface IAddWorkTimeLogOwnProps {
    TaskId: number | null;
    TaskName?: string | null;
    DefaultDate: Date | null;
    TimeLog?: TimeLog | null;

    Close: () => void;
    CreateTimeLog: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    UpdateTimeLog?: (id: number, taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;
    DeleteTimeLog?: (id: number) => void;
}


interface IAddWorkTimeLogStateToProps {
}

interface IAddWorkTimeLogDispatchToProps {
    GetTaskName: (taskId: number) => Promise<string>;
    FindTask: (projectId: number, text: string) => Promise<IProjectTaskNameDataBack[]>;

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

    res.FindTask = async (projectId: number, text: string): Promise<IProjectTaskNameDataBack[]> => {
        return await window.G_TaskManagementTaskController.FindTaskUI(projectId, text);

    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);