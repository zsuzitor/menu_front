import { IUserInRoomReturn } from "../../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn";
import { MappedWithBack } from "../../../_ComponentsLink/BL/Interfaces/MappedWithBack"

export class RoomInfo {
    Name: string;
    Password: string;
    InRoom: boolean;

    constructor() {
        this.Name = "";
        this.Password = "";
        this.InRoom = false;
    }
}


export enum RoomSatus { None = 0, AllCanVote, CloseVote };


export class UserInRoom implements MappedWithBack<IUserInRoomReturn> {

    Id: string;
    Name: string;
    Vote?: number;
    IsAdmin: boolean;
    HasVote: boolean;


    FillByBackModel(newData: IUserInRoomReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Vote = newData.vote;
        this.IsAdmin = newData.is_admin;
        this.HasVote = newData.has_vote;

    }
}


export class PlaningPokerUserInfo {
    UserName: string;
    UserId: string;
    constructor() {
        this.UserName = "";
        this.UserId = "";
    }
}


export class VoteInfo {
    MaxVote: number;
    MinVote: number;
    AverageVote: number;
    constructor() {
        this.MaxVote = 0;
        this.MinVote = 0;
        this.AverageVote = 0;
    }

}