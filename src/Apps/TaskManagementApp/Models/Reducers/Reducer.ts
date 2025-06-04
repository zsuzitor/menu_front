
import cloneDeep from 'lodash/cloneDeep';
import { TaskManagementProjectReducer } from './ProjectReducer';
import { TaskManagementTaskReducer } from './TaskReducer';
import { TaskManagementUserReducer } from './UserReducer';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ClearTaskManagementStateActionName } from '../Actions/Actions';
import { TaskManagementAppState } from '../Entity/State/TaskManagementAppState';
import { TaskManagementCommentReducer } from './CommentReducer';
import { TaskManagementTaskStatusReducer } from './TaskStatusReducer';
import { WorkTimeLogReducer } from './WorkTimeLogReducer';



export function TaskManagementAppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = TaskManagementProjectReducer(state, action);

    st = TaskManagementUserReducer(st, action);
    st = TaskManagementCommentReducer(st, action);
    st = TaskManagementTaskReducer(st, action);
    st = TaskManagementTaskStatusReducer(st, action);
    st = WorkTimeLogReducer(st, action);

    switch (action.type) {
        case ClearTaskManagementStateActionName:
            {
                let newState = cloneDeep(st);
                newState.TaskManagementApp = new TaskManagementAppState();
                return newState;
            }
    }


    //...
    return st;
    switch (action.type) {

        case "test":
            let str = action.payload as string;
            return Object.assign({}, state, { TestMessage: str });
        default:
            return state;
    }
}