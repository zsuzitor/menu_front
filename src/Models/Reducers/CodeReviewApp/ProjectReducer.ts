import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { AddNewProjectActionName, DeleteProjectActionName, SetCurrentProjectIdActionName, SetProjectsActionName } from "../../Actions/CodeReviewApp/ProjectActions";
import { SetCurrentProjectUsersActionCreator } from "../../Actions/CodeReviewApp/UserActions";
import { ReducerCombiner } from "../ReducerCombiner";
import { LoadTasksActionCreator, SetFilterTaskActionCreator } from "../../Actions/CodeReviewApp/TaskActions";
import { TasksFilter } from "../../Models/CodeReviewApp/State/TasksFilter";
import { OneProjectInList } from "../../Models/CodeReviewApp/State/OneProjectInList";
import { LoadReviewTasksResult } from "../../Models/CodeReviewApp/LoadReviewTasksResult";

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
                    newState = ReducerCombiner(newState, SetCurrentProjectUsersActionCreator([]));
                    let tasks = {} as LoadReviewTasksResult;
                    tasks.Tasks = [];
                    tasks.TasksCount = 0;
                    newState = ReducerCombiner(newState, SetFilterTaskActionCreator(new TasksFilter()));
                    newState = ReducerCombiner(newState, LoadTasksActionCreator(tasks));
                }

                return newState;
            }

        case AddNewProjectActionName:
            {
                let newState = cloneDeep(state);
                let proj = action.payload as OneProjectInList;
                newState.CodeReviewApp.ProjectsList.push(proj);
                return newState;
            }

        case SetCurrentProjectIdActionName:
            {
                let newState = cloneDeep(state);
                let projectId = action.payload as number;
                newState.CodeReviewApp.CurrentProjectId = projectId;
                //todo тут куча копирований стейта
                newState = ReducerCombiner(newState, SetCurrentProjectUsersActionCreator([]));
                let tasks = {} as LoadReviewTasksResult;
                tasks.Tasks = [];
                tasks.TasksCount = 0;
                newState = ReducerCombiner(newState, SetFilterTaskActionCreator(new TasksFilter()));
                newState = ReducerCombiner(newState, LoadTasksActionCreator(tasks));
                return newState;
            }
        case SetProjectsActionName:
            {
                let newState = cloneDeep(state);
                let projects = action.payload as OneProjectInList[];
                newState.CodeReviewApp.ProjectsList = projects;
                return newState;
            }



        default:
            return state;
    }
}