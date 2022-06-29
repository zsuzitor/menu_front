import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { IOneProjectInListDataBack } from "../../BackModel/CodeReviewApp/IOneProjectInListDataBack";



import cloneDeep from 'lodash/cloneDeep';
import { AddNewProjectActionName, DeleteProjectActionName, SetCurrentProjectIdActionName, SetProjectsActionName } from "../../Actions/CodeReviewApp/ProjectActions";
import { SetCurrentProjectUsersActionCreator } from "../../Actions/CodeReviewApp/UserActions";
import { AppReducer } from "../Reducer";
import { LoadTasksActionCreator, SetFilterTaskActionCreator } from "../../Actions/CodeReviewApp/TaskActions";
import { TasksFilter } from "../../Models/CodeReviewApp/State/TasksFilter";
import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";

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

                if (newState.CodeReviewApp.CurrentProjectId === projectId) {
                    //todo тут куча копирований стейта
                    newState = AppReducer(newState, SetCurrentProjectUsersActionCreator([]));
                    let tasks = {} as ILoadReviewTasksResultDataBack;
                    tasks.Tasks = [];
                    tasks.TasksCount = 0;
                    newState = AppReducer(newState, SetFilterTaskActionCreator(new TasksFilter()));
                    newState = AppReducer(newState, LoadTasksActionCreator(tasks));
                }

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
                //todo тут куча копирований стейта
                newState = AppReducer(newState, SetCurrentProjectUsersActionCreator([]));
                let tasks = {} as ILoadReviewTasksResultDataBack;
                tasks.Tasks = [];
                tasks.TasksCount = 0;
                newState = AppReducer(newState, SetFilterTaskActionCreator(new TasksFilter()));
                newState = AppReducer(newState, LoadTasksActionCreator(tasks));
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