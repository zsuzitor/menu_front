


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Models/State/AppState';
import { ProjectUser } from '../Entity/State/ProjectUser';
import { DeleteProjectUserActionName, AddProjectUserActionName, ChangeProjectUserActionName, SetCurrentProjectUsersActionName } from '../Actions/UserActions';

// return Object.assign({}, state, { TestMessage: str });


export function CodeReviewUserReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case DeleteProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let userId = action.payload as number;
                newState.CodeReviewApp.CurrentProjectUsers = newState.CodeReviewApp.CurrentProjectUsers
                    .filter(x => x.Id != userId);
                return newState;
            }

        case AddProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let user = action.payload as ProjectUser;
                newState.CodeReviewApp.CurrentProjectUsers.push(user);
                return newState;
            }

        case ChangeProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let user = action.payload as ProjectUser;
                let userState = newState.CodeReviewApp.CurrentProjectUsers.find(x => x.Id === user.Id);
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
                newState.CodeReviewApp.CurrentProjectUsers = users;
                return newState;
            }




        default:
            return state;
    }
}