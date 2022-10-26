import { AppAction } from "../Actions/Actions";
import { AppState } from "../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { PlaningPokerReducer } from "./PlaningPokerApp/Reducer";
import { AppReducer } from "./Reducer";
import { CodeReviewAppReducer } from "./CodeReviewApp/Reducer";

export function ReducerCombiner(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = AppReducer(state, action);

    st = CodeReviewAppReducer(st, action);

    st = PlaningPokerReducer(st, action);



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