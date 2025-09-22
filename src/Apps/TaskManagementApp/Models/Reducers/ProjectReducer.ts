
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


export function TaskManagementProjectReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case DeleteProjectActionName:
            {
                let newState = cloneDeep(state);
                let projectId = action.payload as number;
                newState.TaskManagementApp.ProjectsList = newState.TaskManagementApp.ProjectsList
                    .filter(x => x.Id != projectId);
                if (newState.TaskManagementApp.CurrentProjectId === projectId) {
                    newState.TaskManagementApp.CurrentProjectId = -1;
                }

                if (newState.TaskManagementApp.CurrentProjectId === projectId) {
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
                newState.TaskManagementApp.ProjectsList.push(proj);
                return newState;
            }

        case SetCurrentProjectIdActionName:
            {
                let projectId = action.payload as number;
                if (state.TaskManagementApp.CurrentProjectId == projectId) {
                    return state;
                }
                
                let newState = cloneDeep(state);
                newState.TaskManagementApp.CurrentProjectId = projectId;
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
                newState.TaskManagementApp.ProjectsList = projects;
                newState.TaskManagementApp.ProjectsLoaded = true;
                return newState;
            }

            case ClearProjectStateActionName:
            {
                let newState = cloneDeep(state);
                newState.TaskManagementApp.CurrentProjectId = -1;
                newState.TaskManagementApp.CurrentProjectUsers = [];
                newState.TaskManagementApp.CurrentProjectTasksFilters = new TasksFilter();
                newState.TaskManagementApp.CurrentProjectTasksAllCount = 0;
                newState.TaskManagementApp.CurrentProjectTasks = [];
                newState.TaskManagementApp.CurrentProjectStatuses = [];
                newState.TaskManagementApp.CurrentProjectSprints = [];
                newState.TaskManagementApp.CurrentProjectLabels = [];
                newState.TaskManagementApp.ProjectsLoaded = false;
                return newState;
            }


        default:
            return state;
    }
    return state;
}