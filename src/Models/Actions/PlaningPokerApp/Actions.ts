import { IStoryReturn } from "../../BackModel/PlaningPoker/StoryReturn";
import { AppAction } from "../Actions";

export const SetNotActualStoriesActionName: string = 'SetNotActualStoriesAction';
export function SetNotActualStoriesActionCreator(data: IStoryReturn[]): AppAction<IStoryReturn[]> {
    return { type: SetNotActualStoriesActionName, payload: data };
};