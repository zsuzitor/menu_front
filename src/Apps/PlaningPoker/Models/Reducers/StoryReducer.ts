
import cloneDeep from 'lodash/cloneDeep';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { AppAction } from '../../../../Models/Actions/Actions';
import { SetNotActualStoriesActionName, SetTotalNotActualStoriesCountActionName, SetCurrentStoryIdActionName, SetStoriesActionName, AddNewStoryActionName, StoryChangeActionName, DeleteStoryActionName, MoveStoryToCompleteActionName, MoveStoryToCompletePayload, UpdateStoriesIdActionName } from '../Actions/StoryActions';
import { IStoryMappingReturn } from '../BackModels/RoomWasSavedUpdateReturn';
import { Story } from '../Entity/State/Story';
import { Helper } from '../../../../Models/BL/Helper';



export function StoryReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case SetNotActualStoriesActionName:
            {
                let newState = cloneDeep(state);
                let stories = action.payload as Story[];
                newState.PlaningPokerApp.NotActualStories = stories;
                return newState;
            }
        case SetTotalNotActualStoriesCountActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as number;

                newState.PlaningPokerApp.TotalNotActualStoriesCount = data;
                return newState;
            }
        case SetCurrentStoryIdActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;

                newState.PlaningPokerApp.StoriesInfo.CurrentStoryId = data;
                return newState;
            }
        case SetStoriesActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as Story[];

                newState.PlaningPokerApp.StoriesInfo.Stories = data;
                return newState;
            }

        case AddNewStoryActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as Story;

                newState.PlaningPokerApp.StoriesInfo.Stories.push(data);
                return newState;
            }

        case StoryChangeActionName:
            {
                //todo меняет не полностью, определенный поля только, как то это обозначит?
                const storiesHelper = new Helper();
                let newState = cloneDeep(state);
                let data = action.payload as Story;
                let story = storiesHelper.GetElemById(newState.PlaningPokerApp.StoriesInfo.Stories, data.Id);
                if (!story) {
                    return newState;
                }

                // if (newState.PlaningPokerApp.StoriesInfo.CurrentStoryId === data.Id) {
                //     newState.PlaningPokerApp.StoriesInfo.CurrentStoryDescriptionChange = data.Description;
                //     newState.PlaningPokerApp.StoriesInfo.CurrentStoryNameChange = data.Name;
                // }

                story.Name = data.Name;
                story.Description = data.Description;


                return newState;
            }

        case DeleteStoryActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                const storiesHelper = new Helper();
                let storyIndex = storiesHelper.GetIndexById(newState.PlaningPokerApp.StoriesInfo.Stories, data);
                if (storyIndex < 0) {
                    return newState;
                }

                newState.PlaningPokerApp.StoriesInfo.Stories.splice(storyIndex, 1);
                if (newState.PlaningPokerApp.StoriesInfo.CurrentStoryId == data) {
                    newState.PlaningPokerApp.StoriesInfo.CurrentStoryId = "";
                    // newState.PlaningPokerApp.StoriesInfo.CurrentStoryDescriptionChange = "";
                    // newState.PlaningPokerApp.StoriesInfo.CurrentStoryNameChange = "";
                }
                return newState;
            }

        case MoveStoryToCompleteActionName:
            {
                let newState = cloneDeep(state);
                const storiesHelper = new Helper();
                let data = action.payload as MoveStoryToCompletePayload;
                let story = storiesHelper.GetElemById(newState.PlaningPokerApp.StoriesInfo.Stories, data.OldId);

                if (story) {
                    story.Id = data.Story.Id;
                    story.Completed = data.Story.Completed;
                    story.Date = data.Story.Date;
                    story.Vote = data.Story.Vote;
                    story.ThisSession = data.Story.ThisSession;
                    if (newState.PlaningPokerApp.StoriesInfo.CurrentStoryId === data.OldId) {
                        newState.PlaningPokerApp.StoriesInfo.CurrentStoryId = "";
                        // newState.PlaningPokerApp.StoriesInfo.CurrentStoryDescriptionChange = "";
                        // newState.PlaningPokerApp.StoriesInfo.CurrentStoryNameChange = "";
                    }


                }

                return newState;
            }

        case UpdateStoriesIdActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as IStoryMappingReturn[];
                newState.PlaningPokerApp.StoriesInfo.Stories.forEach(st => {
                    let fromBack = data.find(x => x.old_id.toUpperCase() === st.Id.toUpperCase());
                    if (fromBack) {
                        st.Id = fromBack.new_id + '';
                    }
                });
                let fromBack = data
                    .find(x => x.old_id.toUpperCase()
                        === newState.PlaningPokerApp.StoriesInfo.CurrentStoryId.toUpperCase());
                if (fromBack) {
                    newState.PlaningPokerApp.StoriesInfo.CurrentStoryId = fromBack.new_id + '';
                }

                return newState;
            }

        default:
            return state;
    }
}