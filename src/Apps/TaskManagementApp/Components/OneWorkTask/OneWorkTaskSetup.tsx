import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetCommentsActionCreator } from "../../Models/Actions/CommentActions";
import { CommentSet } from "../../Models/Entity/CommentSet";
import { OneWorkTaskComment } from "../../Models/Entity/OneTaskWorkComment";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";
import { OneTaskInList } from "../../Models/Entity/State/OneTaskInList";


interface IOneWorkTaskOwnProps {
    Task: OneTaskInList;
    // Comments: OneWorkTaskComment[];
    CurrentProjectId: number;

}


interface IOneWorkTaskStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: WorkTaskStatus[];

}

interface IOneWorkTaskDispatchToProps {
    UpdateTask: (task: OneTaskInList) => void;
    DeleteTask: (id: number) => void;
    SetEmptyTaskComments: (taskId: number) => void;
    LoadTaskComments: (taskId: number) => void;
    SetCurrentTask: (taskId: number) => void;


}

export interface IOneWorkTaskProps extends IOneWorkTaskStateToProps, IOneWorkTaskOwnProps, IOneWorkTaskDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneWorkTaskOwnProps) => {
    let res = {} as IOneWorkTaskStateToProps;
    res.ProjectUsers = state.TaskManagementApp.CurrentProjectUsers;
    res.Statuses = state.TaskManagementApp.CurrentProjectStatuses;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneWorkTaskOwnProps) => {
    let res = {} as IOneWorkTaskDispatchToProps;
    res.UpdateTask = (forAdd: OneTaskInList) => {
        dispatch(window.G_TaskManagementTaskController.UpdateTaskRedux(forAdd));
    };

    res.DeleteTask = (taskId: number) => {
        dispatch(window.G_TaskManagementTaskController.DeleteTaskRedux(taskId));
    };


    res.SetEmptyTaskComments = (taskId: number) => {
        let dt = new CommentSet();
        dt.Comments = [];
        dt.TaskId = taskId;
        dispatch(SetCommentsActionCreator(dt))
    }

    res.LoadTaskComments = (taskId: number) => {
        dispatch(window.G_TaskManagementCommentController.LoadCommentsRedux(taskId))
    };

    res.SetCurrentTask = (taskId: number) => {
        dispatch(SetCurrentTaskIdActionCreator(taskId))
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);