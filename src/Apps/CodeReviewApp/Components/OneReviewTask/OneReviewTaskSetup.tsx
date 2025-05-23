import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetCommentsActionCreator } from "../../Models/Actions/CommentActions";
import { CommentSet } from "../../Models/Entity/CommentSet";
import { OneTaskReviewComment } from "../../Models/Entity/OneTaskReviewComment";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { TaskReviewStatus } from "../../Models/Entity/State/TaskReviewStatus";


interface IOneReviewTaskOwnProps {
    Task: OneTask;
    Comments: OneTaskReviewComment[];

}


interface IOneReviewTaskStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: TaskReviewStatus[];

}

interface IOneReviewTaskDispatchToProps {
    UpdateTask: (task: OneTask) => void;
    DeleteTask: (id: number) => void;
    AddComment: (taskId: number, newCommentText: string) => void;
    SetEmptyTaskComments: (taskId: number) => void;
    LoadTaskComments: (taskId: number) => void;
}

export interface IOneReviewTaskProps extends IOneReviewTaskStateToProps, IOneReviewTaskOwnProps, IOneReviewTaskDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneReviewTaskOwnProps) => {
    let res = {} as IOneReviewTaskStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.Statuses = state.CodeReviewApp.CurrentProjectStatuses;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneReviewTaskOwnProps) => {
    let res = {} as IOneReviewTaskDispatchToProps;
    res.UpdateTask = (forAdd: OneTask) => {
        dispatch(window.G_CodeReviewTaskController.UpdateTaskRedux(forAdd));
    };

    res.DeleteTask = (taskId: number) => {
        dispatch(window.G_CodeReviewTaskController.DeleteTaskRedux(taskId));
    };

    res.AddComment = (taskId: number, text: string) => {
        dispatch(window.G_CodeReviewCommentController.AddCommentRedux(taskId, text));
    };

    res.SetEmptyTaskComments = (taskId: number) => {
        let dt = new CommentSet();
        dt.Comments = [];
        dt.TaskId = taskId;
        dispatch(SetCommentsActionCreator(dt))
    }

    res.LoadTaskComments = (taskId: number) => {
        dispatch(window.G_CodeReviewCommentController.LoadCommentsRedux(taskId))
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);