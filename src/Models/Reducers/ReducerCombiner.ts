import { AppAction } from "../Actions/Actions";
import { AppState } from "../Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { PlaningPokerReducer } from "../../Apps/PlaningPoker/Models/Reducers/Reducer";
import { AppReducer } from "./Reducer";
import { VaultAppReducer } from "../../Apps/Vault/Models/Reducers/Reducer";
import { TaskManagementAppReducer } from "../../Apps/TaskManagementApp/Models/Reducers/Reducer";

export function ReducerCombiner(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = AppReducer(state, action);

    st = TaskManagementAppReducer(st, action);
    st = PlaningPokerReducer(st, action);
    st = VaultAppReducer(st, action);


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