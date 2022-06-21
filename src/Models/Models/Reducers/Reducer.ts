import { AppAction } from "../Actions/Actions";
import { AppState } from "../State/AppState";



import cloneDeep from 'lodash/cloneDeep';

export function AppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {

        case "test":
            let str = action.payload as string;
            return Object.assign({}, state, { TestMessage: str });
        default:
            return state;
    }
}