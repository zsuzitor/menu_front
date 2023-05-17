
import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ReducerCombiner } from '../../../../Models/Reducers/ReducerCombiner';
import { DeleteProjectActionName, AddNewProjectActionName, SetCurrentProjectIdActionName, SetProjectsActionName } from '../Actions/ProjectActions';
import { SetFilterTaskActionCreator, LoadTasksActionCreator } from '../Actions/TaskActions';
import { SetCurrentProjectUsersActionCreator } from '../Actions/UserActions';
import { LoadReviewTasksResult } from '../Entity/LoadReviewTasksResult';
import { OneProjectInList } from '../Entity/State/OneProjectInList';
import { TasksFilter } from '../Entity/State/TasksFilter';

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