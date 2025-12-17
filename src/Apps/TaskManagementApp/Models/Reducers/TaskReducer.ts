


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { AddTaskToProjectActionName, AddLoadTriggerActionName, UpdateTaskActionName, LoadTasksActionName, DeleteTaskActionName, SetFilterTaskCreatorActionName, SetFilterTaskExecutorActionName, SetFilterTaskNameActionName, SetFilterTaskPageActionName, SetFilterTaskStatusActionName, SetFilterTaskActionName, SetCurrentTaskIdActionName, LoadTaskActionName, ClearCurrentTaskStateActionName, UpdateTaskNameActionName, UpdateTaskNameActionParam, UpdateTaskDescriptionActionName, UpdateTaskDescriptionActionParam, UpdateTaskStatusActionName, UpdateTaskStatusActionParam, UpdateTaskExecutorActionName, UpdateTaskExecutorActionParam, SetFilterTaskSprintActionName, SetFilterTaskLabelActionName, AddTaskRelationStateActionName, DeleteTaskRelationStateActionName, LoadTaskRelationStateActionName, SetFilterTaskPresetActionName } from '../Actions/TaskActions';
import { LoadWorkTasksResult } from '../Entity/LoadWorkTasksResult';
import { OneTask } from '../Entity/State/OneTask';
import { TasksFilter } from '../Entity/State/TasksFilter';
import { Helper } from '../../../../Models/BL/Helper';
import { TaskRelation } from '../Entity/State/TaskRelation';
import { OneTaskInList } from '../Entity/State/OneTaskInList';


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
                let payload = action.payload as OneTaskInList;

                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.Id) {
                    task.Name = payload.Name;
                    task.StatusId = payload.StatusId;
                    task.ExecutorId = payload.ExecutorId;
                    task.CreatorId = payload.CreatorId;
                    task.CreateDate = payload.CreateDate;

                }

                var taskList = newState.TaskManagementApp.CurrentProjectTasks.find(x => x.Id == payload.Id);
                if (taskList) {
                    taskList.Name = payload.Name;
                    taskList.StatusId = payload.StatusId;
                    taskList.ExecutorId = payload.ExecutorId;
                    taskList.CreatorId = payload.CreatorId;
                    taskList.CreateDate = payload.CreateDate;

                }

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
                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.Id) {
                    task.Name = payload.Text;

                }


                var taskList = newState.TaskManagementApp.CurrentProjectTasks.find(x => x.Id == payload.Id);
                if (taskList)
                    taskList.Name = payload.Text;

          

                return newState;
            }

        case UpdateTaskDescriptionActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskDescriptionActionParam;

                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.Id) {
                    task.Description = payload.Text;

                }
            
                return newState;
            }

        case UpdateTaskStatusActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskStatusActionParam;
                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.Id) {
                    task.StatusId = payload.IdStatus;

                }

                var taskList = newState.TaskManagementApp.CurrentProjectTasks.find(x => x.Id == payload.Id);
                if (taskList)
                    taskList.StatusId = payload.IdStatus;
          

                return newState;
            }

        case UpdateTaskExecutorActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskExecutorActionParam;
                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.Id) {
                    task.ExecutorId = payload.PersonId;
                }

                var taskList = newState.TaskManagementApp.CurrentProjectTasks.find(x => x.Id == payload.Id);
                if (taskList)
                    taskList.ExecutorId = payload.PersonId;
            

                return newState;
            }

        case AddTaskRelationStateActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as TaskRelation;
                let task = newState.TaskManagementApp.CurrentTask;
                if (task?.Id == payload.MainWorkTaskId || task?.Id == payload.SubWorkTaskId) {
                    task.Relations = [...task.Relations, payload];
                }

          

                return newState;
            }

        case DeleteTaskRelationStateActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                let helper = new Helper();
                newState.TaskManagementApp.CurrentTask.Relations
                    = newState.TaskManagementApp.CurrentTask.Relations.filter(x => x.Id != payload);
              

                return newState;
            }
        case LoadTaskRelationStateActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as TaskRelation[];
                let helper = new Helper();
                newState.TaskManagementApp.CurrentTask.Relations = payload;
            

                return newState;
            }



        default:
            return state;
    }
    return state;
}