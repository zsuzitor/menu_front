


import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../Actions/Actions';
import { SetAuthActionName } from '../Actions/App/Actions';
import { IAuthState } from '../Models/AuthState';
import { AppState } from '../Models/State/AppState';


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