
import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ReducerCombiner } from '../../../../Models/Reducers/ReducerCombiner';
import { DeleteProjectActionName, AddNewProjectActionName, SetCurrentProjectIdActionName, SetProjectsActionName, ClearProjectStateActionName } from '../Actions/ProjectActions';
import { SetFilterTaskActionCreator, LoadTasksActionCreator } from '../Actions/TaskActions';
import { SetCurrentProjectUsersActionCreator } from '../Actions/UserActions';
import { LoadWorkTasksResult } from '../Entity/LoadWorkTasksResult';
import { OneProjectInList } from '../Entity/State/OneProjectInList';
import { TasksFilter } from '../Entity/State/TasksFilter';
import { SetCurrentProjectStatusesActionCreator } from '../Actions/TaskStatusActions';

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
                    newState = ReducerCombiner(newState, SetCurrentProjectStatusesActionCreator([]));
                    let tasks = {} as LoadWorkTasksResult;
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
                let projectId = action.payload as number;
                if (state.CodeReviewApp.CurrentProjectId == projectId) {
                    return state;
                }
                
                let newState = cloneDeep(state);
                newState.CodeReviewApp.CurrentProjectId = projectId;
                //todo тут куча копирований стейта
                newState = ReducerCombiner(newState, SetCurrentProjectUsersActionCreator([]));
                newState = ReducerCombiner(newState, SetCurrentProjectStatusesActionCreator([]));
                let tasks = {} as LoadWorkTasksResult;
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
                newState.CodeReviewApp.ProjectsLoaded = true;
                return newState;
            }

            case ClearProjectStateActionName:
            {
                let newState = cloneDeep(state);
                newState.CodeReviewApp.CurrentProjectId = -1;
                newState.CodeReviewApp.CurrentProjectUsers = [];
                newState.CodeReviewApp.CurrentProjectTasksFilters = new TasksFilter();
                newState.CodeReviewApp.CurrentProjectTasksAllCount = 0;
                newState.CodeReviewApp.CurrentProjectTasks = [];
                newState.CodeReviewApp.CurrentProjectStatuses = [];
                newState.CodeReviewApp.ProjectsLoaded = false;
                return newState;
            }


        default:
            return state;
    }
    return state;
}