import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { SetNotActualStoriesActionName } from "../../Actions/PlaningPokerApp/Actions";
import { IStoryReturn } from "../../BackModel/PlaningPoker/StoryReturn";
import { Story } from "../../Models/PlaningPoker/RoomInfo";


export function PlaningPokerReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case SetNotActualStoriesActionName:
            {
                let newState = cloneDeep(state);
                let stories = action.payload as IStoryReturn[];
                newState.PlaningPokerApp.NotActualStories = stories.map(x => {
                    let st = new Story();
                    st.FillByBackModel(x);
                    return st;
                });
                return newState;
            }



        default:
            return state;
    }
}