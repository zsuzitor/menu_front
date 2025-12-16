


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { AddTaskToProjectActionName, AddLoadTriggerActionName, UpdateTaskActionName, LoadTasksActionName, DeleteTaskActionName, SetFilterTaskCreatorActionName, SetFilterTaskExecutorActionName, SetFilterTaskNameActionName, SetFilterTaskPageActionName, SetFilterTaskStatusActionName, SetFilterTaskActionName, SetCurrentTaskIdActionName, LoadTaskActionName, ClearCurrentTaskStateActionName, UpdateTaskNameActionName, UpdateTaskNameActionParam, UpdateTaskDescriptionActionName, UpdateTaskDescriptionActionParam, UpdateTaskStatusActionName, UpdateTaskStatusActionParam, UpdateTaskExecutorActionName, UpdateTaskExecutorActionParam, SetFilterTaskSprintActionName, SetFilterTaskLabelActionName, AddTaskRelationStateActionName, DeleteTaskRelationStateActionName, LoadTaskRelationStateActionName, SetFilterTaskPresetActionName } from '../Actions/TaskActions';
import { LoadWorkTasksResult } from '../Entity/LoadWorkTasksResult';
import { OneTask } from '../Entity/State/OneTask';
import { TasksFilter } from '../Entity/State/TasksFilter';
import { Helper } from '../../../../Models/BL/Helper';
import { TaskRelation } from '../Entity/State/TaskRelation';


export function TaskManagementTaskReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case AddTaskToProjectActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as OneTask;
                newState.TaskManagementApp.CurrentProjectTasks.push(payload);
                return newState;
            }
        case AddLoadTriggerActionName:
            {
                let newState = cloneDeep(state);
                newState.TaskManagementApp.CurrentProjectTasksFilters.Retrigger++;
                return newState;
            }
        case UpdateTaskActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as OneTask;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.Id);
                tasks.forEach(tsk => {
                    tsk.Name = payload.Name;
                    tsk.StatusId = payload.StatusId;
                    tsk.ExecutorId = payload.ExecutorId;
                    tsk.CreatorId = payload.CreatorId;
                    tsk.CreateDate = payload.CreateDate;
                    tsk.LastUpdateDate = payload.LastUpdateDate;
                    tsk.Description = payload.Description;
                });


                return newState;
            }
        case LoadTasksActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as LoadWorkTasksResult;
                newState.TaskManagementApp.CurrentProjectTasks = payload.Tasks;
                newState.TaskManagementApp.CurrentProjectTasksAllCount = payload.TasksCount;
                return newState;
            }
        case DeleteTaskActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasks
                    = newState.TaskManagementApp.CurrentProjectTasks.filter(x => x.Id !== payload);

                return newState;
            }
        case SetFilterTaskCreatorActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasksFilters.CreatorId = payload;
                return newState;
            }
        case SetFilterTaskExecutorActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasksFilters.ExecutorId = payload;
                return newState;
            }
        case SetFilterTaskNameActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as string;
                newState.TaskManagementApp.CurrentProjectTasksFilters.TaskName = payload;
                return newState;
            }
        case SetFilterTaskPageActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasksFilters.Page = payload;
                return newState;
            }
        case SetFilterTaskStatusActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasksFilters.Status = payload;
                return newState;
            }

        case SetFilterTaskSprintActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasksFilters.Sprint = payload;
                return newState;
            }
        case SetFilterTaskPresetActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentProjectTasksFilters.Preset = payload;
                return newState;
            }

        case SetFilterTaskLabelActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number[];
                newState.TaskManagementApp.CurrentProjectTasksFilters.Labels = payload;
                return newState;
            }


        case SetFilterTaskActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as TasksFilter;
                newState.TaskManagementApp.CurrentProjectTasksFilters = payload;

                return newState;
            }

        case SetCurrentTaskIdActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentTaskId = payload;

                return newState;
            }

        case LoadTaskActionName: {

            let newState = cloneDeep(state);
            let payload = action.payload as OneTask;
            newState.TaskManagementApp.CurrentTask = payload;

            return newState;
        }


        case ClearCurrentTaskStateActionName: {

            let newState = cloneDeep(state);
            newState.TaskManagementApp.CurrentTaskId = -1;
            newState.TaskManagementApp.CurrentTask = null;

            return newState;
        }


        case UpdateTaskNameActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskNameActionParam;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.Id);
                tasks.forEach(tsk => {
                    tsk.Name = payload.Text;
                });

                return newState;
            }

        case UpdateTaskDescriptionActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskDescriptionActionParam;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.Id);
                tasks.forEach(tsk => {
                    tsk.Description = payload.Text;
                });

                return newState;
            }

        case UpdateTaskStatusActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskStatusActionParam;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.Id);
                tasks.forEach(tsk => {
                    tsk.StatusId = payload.IdStatus;
                });

                return newState;
            }

        case UpdateTaskExecutorActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskExecutorActionParam;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.Id);
                tasks.forEach(tsk => {
                    tsk.ExecutorId = payload.PersonId;
                });

                return newState;
            }

        case AddTaskRelationStateActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as TaskRelation;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.MainWorkTaskId);
                tasks.forEach(tsk => {
                    tsk.Relations = [...tsk.Relations, payload];
                });
                tasks = helper.GetTaskFromState(newState, payload.SubWorkTaskId);
                tasks.forEach(tsk => {
                    tsk.Relations = [...tsk.Relations, payload];
                });

                return newState;
            }

        case DeleteTaskRelationStateActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                let helper = new Helper();
                var tasks = helper.GetAllTaskFromState(newState);
                tasks.forEach(tsk => {
                    tsk.Relations = tsk.Relations.filter(x => x.Id != payload);
                });

                return newState;
            }
        case LoadTaskRelationStateActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as TaskRelation[];
                let helper = new Helper();
                var tasks = helper.GetAllTaskFromState(newState);
                tasks.forEach(tsk => {
                    tsk.Relations = payload;
                });

                return newState;
            }



        default:
            return state;
    }
    return state;
}