import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { AddLoadTriggerActionName, AddTaskToProjectActionName, DeleteTaskActionName, LoadTasksActionName, SetFilterTaskCreatorActionName, SetFilterTaskNameActionName, SetFilterTaskPageActionName, SetFilterTaskReviewerName, SetFilterTaskStatusActionName, UpdateTaskActionName } from "../../Actions/CodeReviewApp/TaskActions";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";


export function CodeReviewTaskReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case AddTaskToProjectActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case AddLoadTriggerActionName:
            {
                let newState = cloneDeep(state);

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

                return newState;
            }
        case DeleteTaskActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case SetFilterTaskCreatorActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case SetFilterTaskReviewerName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case SetFilterTaskNameActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case SetFilterTaskPageActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        case SetFilterTaskStatusActionName:
            {
                let newState = cloneDeep(state);

                return newState;
            }
        

        default:
            return state;
    }
}