


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ProjectUser } from '../Entity/State/ProjectUser';
import { DeleteProjectUserActionName, AddProjectUserActionName, ChangeProjectUserActionName, SetCurrentProjectUsersActionName } from '../Actions/UserActions';
import { CreateCurrentProjectTaskStatusActionName, DeleteCurrentProjectTaskStatusActionName, SetCurrentProjectStatusesActionName, UpdateCurrentProjectTaskStatusActionName } from '../Actions/TaskStatusActions';
import { TaskReviewStatus } from '../Entity/State/TaskReviewStatus';

// return Object.assign({}, state, { TestMessage: str });


export function CodeReviewTaskStatusReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {


        case SetCurrentProjectStatusesActionName: {

            let newState = cloneDeep(state);
            let statuses = action.payload as TaskReviewStatus[];
            newState.CodeReviewApp.CurrentProjectStatuses = [...statuses];

            return newState;
        }
        case DeleteCurrentProjectTaskStatusActionName: {

            let newState = cloneDeep(state);
            let statusId = action.payload as number;
            newState.CodeReviewApp.CurrentProjectStatuses = newState.CodeReviewApp.CurrentProjectStatuses
                .filter(x => x.Id != statusId);

            return newState;
        }
        case CreateCurrentProjectTaskStatusActionName: {

            let newState = cloneDeep(state);
            let status = action.payload as TaskReviewStatus;
            newState.CodeReviewApp.CurrentProjectStatuses.push(status);

            return newState;
        }

        case UpdateCurrentProjectTaskStatusActionName: {

            let newState = cloneDeep(state);
            let status = action.payload as TaskReviewStatus;
            var old = newState.CodeReviewApp.CurrentProjectStatuses.find(x => x.Id == status.Id);
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