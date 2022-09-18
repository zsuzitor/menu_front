

import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { IRoomInfoReturn, INotActualStoriesReturn } from "../../BackModel/PlaningPoker/RoomInfoReturn";
import { IUserInRoomReturn } from "../../BackModel/PlaningPoker/UserInRoomReturn";


export type ListUserInRoomReturn = (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => void;
export type GetRoomInfoReturn = (error: MainErrorObjectBack, data: IRoomInfoReturn) => void;
export type GetNotActualStoriesReturn = (error: MainErrorObjectBack, data: INotActualStoriesReturn) => void;


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
    GetUsersIsRoom: (roomname: string, userId: string, onSuccess: ListUserInRoomReturn) => void;
    GetRoomInfo: (roomname: string, userId: string, onSuccess: GetRoomInfoReturn) => void;
    GetNotActualStories: (roomname: string, userId: string, page: number, countOnPage: number, onSuccess: GetNotActualStoriesReturn) => void;

    EndPoints: HubEndpoints;
}



export class PlaningPokerController implements IPlaningPokerController {
    EndPoints: HubEndpoints;

    constructor() {
        this.EndPoints = new HubEndpoints();
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
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as INotActualStoriesReturn;
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-not-actual-stories',

        });
    }

    GetUsersIsRoom(roomname: string, userId: string, onSuccess: ListUserInRoomReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IUserInRoomReturn[];
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        });
    }

    GetRoomInfo(roomname: string, userId: string, onSuccess: GetRoomInfoReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'roomname': roomname,
                'userConnectionId': userId
            },
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IRoomInfoReturn;
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/PlanitPoker/get-room-info',

        });
    }

}



