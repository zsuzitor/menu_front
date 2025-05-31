


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { AddTaskToProjectActionName, AddLoadTriggerActionName, UpdateTaskActionName, LoadTasksActionName, DeleteTaskActionName, SetFilterTaskCreatorActionName, SetFilterTaskReviewerName, SetFilterTaskNameActionName, SetFilterTaskPageActionName, SetFilterTaskStatusActionName, SetFilterTaskActionName, SetCurrentTaskIdActionName, LoadTaskActionName, ClearCurrentTaskStateActionName, UpdateTaskNameActionName, UpdateTaskNameActionParam, UpdateTaskDescriptionActionName, UpdateTaskDescriptionActionParam, UpdateTaskStatusActionName, UpdateTaskStatusActionParam, UpdateTaskExecutorActionName, UpdateTaskExecutorActionParam } from '../Actions/TaskActions';
import { ProjectTaskData, LoadReviewTasksResult } from '../Entity/LoadReviewTasksResult';
import { OneTask } from '../Entity/State/OneTask';
import { TasksFilter } from '../Entity/State/TasksFilter';
import { Helper } from '../../../../Models/BL/Helper';


export function CodeReviewTaskReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case AddTaskToProjectActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as ProjectTaskData;
                let tsk = new OneTask();
                tsk.FillByIProjectTaskDataBack(payload);
                newState.CodeReviewApp.CurrentProjectTasks.push(tsk);
                return newState;
            }
        case AddLoadTriggerActionName:
            {
                let newState = cloneDeep(state);
                newState.CodeReviewApp.CurrentProjectTasksFilters.Retrigger++;
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
                    tsk.ReviewerId = payload.ReviewerId;
                    tsk.CreatorId = payload.CreatorId;
                    tsk.CreateDate = payload.CreateDate;
                    tsk.LastUpdateDate = payload.LastUpdateDate;
                    tsk.Description = payload.Description;
                })


                return newState;
            }
        case LoadTasksActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as LoadReviewTasksResult;
                newState.CodeReviewApp.CurrentProjectTasks = payload.Tasks.map(x => {
                    let tsk = new OneTask();
                    tsk.FillByIProjectTaskDataBack(x);
                    return tsk;
                });
                newState.CodeReviewApp.CurrentProjectTasksAllCount = payload.TasksCount;
                return newState;
            }
        case DeleteTaskActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.CodeReviewApp.CurrentProjectTasks
                    = newState.CodeReviewApp.CurrentProjectTasks.filter(x => x.Id !== payload);

                return newState;
            }
        case SetFilterTaskCreatorActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.CodeReviewApp.CurrentProjectTasksFilters.CreatorId = payload;
                return newState;
            }
        case SetFilterTaskReviewerName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.CodeReviewApp.CurrentProjectTasksFilters.ReviewerId = payload;
                return newState;
            }
        case SetFilterTaskNameActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as string;
                newState.CodeReviewApp.CurrentProjectTasksFilters.TaskName = payload;
                return newState;
            }
        case SetFilterTaskPageActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.CodeReviewApp.CurrentProjectTasksFilters.Page = payload;
                return newState;
            }
        case SetFilterTaskStatusActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.CodeReviewApp.CurrentProjectTasksFilters.Status = payload;
                return newState;
            }
        case SetFilterTaskActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as TasksFilter;
                newState.CodeReviewApp.CurrentProjectTasksFilters = payload;

                return newState;
            }

        case SetCurrentTaskIdActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.CodeReviewApp.CurrentTaskId = payload;

                return newState;
            }

        case LoadTaskActionName: {

            let newState = cloneDeep(state);
            let payload = action.payload as ProjectTaskData;
            newState.CodeReviewApp.CurrentTask = new OneTask().FillByProjectTaskData(payload);

            return newState;
        }


        case ClearCurrentTaskStateActionName: {

            let newState = cloneDeep(state);
            newState.CodeReviewApp.CurrentTaskId = -1;
            newState.CodeReviewApp.CurrentTask = null;

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
                })

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
                })

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
                })

                return newState;
            }

        case UpdateTaskExecutorActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as UpdateTaskExecutorActionParam;
                let helper = new Helper();
                var tasks = helper.GetTaskFromState(newState, payload.Id);
                tasks.forEach(tsk => {
                    tsk.ReviewerId = payload.PersonId;
                })

                return newState;
            }

        default:
            return state;
    }
    return state;
}