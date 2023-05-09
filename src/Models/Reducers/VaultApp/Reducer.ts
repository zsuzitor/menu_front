import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { VaultReducer } from "./VaultReducer";


export function VaultAppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = VaultReducer(state, action);
    // st = StoryReducer(st, action);


    switch (action.type) {
        case '':
            {
                let newState = cloneDeep(st);
                return newState;
            }
    }

    return st;
}