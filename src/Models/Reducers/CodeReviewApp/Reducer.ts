import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';


export function CodeReviewReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case "action":
            {
                let newState = cloneDeep(state);

                return newState;
            }



        default:
            return state;
    }
}