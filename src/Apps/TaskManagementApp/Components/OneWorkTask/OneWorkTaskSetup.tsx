import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetCommentsActionCreator } from "../../Models/Actions/CommentActions";
import { CommentSet } from "../../Models/Entity/CommentSet";
import { OneWorkTaskComment } from "../../Models/Entity/OneTaskWorkComment";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";


interface IOneWorkTaskOwnProps {
    Task: OneTask;
    Comments: OneWorkTaskComment[];
    CurrentProjectId: number;

}


interface IOneWorkTaskStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: WorkTaskStatus[];

}

interface IOneWorkTaskDispatchToProps {
    UpdateTask: (task: OneTask) => void;
    DeleteTask: (id: number) => void;
    AddComment: (taskId: number, newCommentText: string) => void;
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
    res.UpdateTask = (forAdd: OneTask) => {
        dispatch(window.G_TaskManagementTaskController.UpdateTaskRedux(forAdd));
    };

    res.DeleteTask = (taskId: number) => {
        dispatch(window.G_TaskManagementTaskController.DeleteTaskRedux(taskId));
    };

    res.AddComment = (taskId: number, text: string) => {
        dispatch(window.G_TaskManagementCommentController.AddCommentRedux(taskId, text));
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