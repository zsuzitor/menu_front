import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { TimeLog } from "../../Models/Entity/State/TimeLog";
import { TaskRelationType } from "../../Models/Entity/State/TaskRelation";



interface IAddTaskRelationOwnProps {
    TaskId: number | null;

    Close: () => void;
}


interface IAddTaskRelationStateToProps {
}

interface IAddTaskRelationDispatchToProps {
    Create: (mainTaskid: number, subTaskid: number, type: TaskRelationType) => void;

}

export interface IAddTaskRelationProps extends IAddTaskRelationStateToProps, IAddTaskRelationOwnProps, IAddTaskRelationDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddTaskRelationOwnProps) => {
    let res = {} as IAddTaskRelationStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddTaskRelationOwnProps) => {
    let res = {} as IAddTaskRelationDispatchToProps;
    res.Create = async (mainTaskid: number, subTaskid: number, type: TaskRelationType) => {
        if (type == TaskRelationType.MainTask) {
            type = TaskRelationType.SubTask;
            let f = mainTaskid;
            mainTaskid = subTaskid;
            subTaskid = f;
        }
        await window.G_TaskManagementTaskController.AddTaskRelationRedux(mainTaskid, subTaskid, type, dispatch);
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);