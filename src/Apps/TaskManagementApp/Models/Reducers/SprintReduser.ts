import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { AddTaskToSprintActionName, CreateSprintActionName, DeleteSprintActionName, DeleteTaskFromSprintActionName, GetProjectSprintsActionName, GetProjectSprintsActionType, GetSprintsTasksActionName, SetCurrentSprintActionName, TaskIdWithSprintIdActionType, TaskIdWithSprintIdsActionType, UpdateSprintActionName, UpdateTaskSprintActionName } from "../Actions/SprintActions";
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
        case UpdateSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as ProjectSprint;
                let sprint = newState.TaskManagementApp.CurrentProjectSprints.find(x => x.Id == data.Id);
                if (sprint) {
                    sprint.Name = data.Name;
                    sprint.EndDate = data.EndDate;
                    sprint.StartDate = data.StartDate;
                }

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
                dt.SprintId = [...dt.SprintId, data.sprintId];
                if (newState.TaskManagementApp.CurrentSprint?.Id) {
                    newState.TaskManagementApp.CurrentSprint.Tasks.push(dt);//добавляем пустую, чтот бы тригером перезагрузить список
                }

                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.taskId);
                tasks.forEach(tsk => {
                    tsk.SprintId = [...tsk.SprintId, data.sprintId];
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
                    tsk.SprintId = [...tsk.SprintId, data.sprintId];
                });

                return newState;
            }

        case UpdateTaskSprintActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskIdWithSprintIdsActionType
                if (newState.TaskManagementApp.CurrentSprint?.Id) {
                    let s = data.sprintId.find(x => x == newState.TaskManagementApp.CurrentSprint?.Id);
                    if (s) {
                        //задача либо добавлена либо остается в текущем спринте
                        let t = newState.TaskManagementApp.CurrentSprint.Tasks
                            .find(x => x.Id = data.taskId);
                        if (t) {
                            //задачи нет, значит добавлена новая
                            let dt = new OneTask();
                            dt.Id = data.taskId;
                            dt.SprintId = [...data.sprintId];
                            newState.TaskManagementApp.CurrentSprint.Tasks.push(dt);//добавляем пустую, чтот бы тригером перезагрузить список
                        }
                        else {
                            //задача есть ничего не делаем
                        }
                    }
                    else {
                        newState.TaskManagementApp.CurrentSprint.Tasks
                            = newState.TaskManagementApp.CurrentSprint.Tasks
                                .filter(x => x.Id != data.taskId);
                    }
                }

                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, data.taskId);
                tasks.forEach(tsk => {
                    tsk.SprintId = [...data.sprintId];
                });

                return newState;
            }




        default:
            return state;
    }
    return state;
}