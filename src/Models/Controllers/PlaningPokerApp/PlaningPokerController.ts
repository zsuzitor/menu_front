

import { SetCurrentStoryIdActionCreator, SetInitialRoomDieTimeActionCreator, SetNotActualStoriesActionCreator, SetRoomCardsActionCreator, SetRoomStatusActionCreator, SetRoomUsersActionCreator, SetStoriesActionCreator, SetTotalNotActualStoriesCountActionCreator, SetVoteInfoActionCreator } from "../../Actions/PlaningPokerApp/Actions";
import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { IRoomInfoReturn, INotActualStoriesReturn } from "../../BackModel/PlaningPoker/RoomInfoReturn";
import { IUserInRoomReturn } from "../../BackModel/PlaningPoker/UserInRoomReturn";
import { Story, UserInRoom } from "../../Models/PlaningPoker/RoomInfo";


export type ListUserInRoomReturn = (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => void;
export type GetRoomInfoReturn = (error: MainErrorObjectBack, data: IRoomInfoReturn) => void;
export type GetNotActualStoriesReturn = (error: MainErrorObjectBack, data: INotActualStoriesReturn) => void;
export type ChangeRoomPasswordReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export class HubEndpointsFront {
    MovedStoryToComplete: string;
    DeletedStory: string;
    CurrentStoryChanged: string;
    NewCurrentStory: string;
    AddedNewStory: string;
    VoteEnd: string;
    VoteStart: string;
    UserRoleChanged: string;
    VoteChanged: string;
    UserLeaved: string;
    UserNameChanged: string;
    NewUserInRoom: string;
    RoomNotCreated: string;
    ConnectedToRoomError: string;
    EnteredInRoom: string;
    PlaningNotifyFromServer: string;
    NeedRefreshTokens: string;
    NewRoomAlive: string;
    RoomWasSaved: string;
    RoomCardsChanged: string;

    constructor() {
        this.MovedStoryToComplete = "MovedStoryToComplete";
        this.DeletedStory = "DeletedStory";
        this.CurrentStoryChanged = "CurrentStoryChanged";
        this.NewCurrentStory = "NewCurrentStory";
        this.AddedNewStory = "AddedNewStory";
        this.VoteEnd = "VoteEnd";
        this.VoteStart = "VoteStart";
        this.UserRoleChanged = "UserRoleChanged";
        this.VoteChanged = "VoteChanged";
        this.UserLeaved = "UserLeaved";
        this.UserNameChanged = "UserNameChanged";
        this.NewUserInRoom = "NewUserInRoom";
        this.RoomNotCreated = "RoomNotCreated";
        this.ConnectedToRoomError = "ConnectedToRoomError";
        this.EnteredInRoom = "EnteredInRoom";
        this.PlaningNotifyFromServer = "PlaningNotifyFromServer";
        this.NeedRefreshTokens = "NeedRefreshTokens";
        this.NewRoomAlive = "NewRoomAlive";
        this.RoomWasSaved = "RoomWasSaved";
        this.RoomCardsChanged = "RoomCardsChanged";
    }
}

export class HubEndpointsBack {
    GetConnectionId: string;
    CreateRoom: string;
    EnterInRoom: string;
    AddNewStory: string;
    MakeStoryComplete: string;
    ChangeCurrentStory: string;
    KickUser: string;
    StartVote: string;
    EndVote: string;
    MakeCurrentStory: string;
    DeleteStory: string;
    SaveRoom: string;
    DeleteRoom: string;
    UserNameChange: string;
    AddNewRoleToUser: string;
    RemoveRoleUser: string;
    LoadNotActualStories: string;
    Vote: string;
    OnWindowClosedAsync: string;
    AliveRoom: string;
    SetRoomCards: string;

    constructor() {
        this.GetConnectionId = "GetConnectionId";
        this.CreateRoom = "CreateRoom";
        this.EnterInRoom = "EnterInRoom";
        this.AddNewStory = "AddNewStory";
        this.MakeStoryComplete = "MakeStoryComplete";
        this.ChangeCurrentStory = "ChangeCurrentStory";
        this.KickUser = "KickUser";
        this.StartVote = "StartVote";
        this.EndVote = "EndVote";
        this.MakeCurrentStory = "MakeCurrentStory";
        this.DeleteStory = "DeleteStory";
        this.SaveRoom = "SaveRoom";
        this.DeleteRoom = "DeleteRoom";
        this.UserNameChange = "UserNameChange";
        this.AddNewRoleToUser = "AddNewRoleToUser";
        this.RemoveRoleUser = "RemoveRoleUser";
        this.LoadNotActualStories = "LoadNotActualStories";
        this.Vote = "Vote";
        this.OnWindowClosedAsync = "OnWindowClosedAsync";
        this.AliveRoom = "AliveRoom";
        this.SetRoomCards = "SetRoomCards";
    }
}

export class HubEndpoints {
    EndpointsFront: HubEndpointsFront;
    EndpointsBack: HubEndpointsBack;

    constructor() {
        this.EndpointsFront = new HubEndpointsFront();
        this.EndpointsBack = new HubEndpointsBack();
    }
}


export interface IPlaningPokerController {
    //TODO тут userId хорошо бы убрать на бэк. см бэк контроллер

    GetUsersIsRoomRedux: (roomname: string, userId: string) => void;
    GetRoomInfoRedux: (roomname: string, userId: string) => void;
    // GetRoomInfoReduxCB: (roomname: string, userId: string, onSuccess: GetRoomInfoReturn) => void;
    GetNotActualStoriesRedux: (roomname: string, userId: string, page: number, countOnPage: number) => void;
    // ChangeRoomPasswordRedux: (roomname: string, userConnectionId: string, oldPassword: string, newPassword: string) => void;
    ChangeRoomPassword: (roomname: string, userConnectionId: string
        , oldPassword: string, newPassword: string, onSuccess: ChangeRoomPasswordReturn) => void;
    EndPoints: HubEndpoints;
}



export class PlaningPokerController implements IPlaningPokerController {
    EndPoints: HubEndpoints;

    constructor() {
        this.EndPoints = new HubEndpoints();
    }

    GetNotActualStoriesRedux(roomname: string, userId: string, page: number, countOnPage: number) {
        return (dispatch: any, getState: any) => {
            this.GetNotActualStories(roomname, userId, page, countOnPage,
                (error: MainErrorObjectBack, data: INotActualStoriesReturn) => {
                    if (error) {
                        return;
                    }

                    if (data) {
                        var stories = data.stories.map(x => {
                            let st = new Story();
                            st.FillByBackModel(x);
                            return st;
                        });
                        dispatch(SetNotActualStoriesActionCreator(stories));
                    }
                });
        };
    }

    GetNotActualStories(roomname: string, userId: string, page: number, countOnPage: number, onSuccess: GetNotActualStoriesReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId,
                'pageNumber': page,
                'pageSize': countOnPage,
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-not-actual-stories',

        });
    }

    // ChangeRoomPasswordRedux(roomname: string, userConnectionId: string, oldPassword: string, newPassword: string) {
    //     return (dispatch: any, getState: any) => {
    //         this.ChangeRoomPassword(roomname, userConnectionId, oldPassword, newPassword,
    //             (error: MainErrorObjectBack, data: BoolResultBack) => {
    //                 if (error) {
    //                     return;
    //                 }

    //                 if (data) {
    //                     var stories = data.stories.map(x => {
    //                         let st = new Story();
    //                         st.FillByBackModel(x);
    //                         return st;
    //                     });
    //                     dispatch(SetNotActualStoriesActionCreator(stories));
    //                 }
    //             });
    //     };
    // }

    ChangeRoomPassword(roomname: string, userConnectionId: string
        , oldPassword: string, newPassword: string, onSuccess: ChangeRoomPasswordReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userConnectionId,
                'oldPassword': oldPassword,
                'newPassword': newPassword,
            },
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/room-password-change',

        });
    }



    GetUsersIsRoomRedux(roomname: string, userId: string) {
        return (dispatch: any, getState: any) => {
            this.GetUsersIsRoom(roomname, userId,
                (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => {
                    if (data) {
                        let newUsersData = data.map(x => {
                            let us = new UserInRoom();
                            us.FillByBackModel(x);
                            return us;
                        });

                        dispatch(SetRoomUsersActionCreator(newUsersData));

                    }
                });
        };
    }

    GetUsersIsRoom(roomname: string, userId: string, onSuccess: ListUserInRoomReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        });
    }

    GetRoomInfoRedux(roomname: string, userId: string) {
        return this.GetRoomInfoReduxCB(roomname, userId, null);
    }

    GetRoomInfoReduxCB(roomname: string, userId: string, onSuccess: GetRoomInfoReturn) {
        return (dispatch: any, getState: any) => {
            this.GetRoomInfo(roomname, userId,
                (error: MainErrorObjectBack, data: IRoomInfoReturn) => {
                    let newUsersData = data.room.users.map(x => {

                        let us = new UserInRoom();
                        us.FillByBackModel(x);
                        return us;
                    });

                    dispatch(SetRoomCardsActionCreator(data.room.cards));
                    dispatch(SetInitialRoomDieTimeActionCreator(new Date(data.room.die_date)));
                    dispatch(SetRoomUsersActionCreator(newUsersData));
                    dispatch(SetTotalNotActualStoriesCountActionCreator(data.room.total_stories_count));
                    dispatch(SetVoteInfoActionCreator(data.end_vote_info));
                    dispatch(SetCurrentStoryIdActionCreator(data.room.current_story_id));
                    dispatch(SetRoomStatusActionCreator(data.room.status));
                    dispatch(SetStoriesActionCreator(data.room.actual_stories.map(x => {
                        let st = new Story();
                        st.FillByBackModel(x);
                        return st;
                    })));


                    if (onSuccess) {
                        onSuccess(error, data);
                    }
                });
        };
    }


    GetRoomInfo(roomname: string, userId: string, onSuccess: GetRoomInfoReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-room-info',

        });
    }


    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (xhr: any, status: any, jqXHR: any) => {
            let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
            if (resp.errors) {
                onSuccess(resp, null);
            }
            else {
                let dataBack = xhr as T;
                if (dataBack) {
                    onSuccess(null, dataBack);
                }
                else {
                    //todo что то не так planingController1
                }

            }
        }
    }

}



