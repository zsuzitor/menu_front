import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { UserInRoom } from "../../Models/PlaningPoker/RoomInfo";
import { PlaningPokerHelper } from "../../BL/PlaningPokerApp/PlaningPokerHelper";
import { AddUserToRoomActionName, ChangeUserNameInRoomActionName, ChangeUserNameInRoomPayload, EnteredInRoomActionName, IEnteredInRoomActionPayload, RemoveUserActionName, SetRoomUserIdActionName, SetRoomUsersActionName, SetUserConnectionIdActionName, SetUserNameActionName, UserRoleChangedActionName, UserRoleChangedPayload } from "../../Actions/PlaningPokerApp/UserActions";



export function UserReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
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

                    user.Vote = null;
                    user.HasVote = false;
                    if (data.UserId === newState.PlaningPokerApp.User.UserId) {
                        newState.PlaningPokerApp.SelectedVoteCard = '-1';
                    }

                }


                return newState;
            }


        default:
            return state;
    }
}