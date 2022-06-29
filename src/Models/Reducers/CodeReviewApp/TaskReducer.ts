import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { AddLoadTriggerActionName, AddTaskToProjectActionName, DeleteTaskActionName, LoadTasksActionName, SetFilterTaskActionName, SetFilterTaskCreatorActionName, SetFilterTaskNameActionName, SetFilterTaskPageActionName, SetFilterTaskReviewerName, SetFilterTaskStatusActionName, UpdateTaskActionName } from "../../Actions/CodeReviewApp/TaskActions";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { OneTask } from "../../Models/CodeReviewApp/State/OneTask";
import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";
import { TasksFilter } from "../../Models/CodeReviewApp/State/TasksFilter";


export function CodeReviewTaskReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case AddTaskToProjectActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as IProjectTaskDataBack;
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
                let payload = action.payload as IProjectTaskDataBack;
                var tsk = newState.CodeReviewApp.CurrentProjectTasks.find(x => x.Id == payload.Id);
                tsk.Name = payload.Name;
                tsk.Status = payload.Status;
                tsk.ReviewerId = payload.ReviewerId;
                tsk.CreatorId = payload.CreatorId;
                return newState;
            }
        case LoadTasksActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as ILoadReviewTasksResultDataBack;
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



        default:
            return state;
    }
}