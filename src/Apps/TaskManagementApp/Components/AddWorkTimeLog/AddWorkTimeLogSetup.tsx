import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";



interface IAddWorkTimeLogOwnProps {
    TaskId: number;

    Close: () => void;
}


interface IAddWorkTimeLogStateToProps {
}

interface IAddWorkTimeLogDispatchToProps {
    CreateTimeLog: (taskId: number, text: string, minutes: number, dayOfLog: Date) => void;
}

export interface IAddWorkTimeLogProps extends IAddWorkTimeLogStateToProps, IAddWorkTimeLogOwnProps, IAddWorkTimeLogDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddWorkTimeLogOwnProps) => {
    let res = {} as IAddWorkTimeLogStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddWorkTimeLogOwnProps) => {
    let res = {} as IAddWorkTimeLogDispatchToProps;

    res.CreateTimeLog = (taskId: number, text: string, minutes: number, dayOfLog: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.CreateTimeLogRedux(taskId, text, minutes, dayOfLog))
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);