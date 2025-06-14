


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ProjectUser } from '../Entity/State/ProjectUser';
import { DeleteProjectUserActionName, AddProjectUserActionName, ChangeProjectUserActionName, SetCurrentProjectUsersActionName, SetCurrentUserIdActionName } from '../Actions/UserActions';
import { ProjectTimes } from '../Entity/State/ProjectTimes';

// return Object.assign({}, state, { TestMessage: str });


export function TaskManagementUserReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case DeleteProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let userId = action.payload as number;
                newState.TaskManagementApp.CurrentProjectUsers = newState.TaskManagementApp.CurrentProjectUsers
                    .filter(x => x.Id != userId);
                return newState;
            }

        case AddProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let user = action.payload as ProjectUser;
                newState.TaskManagementApp.CurrentProjectUsers.push(user);
                return newState;
            }

        case ChangeProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let user = action.payload as ProjectUser;
                let userState = newState.TaskManagementApp.CurrentProjectUsers.find(x => x.Id === user.Id);
                if (userState) {
                    userState.Email = user.Email;
                    userState.Name = user.Name;
                    userState.IsAdmin = user.IsAdmin;
                    userState.Deactivated = user.Deactivated;
                }

                return newState;
            }
        case SetCurrentProjectUsersActionName:
            {
                let newState = cloneDeep(state);
                let users = action.payload as ProjectUser[];
                newState.TaskManagementApp.CurrentProjectUsers = users || [];
                return newState;
            }

        case SetCurrentUserIdActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.TaskManagementApp.CurrentUserId = payload;
                newState.TaskManagementApp.PersonTimes = new ProjectTimes();
                return newState;
            }




        default:
            return state;
    }
    return state;
}