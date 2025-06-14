import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";



interface IAddWorkTimeLogOwnProps {
    TaskId: number | null;
    DefaultDate: Date | null;

    Close: () => void;
    CreateTimeLog: (taskId: number, text: string, minutes: number, dayOfLog: Date) => void;
}


interface IAddWorkTimeLogStateToProps {
}

interface IAddWorkTimeLogDispatchToProps {
}

export interface IAddWorkTimeLogProps extends IAddWorkTimeLogStateToProps, IAddWorkTimeLogOwnProps, IAddWorkTimeLogDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddWorkTimeLogOwnProps) => {
    let res = {} as IAddWorkTimeLogStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddWorkTimeLogOwnProps) => {
    let res = {} as IAddWorkTimeLogDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);