import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { AddNewStoryActionName, AddUserToRoomActionName, ChangeUserNameInRoomActionName, ChangeUserNameInRoomPayload, ClearVoteActionName, DeleteStoryActionName, EnteredInRoomActionName, IEnteredInRoomActionPayload, MoveStoryToCompleteActionName, MoveStoryToCompletePayload, RemoveUserActionName, SetCurrentStoryIdActionName, SetEditRoomActionName, SetInitialRoomDieTimeActionName, SetNotActualStoriesActionName, SetRoomCardsActionName, SetRoomNameActionName, SetRoomPasswordActionName, SetRoomStatusActionName, SetRoomUserIdActionName, SetRoomUsersActionName, SetSelectedCardActionName, SetStoriesActionName, SetTotalNotActualStoriesCountActionName, SetUserConnectionIdActionName, SetUserNameActionName, SetVoteInfoActionName, StoryChangeActionName, UpdateStoriesIdActionName, UserRoleChangedActionName, UserRoleChangedPayload, VoteChangedActionName, VoteChangedPayload } from "../../Actions/PlaningPokerApp/Actions";
import { IStoryReturn } from "../../BackModel/PlaningPoker/StoryReturn";
import { RoomStatus, Story, UserInRoom, VoteInfo } from "../../Models/PlaningPoker/RoomInfo";
import { IEndVoteInfoReturn } from "../../BackModel/PlaningPoker/EndVoteInfoReturn";
import { PlaningPokerHelper, StoriesHelper } from "../../BL/PlaningPokerApp/PlaningPokerHelper";
import { AlertData } from "../../Models/AlertData";
import { IStoryMappingReturn } from "../../BackModel/PlaningPoker/RoomWasSavedUpdateReturn";


export function PlaningPokerReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case SetNotActualStoriesActionName:
            {
                let newState = cloneDeep(state);
                let stories = action.payload as Story[];
                newState.PlaningPokerApp.NotActualStories = stories;
                return newState;
            }
        case EnteredInRoomActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as IEnteredInRoomActionPayload;

                newState.PlaningPokerApp.RoomInfo.InRoom = true;
                newState.PlaningPokerApp.RoomInfo.Password = "";
                newState.PlaningPokerApp.User.UserId = data.RoomUserId;
                newState.PlaningPokerApp.User.LoginnedInMainApp = data.LoginnedInMainApp;


                return newState;
            }
        case SetUserConnectionIdActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                newState.PlaningPokerApp.User.UserConnectionId = data;

                return newState;
            }
        case SetUserNameActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                newState.PlaningPokerApp.User.UserName = data;

                return newState;
            }
        case SetRoomNameActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                newState.PlaningPokerApp.RoomInfo.Name = data;
                return newState;
            }
        case SetRoomPasswordActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                newState.PlaningPokerApp.RoomInfo.Password = data;
                return newState;
            }
        case SetRoomUserIdActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                newState.PlaningPokerApp.User.UserId = data;
                return newState;
            }
        case SetRoomUsersActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as UserInRoom[];
                //почему просто не присвоить пустой массив?
                newState.PlaningPokerApp.UsersList.splice(0, newState.PlaningPokerApp.UsersList.length);
                newState.PlaningPokerApp.UsersList.push(...data);
                return newState;
            }
        case SetTotalNotActualStoriesCountActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as number;

                newState.PlaningPokerApp.TotalNotActualStoriesCount = data;
                return newState;
            }
        case SetVoteInfoActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as IEndVoteInfoReturn;
                newState.PlaningPokerApp.SelectedVoteCard = '-1';


                if (!data) {
                    newState.PlaningPokerApp.VoteInfo = new VoteInfo();
                    return newState;
                }

                newState.PlaningPokerApp.UsersList.forEach(x => {
                    let userFromRes = data.users_info.find(x1 => x1.id === x.Id);
                    if (userFromRes) {
                        x.Vote = userFromRes.vote;
                    }

                });

                newState.PlaningPokerApp.VoteInfo.FillByBackModel(data);

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
        case SetRoomStatusActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as RoomStatus;

                newState.PlaningPokerApp.RoomStatus = data;
                return newState;
            }
        case ChangeUserNameInRoomActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as ChangeUserNameInRoomPayload;
                let user = (new PlaningPokerHelper()).GetUserById(newState.PlaningPokerApp.UsersList, data.UserId);
                if (!user) {
                    return newState;
                }

                user.Name = data.UserName;
                return newState;
            }
        case AddUserToRoomActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as UserInRoom;
                var existUser = (new PlaningPokerHelper()).GetUserById(newState.PlaningPokerApp.UsersList, data.Id);
                if (!existUser) {
                    newState.PlaningPokerApp.UsersList.push(data);
                }

                return newState;
            }
        case RemoveUserActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string[];
                data.forEach(x => {
                    let userIndex = (new PlaningPokerHelper()).GetUserIndexById(newState.PlaningPokerApp.UsersList, x);
                    if (userIndex < 0) {
                        return newState;
                    }

                    newState.PlaningPokerApp.UsersList.splice(userIndex, 1);
                });

                return newState;
            }

        case VoteChangedActionName:
            {
                let allAreVotedChanged = false;
                let newState = cloneDeep(state);
                let data = action.payload as VoteChangedPayload;
                let user = (new PlaningPokerHelper()).GetUserById(newState.PlaningPokerApp.UsersList, data.UserId);
                if (!user) {
                    return newState;
                }

                user.HasVote = true;


                // if (!isNaN(vote)) {
                if (data.Vote !== "?") {
                    user.Vote = data.Vote;
                }

                if (newState.PlaningPokerApp.UsersList.every(x => x.HasVote || !x.CanVote())
                    && !newState.PlaningPokerApp.VoteInfo.AllAreVoted) {
                    newState.PlaningPokerApp.VoteInfo.AllAreVoted = true;
                    allAreVotedChanged = true;

                }

                if (allAreVotedChanged) {
                    let alertFactory = new AlertData();
                    let alert = alertFactory.GetDefaultNotify("Все участники проголосовали");
                    window.G_AddAbsoluteAlertToState(alert);
                }

                return newState;
            }
        case UserRoleChangedActionName:
            {

                let newState = cloneDeep(state);
                let data = action.payload as UserRoleChangedPayload;
                let user = (new PlaningPokerHelper()).GetUserById(newState.PlaningPokerApp.UsersList, data.UserId);
                if (!user) {
                    return newState;
                }

                if (data.ChangeType === 1) {
                    //добавлен
                    let index = user.Roles.findIndex(x => x === data.Role);
                    if (index == -1) {
                        user.Roles.push(data.Role);
                    }
                }
                else {
                    //удален
                    let index = user.Roles.findIndex(x => x === data.Role);
                    if (index >= 0) {
                        user.Roles.splice(index, 1);
                    }
                }

                if (!user.CanVote()) {
                    //todo убрать все оценки

                    // GetUserById(localState.UsersList,);
                    // users
                    user.Vote = null;
                    user.HasVote = false;
                    if (data.UserId === newState.PlaningPokerApp.User.UserId) {
                        newState.PlaningPokerApp.SelectedVoteCard = '-1';
                    }

                }


                return newState;
            }


        case SetSelectedCardActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string;
                newState.PlaningPokerApp.SelectedVoteCard = data;
                return newState;
            }

        case ClearVoteActionName:
            {
                let newState = cloneDeep(state);
                // let data = action.payload as string;
                newState.PlaningPokerApp.UsersList.forEach(x => {
                    x.Vote = null;
                    x.HasVote = false;
                });
                newState.PlaningPokerApp.VoteInfo = new VoteInfo();
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
                const storiesHelper = new StoriesHelper();
                let newState = cloneDeep(state);
                let data = action.payload as Story;
                let story = storiesHelper.GetStoryById(newState.PlaningPokerApp.StoriesInfo.Stories, data.Id);
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
                const storiesHelper = new StoriesHelper();
                let storyIndex = storiesHelper.GetStoryIndexById(newState.PlaningPokerApp.StoriesInfo.Stories, data);
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
                const storiesHelper = new StoriesHelper();
                let data = action.payload as MoveStoryToCompletePayload;
                let story = storiesHelper.GetStoryById(newState.PlaningPokerApp.StoriesInfo.Stories, data.OldId);

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
        case SetInitialRoomDieTimeActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as Date | null;
                newState.PlaningPokerApp.DieRoomTimeInitial = data;

                return newState;
            }
        case SetEditRoomActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as boolean;
                newState.PlaningPokerApp.EditRoom = data;
                return newState;
            }
        case SetRoomCardsActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as string[];
                newState.PlaningPokerApp.RoomCards = data;
                return newState;
            }



        default:
            return state;
    }
}