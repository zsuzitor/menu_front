import { IStoryReturn } from "../../../_ComponentsLink/BackModel/PlaningPoker/StoryReturn";
import { IUserInRoomReturn } from "../../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn";
import { MappedWithBack } from "../../../_ComponentsLink/BL/Interfaces/MappedWithBack"

//todo хорошо бы по файликам раскидать

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

export class UserRoles {
    static User = "User";
    static Admin = "Admin";
    static Creator = "Creator";
    static Observer = "Observer";

}


export class UserInRoom implements MappedWithBack<IUserInRoomReturn> {

    Id: string;
    Name: string;
    Vote?: number;
    Roles: string[];
    HasVote: boolean;


    FillByBackModel(newData: IUserInRoomReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Vote = newData.vote;
        this.Roles = newData.roles;
        this.HasVote = newData.has_vote;

    }

    IsAdmin = (): boolean => {
        return this.Roles.includes(UserRoles.Creator) || this.Roles.includes(UserRoles.Admin);
    };

    CanVote = (): boolean => {
        return !this.Roles.includes(UserRoles.Observer);
    };


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



export class Story implements MappedWithBack<IStoryReturn>{
    Id: number;
    // InitWithServer: boolean;
    Name: string;
    Description: string;

    Vote?: number;
    Date?: string;


    constructor() {
        this.Id = 0;
        // this.InitWithServer = false;
        this.Name = "";
        this.Description = "";
        this.Vote = null;
        this.Date = null;

    }


    FillByBackModel(newData: IStoryReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Description = newData.description;
        this.Vote = newData.vote;
        this.Date = newData.date;

    }
}