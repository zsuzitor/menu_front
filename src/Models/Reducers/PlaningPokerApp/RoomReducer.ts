import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { RoomStatus, VoteInfo } from "../../Models/PlaningPoker/RoomInfo";
import { IEndVoteInfoReturn } from "../../BackModel/PlaningPoker/EndVoteInfoReturn";
import { PlaningPokerHelper } from "../../BL/PlaningPokerApp/PlaningPokerHelper";
import { AlertData } from "../../Models/AlertData";
import { SetRoomNameActionName, SetRoomPasswordActionName, SetVoteInfoActionName, SetRoomStatusActionName, VoteChangedActionName, VoteChangedPayload, SetSelectedCardActionName, ClearVoteActionName, SetInitialRoomDieTimeActionName, SetEditRoomActionName, SetRoomCardsActionName } from "../../Actions/PlaningPokerApp/RoomAction";


export function RoomReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {


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

        case SetRoomStatusActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as RoomStatus;

                newState.PlaningPokerApp.RoomStatus = data;
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