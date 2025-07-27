import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { AddTaskToSprintActionName, CreateSprintActionName, DeleteSprintActionName, DeleteTaskFromSprintActionName, GetProjectSprintsActionName, GetProjectSprintsActionType, GetSprintsTasksActionName, SetCurrentSprintActionName, TaskIdWithSprintIdActionType } from "../Actions/SprintActions";
import { OneTask } from "../Entity/State/OneTask";
import { ProjectSprint } from "../Entity/State/ProjectSprint";
import { SprintInfo } from "../Entity/State/SprintInfo";
import { Helper } from "../../../../Models/BL/Helper";


export function TaskManagementSprintReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {

        case SetCurrentSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as number;
                if (data && data > 0) {

                    newState.TaskManagementApp.CurrentSprint = new SprintInfo();
                    newState.TaskManagementApp.CurrentSprint.Id = data;
                }
                else {
                    newState.TaskManagementApp.CurrentSprint = null;
                }

                return newState;
            }

        case GetProjectSprintsActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as GetProjectSprintsActionType;
                newState.TaskManagementApp.CurrentProjectSprints = data.data;

                return newState;
            }
        case GetSprintsTasksActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as OneTask[];
                newState.TaskManagementApp.CurrentSprint.Tasks = data;

                return newState;
            }
        case CreateSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as ProjectSprint;
                newState.TaskManagementApp.CurrentProjectSprints.push(data);

                return newState;
            }
        case DeleteSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as number;
                newState.TaskManagementApp.CurrentProjectSprints
                    = newState.TaskManagementApp.CurrentProjectSprints
                        .filter(x => x.Id != data);
                return newState;
            }
        case AddTaskToSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskIdWithSprintIdActionType;
                let dt = new OneTask();
                dt.Id = data.taskId;
                dt.SprintId = data.sprintId;
                if (newState.TaskManagementApp.CurrentSprint?.Id) {
                    newState.TaskManagementApp.CurrentSprint.Tasks.push(dt);//добавляем пустую, чтот бы тригером перезагрузить список
                }

                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.taskId);
                tasks.forEach(tsk => {
                    tsk.SprintId = data.sprintId;
                });

                return newState;
            }
        case DeleteTaskFromSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskIdWithSprintIdActionType
                if (newState.TaskManagementApp.CurrentSprint?.Id) {
                    newState.TaskManagementApp.CurrentSprint.Tasks
                        = newState.TaskManagementApp.CurrentSprint.Tasks
                            .filter(x => x.Id != data.taskId);
                }

                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.taskId);
                tasks.forEach(tsk => {
                    tsk.SprintId = data.sprintId;
                });

                return newState;
            }



        default:
            return state;
    }
    return state;
}