import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { RoomReducer } from "./RoomReducer";
import { StoryReducer } from "./StoryReducer";
import { UserReducer } from "./UserReducer";
import { ClearPokerStateActionName } from "../../Actions/PlaningPokerApp/Actions";
import { PlaningPokerAppState } from "../../Models/PlaningPoker/State/PlaningPokerApp";


export function PlaningPokerReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = RoomReducer(state, action);
    st = StoryReducer(st, action);
    st = UserReducer(st, action);


    switch (action.type) {
        case ClearPokerStateActionName:
            {
                let newState = cloneDeep(st);
                newState.PlaningPokerApp = new PlaningPokerAppState();
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