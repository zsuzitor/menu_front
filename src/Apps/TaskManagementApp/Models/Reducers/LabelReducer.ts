import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TaskLabel } from "../Entity/State/TaskLabel";
import { AddLabelToTaskActionName, CreateProjectLabelActionName, DeleteLabelFromTaskActionDataType, DeleteLabelFromTaskActionName, DeleteProjectLabelActionName, GetTaskLabelsActionName, UpdateProjectLabelActionName, UpdateTaskLabelActionDataType, UpdateTaskLabelsActionDataType, UpdateTaskLabelsActionName } from "../Actions/LabelActions";
import { Helper } from "../../../../Models/BL/Helper";


export function TaskManagementLabelReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {


        case GetTaskLabelsActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskLabel[];
                newState.TaskManagementApp.CurrentProjectLabels = data;

                return newState;
            }
        case CreateProjectLabelActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskLabel;
                newState.TaskManagementApp.CurrentProjectLabels = [...newState.TaskManagementApp.CurrentProjectLabels, data];

                return newState;
            }
        case UpdateProjectLabelActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskLabel;
                let prev = newState.TaskManagementApp.CurrentProjectLabels.find(x => x.Id === data.Id);
                prev.Name = data.Name;
                prev.ProjectId = data.ProjectId;

                return newState;
            }
        case DeleteProjectLabelActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as number;
                newState.TaskManagementApp.CurrentProjectLabels
                    = newState.TaskManagementApp.CurrentProjectLabels.filter(x => x.Id != data);

                return newState;
            }
        case UpdateTaskLabelsActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as UpdateTaskLabelsActionDataType;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.TaskId);
                tasks.forEach(tsk => {
                    tsk.LabelId = data.LabelId;
                });

                return newState;
            }
        case AddLabelToTaskActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as UpdateTaskLabelActionDataType;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.TaskId);
                tasks.forEach(tsk => {
                    if (!tsk.LabelId.find(x => x == data.LabelId))
                        tsk.LabelId = [...tsk.LabelId, data.LabelId];
                });

                return newState;
            }

        case DeleteLabelFromTaskActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as DeleteLabelFromTaskActionDataType;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.TaskId);
                tasks.forEach(tsk => {
                    tsk.LabelId = tsk.LabelId.filter(x => x != data.LabelId);
                });

                return newState;
            }

        default:
            return state;
    }
    return state;
}