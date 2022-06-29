import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";



import cloneDeep from 'lodash/cloneDeep';
import { AddProjectUserActionName, ChangeProjectUserActionName, DeleteProjectUserActionName, SetCurrentProjectUsersActionName } from "../../Actions/CodeReviewApp/UserActions";

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
                let user = action.payload as IProjectUserDataBack;
                newState.CodeReviewApp.CurrentProjectUsers.push(user);
                return newState;
            }

        case ChangeProjectUserActionName:
            {
                let newState = cloneDeep(state);
                let user = action.payload as IProjectUserDataBack;
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
                let users = action.payload as IProjectUserDataBack[];
                newState.CodeReviewApp.CurrentProjectUsers = users;
                return newState;
            }




        default:
            return state;
    }
}