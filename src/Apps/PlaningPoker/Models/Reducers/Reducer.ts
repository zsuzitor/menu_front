import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { RoomReducer } from "./RoomReducer";
import { StoryReducer } from "./StoryReducer";
import { UserReducer } from "./UserReducer";
import { ClearPokerStateActionName, ClearRoomPokerStateActionName } from "../Actions/Actions";
import { PlaningPokerAppState } from "../Entity/State/PlaningPokerApp";


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
            case ClearRoomPokerStateActionName:
            {
                let newState = cloneDeep(st);
                let tmp = newState.PlaningPokerApp;
                //RoomsList
                //User
                newState.PlaningPokerApp = new PlaningPokerAppState();
                newState.PlaningPokerApp.RoomsList = tmp.RoomsList;
                newState.PlaningPokerApp.User = tmp.User;
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