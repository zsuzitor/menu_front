


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { CreateCurrentProjectTaskStatusActionName, DeleteCurrentProjectTaskStatusActionName, SetCurrentProjectStatusesActionName, UpdateCurrentProjectTaskStatusActionName } from '../Actions/TaskStatusActions';
import { WorkTaskStatus } from '../Entity/State/WorkTaskStatus';

// return Object.assign({}, state, { TestMessage: str });


export function TaskManagementTaskStatusReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {


        case SetCurrentProjectStatusesActionName: {

            let newState = cloneDeep(state);
            let statuses = action.payload as WorkTaskStatus[];
            newState.TaskManagementApp.CurrentProjectStatuses = [...statuses];

            return newState;
        }
        case DeleteCurrentProjectTaskStatusActionName: {

            let newState = cloneDeep(state);
            let statusId = action.payload as number;
            newState.TaskManagementApp.CurrentProjectStatuses = newState.TaskManagementApp.CurrentProjectStatuses
                .filter(x => x.Id != statusId);

            return newState;
        }
        case CreateCurrentProjectTaskStatusActionName: {

            let newState = cloneDeep(state);
            let status = action.payload as WorkTaskStatus;
            newState.TaskManagementApp.CurrentProjectStatuses.push(status);

            return newState;
        }

        case UpdateCurrentProjectTaskStatusActionName: {

            let newState = cloneDeep(state);
            let status = action.payload as WorkTaskStatus;
            var old = newState.TaskManagementApp.CurrentProjectStatuses.find(x => x.Id == status.Id);
            if (old) {
                old.Name = status.Name;
            }
            return newState;
        }




        default:
            return state;
    }
    return state;
}