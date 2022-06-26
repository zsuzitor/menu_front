import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { IOneProjectInListDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInListDataBack";



import cloneDeep from 'lodash/cloneDeep';
import { AddNewProjectActionName, DeleteProjectActionName, SetCurrentProjectIdActionName, SetCurrentProjectUsersActionName, SetProjectsActionName } from "../../Actions/CodeReviewApp/ProjectActions";

// return Object.assign({}, state, { TestMessage: str });


export function CodeReviewProjectReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case DeleteProjectActionName:
            {
                let newState = cloneDeep(state);
                let projectId = action.payload as number;
                newState.CodeReviewApp.ProjectsList = newState.CodeReviewApp.ProjectsList
                    .filter(x => x.Id != projectId);
                if (newState.CodeReviewApp.CurrentProjectId === projectId) {
                    newState.CodeReviewApp.CurrentProjectId = -1;
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
        case AddNewProjectActionName:
            {
                let newState = cloneDeep(state);
                let proj = action.payload as IOneProjectInListDataBack;
                newState.CodeReviewApp.ProjectsList.push(proj);
                return newState;
            }

        case SetCurrentProjectIdActionName:
            {
                let newState = cloneDeep(state);
                let projectId = action.payload as number;
                newState.CodeReviewApp.CurrentProjectId = projectId;
                return newState;
            }
        case SetProjectsActionName:
            {
                let newState = cloneDeep(state);
                let projects = action.payload as IOneProjectInListDataBack[];
                newState.CodeReviewApp.ProjectsList = projects;
                return newState;
            }



        default:
            return state;
    }
}