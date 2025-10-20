import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneTask } from "../../Models/Entity/State/OneTask";
import { ProjectUser } from "../../Models/Entity/State/ProjectUser";
import { WorkTaskStatus } from "../../Models/Entity/State/WorkTaskStatus";
import { ClearCurrentTaskStateActionCreator, SetCurrentTaskIdActionCreator } from "../../Models/Actions/TaskActions";
import { ProjectSprint } from "../../Models/Entity/State/ProjectSprint";
import { TaskLabel } from "../../Models/Entity/State/TaskLabel";


interface IOneWorkTaskDetailOwnProps {

}


interface IOneWorkTaskDetailStateToProps {
    ProjectUsers: ProjectUser[];
    Statuses: WorkTaskStatus[];
    Sprints: ProjectSprint[];
    Labels: TaskLabel[];
    Task: OneTask;
    CurrentProjectId: number;

}

interface IOneWorkTaskDetailDispatchToProps {
    // UpdateTask: (task: OneTask) => void;
    DeleteTask: (id: number) => void;
    LoadTaskTimeLogs: (id: number) => void;
    UpdateTaskName: (id: number, text: string) => void;
    UpdateTaskDescription: (id: number, text: string) => void;
    UpdateTaskStatus: (id: number, idStatus: number) => void;
    // AddTaskSprint: (id: number, idSprint: number) => void;
    UpdateTaskSprints: (id: number, idSprint: number[]) => void;
    UpdateTaskLabels: (id: number, idLabel: number[]) => void;
    // DeleteTaskSprint: (id: number, idSprint: number) => void;
    UpdateTaskExecutor: (id: number, personId: number) => void;
    AddComment: (taskId: number, newCommentText: string) => void;
    // SetEmptyTaskComments: (taskId: number) => void;
    // LoadTaskComments: (taskId: number) => void;
    // SetCurrentTask: (taskId: number) => void;
    ClearCurrentTaskState: () => void;
    CreateTimeLog: (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => void;

}

export interface IOneWorkTaskDetailProps extends IOneWorkTaskDetailStateToProps, IOneWorkTaskDetailOwnProps, IOneWorkTaskDetailDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneWorkTaskDetailOwnProps) => {
    let res = {} as IOneWorkTaskDetailStateToProps;
    res.ProjectUsers = state.TaskManagementApp.CurrentProjectUsers;
    res.Statuses = state.TaskManagementApp.CurrentProjectStatuses;
    res.Task = state.TaskManagementApp.CurrentTask;
    res.CurrentProjectId = state.TaskManagementApp.CurrentProjectId;
    res.Sprints = state.TaskManagementApp.CurrentProjectSprints;
    res.Labels = state.TaskManagementApp.CurrentProjectLabels;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneWorkTaskDetailOwnProps) => {
    let res = {} as IOneWorkTaskDetailDispatchToProps;

    res.DeleteTask = (taskId: number) => {
        dispatch(window.G_TaskManagementTaskController.DeleteTaskRedux(taskId));
    };

    res.AddComment = (taskId: number, text: string) => {
        dispatch(window.G_TaskManagementCommentController.AddCommentRedux(taskId, text));
    };


    // res.LoadTaskComments = (taskId: number) => {
    //     dispatch(window.G_TaskManagementCommentController.LoadCommentsRedux(taskId))
    // };

    // res.SetCurrentTask = (taskId: number) => {
    //     dispatch(SetCurrentTaskIdActionCreator(taskId))
    // };

    res.ClearCurrentTaskState = () => {
        dispatch(ClearCurrentTaskStateActionCreator())
    };


    res.UpdateTaskName = (id: number, text: string) => {
        dispatch(window.G_TaskManagementTaskController.UpdateTaskNameRedux(id, text))
    };

    res.UpdateTaskDescription = (id: number, text: string) => {
        dispatch(window.G_TaskManagementTaskController.UpdateTaskDescriptionRedux(id, text))
    };

    res.UpdateTaskStatus = (id: number, idStatus: number) => {
        dispatch(window.G_TaskManagementTaskController.UpdateTaskStatusRedux(id, idStatus))
    };

    // res.AddTaskSprint = (id: number, idSprint: number) => {
    //     dispatch(window.G_TaskManagementSprintController.AddTaskToSprintRedux(idSprint, id))
    // };
    // res.DeleteTaskSprint = (id: number, idSprint: number) => {
    //     dispatch(window.G_TaskManagementSprintController.DeleteTaskFromSprintRedux(id, idSprint))
    // };

    res.UpdateTaskSprints = (id: number, idSprint: number[]) => {
        dispatch(window.G_TaskManagementSprintController.UpdateTaskFromSprintRedux(id, idSprint))
    };
    res.UpdateTaskLabels = (id: number, idLabel: number[]) => {
        dispatch(window.G_TaskManagementLabelController.UpdateTaskLabelsRedux(id, idLabel))
    };


    res.UpdateTaskExecutor = (id: number, personId: number) => {
        dispatch(window.G_TaskManagementTaskController.UpdateTaskExecutorRedux(id, personId))
    };

    res.LoadTaskTimeLogs = (id: number) => {
        dispatch(window.G_TaskManagementWorkTimeController.LoadTimeLogsForTaskRedux(id))
    };


    res.CreateTimeLog = (taskId: number, text: string, minutes: number, dayOfLog: Date, rangeEndOfLog: Date, rangeStartOfLog: Date) => {
        dispatch(window.G_TaskManagementWorkTimeController.CreateTimeLogRedux(taskId, text, minutes, dayOfLog, rangeEndOfLog, rangeStartOfLog))
    };


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);