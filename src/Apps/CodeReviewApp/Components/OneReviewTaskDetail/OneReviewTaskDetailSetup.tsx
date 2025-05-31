import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { TaskReviewStatus } from "../../Models/Entity/State/TaskReviewStatus";
import { ClearCurrentTaskStateActionCreator, SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";


interface IOneReviewTaskDetailOwnProps {

}


interface IOneReviewTaskDetailStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: TaskReviewStatus[];
    Task: OneTask;
    //Comments: OneTaskReviewComment[];
    CurrentProjectId: number;

}

interface IOneReviewTaskDetailDispatchToProps {
    // UpdateTask: (task: OneTask) => void;
    DeleteTask: (id: number) => void;
    UpdateTaskName: (id: number, text: string) => void;
    UpdateTaskDescription: (id: number, text: string) => void;
    UpdateTaskStatus: (id: number, idStatus: number) => void;
    UpdateTaskExecutor: (id: number, personId: number) => void;
    AddComment: (taskId: number, newCommentText: string) => void;
    // SetEmptyTaskComments: (taskId: number) => void;
    LoadTaskComments: (taskId: number) => void;
    // SetCurrentTask: (taskId: number) => void;
    ClearCurrentTaskState: () => void;

}

export interface IOneReviewTaskDetailProps extends IOneReviewTaskDetailStateToProps, IOneReviewTaskDetailOwnProps, IOneReviewTaskDetailDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneReviewTaskDetailOwnProps) => {
    let res = {} as IOneReviewTaskDetailStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.Statuses = state.CodeReviewApp.CurrentProjectStatuses;
    res.Task = state.CodeReviewApp.CurrentTask;
    res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneReviewTaskDetailOwnProps) => {
    let res = {} as IOneReviewTaskDetailDispatchToProps;
    // res.UpdateTask = (forAdd: OneTask) => {
    //     dispatch(window.G_CodeReviewTaskController.UpdateTaskRedux(forAdd));
    // };

    res.DeleteTask = (taskId: number) => {
        dispatch(window.G_CodeReviewTaskController.DeleteTaskRedux(taskId));
    };

    res.AddComment = (taskId: number, text: string) => {
        dispatch(window.G_CodeReviewCommentController.AddCommentRedux(taskId, text));
    };


    res.LoadTaskComments = (taskId: number) => {
        dispatch(window.G_CodeReviewCommentController.LoadCommentsRedux(taskId))
    };

    // res.SetCurrentTask = (taskId: number) => {
    //     dispatch(SetCurrentTaskIdActionCreator(taskId))
    // };

    res.ClearCurrentTaskState = () => {
        dispatch(ClearCurrentTaskStateActionCreator())
    };


    res.UpdateTaskName = (id: number, text: string) => {
        dispatch(window.G_CodeReviewTaskController.UpdateTaskNameRedux(id, text))
    };

    res.UpdateTaskDescription = (id: number, text: string) => {
        dispatch(window.G_CodeReviewTaskController.UpdateTaskDescriptionRedux(id, text))
    };

    res.UpdateTaskStatus = (id: number, idStatus: number) => {
        dispatch(window.G_CodeReviewTaskController.UpdateTaskStatusRedux(id, idStatus))
    };

    res.UpdateTaskExecutor = (id: number, personId: number) => {
        dispatch(window.G_CodeReviewTaskController.UpdateTaskExecutorRedux(id, personId))
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);