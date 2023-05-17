


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../Actions/Actions';
import { SetAuthActionName } from '../Actions/App/Actions';
import { AppState } from '../Entity/State/AppState';
import { IAuthState } from '../Entity/AuthState';


export function AppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case SetAuthActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as IAuthState;
                newState.Auth = data;
                localStorage.removeItem("header_auth");

                return newState;
            }


        default:
            return state;
    }
}