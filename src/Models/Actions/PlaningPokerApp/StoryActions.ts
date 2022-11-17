import { IStoryMappingReturn } from "../../BackModel/PlaningPoker/RoomWasSavedUpdateReturn";
import { Story } from "../../Models/PlaningPoker/State/Story";
import { AppAction } from "../Actions";


export const SetNotActualStoriesActionName: string = 'SetNotActualStoriesAction';
export function SetNotActualStoriesActionCreator(data: Story[]): AppAction<Story[]> {
    return { type: SetNotActualStoriesActionName, payload: data };
};

export const SetTotalNotActualStoriesCountActionName: string = 'SetTotalNotActualStoriesCountAction';
export function SetTotalNotActualStoriesCountActionCreator(data: number): AppAction<number> {
    return { type: SetTotalNotActualStoriesCountActionName, payload: data };
};


export const SetCurrentStoryIdActionName: string = 'SetCurrentStoryIdAction';
export function SetCurrentStoryIdActionCreator(data: string): AppAction<string> {
    return { type: SetCurrentStoryIdActionName, payload: data };
};


export const SetStoriesActionName: string = 'SetStoriesAction';
export function SetStoriesActionCreator(data: Story[]): AppAction<Story[]> {
    return { type: SetStoriesActionName, payload: data };
};


export const AddNewStoryActionName: string = 'AddNewStoryAction';
export function AddNewStoryActionCreator(data: Story): AppAction<Story> {
    return { type: AddNewStoryActionName, payload: data };
};


export const StoryChangeActionName: string = 'StoryChangeAction';
export function StoryChangeActionCreator(data: Story): AppAction<Story> {
    return { type: StoryChangeActionName, payload: data };
};



export const DeleteStoryActionName: string = 'DeleteStoryAction';
export function DeleteStoryActionCreator(data: string): AppAction<string> {
    return { type: DeleteStoryActionName, payload: data };
};


export interface MoveStoryToCompletePayload {
    OldId: string;
    Story: Story;
}
export const MoveStoryToCompleteActionName: string = 'MoveStoryToCompleteAction';
export function MoveStoryToCompleteActionCreator(data: MoveStoryToCompletePayload): AppAction<MoveStoryToCompletePayload> {
    return { type: MoveStoryToCompleteActionName, payload: data };
};


export const UpdateStoriesIdActionName: string = 'UpdateStoriesIdAction';
export function UpdateStoriesIdActionCreator(data: IStoryMappingReturn[]): AppAction<IStoryMappingReturn[]> {
    return { type: UpdateStoriesIdActionName, payload: data };
};


