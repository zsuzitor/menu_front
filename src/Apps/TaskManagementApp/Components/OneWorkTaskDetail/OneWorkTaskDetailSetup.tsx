import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { ClearCurrentTaskStateActionCreator, SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";


interface IOneWorkTaskDetailOwnProps {

}


interface IOneWorkTaskDetailStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: WorkTaskStatus[];
    Task: OneTask;
    //Comments: OneTaskReviewComment[];
    CurrentProjectId: number;

}

interface IOneWorkTaskDetailDispatchToProps {
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

export interface IOneWorkTaskDetailProps extends IOneWorkTaskDetailStateToProps, IOneWorkTaskDetailOwnProps, IOneWorkTaskDetailDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneWorkTaskDetailOwnProps) => {
    let res = {} as IOneWorkTaskDetailStateToProps;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    res.Statuses = state.CodeReviewApp.CurrentProjectStatuses;
    res.Task = state.CodeReviewApp.CurrentTask;
    res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneWorkTaskDetailOwnProps) => {
    let res = {} as IOneWorkTaskDetailDispatchToProps;
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