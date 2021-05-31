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


export enum RoomSatus { AllCanVote, CloseVote };


export class UserInRoom implements MappedWithBack<IUserInRoomReturn> {

    Id: string;
    Name: string;
    Vote?: number;
    IsAdmin: boolean;


    FillByBackModel(newData: IUserInRoomReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Vote = newData.vote;
        this.IsAdmin = newData.is_admin;


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