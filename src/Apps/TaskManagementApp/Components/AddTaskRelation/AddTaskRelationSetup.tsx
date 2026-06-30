import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TaskRelationType } from "../../Models/Entity/State/TaskRelation";
import { IProjectTaskNameDataBack } from "../../Models/BackModels/IProjectTaskNameDataBack";



interface IAddTaskRelationOwnProps {
    TaskId: number | null;

    Close: () => void;
}


interface IAddTaskRelationStateToProps {
    ProjectId: number;
}

interface IAddTaskRelationDispatchToProps {
    Create: (mainTaskid: number, subTaskid: number, type: TaskRelationType) => void;
    FindTask: (projectId: number, text: string) => Promise<IProjectTaskNameDataBack[]>;
}

export interface IAddTaskRelationProps extends IAddTaskRelationStateToProps, IAddTaskRelationOwnProps, IAddTaskRelationDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddTaskRelationOwnProps) => {
    let res = {} as IAddTaskRelationStateToProps;
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
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

    res.FindTask = async (projectId: number, text: string): Promise<IProjectTaskNameDataBack[]> => {
        return await window.G_TaskManagementTaskController.FindTaskUI(projectId, text);

    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);