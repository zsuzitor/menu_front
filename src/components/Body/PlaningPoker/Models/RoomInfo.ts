import { IEndVoteInfoReturn } from "../../../../Models/BackModel/PlaningPoker/EndVoteInfoReturn";
import { IStoryReturn } from "../../../../Models/BackModel/PlaningPoker/StoryReturn";
import { IUserInRoomReturn } from "../../../../Models/BackModel/PlaningPoker/UserInRoomReturn";
import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack"

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


export enum RoomStatus { None = 0, AllCanVote, CloseVote };

export class UserRoles {
    static User = "User";
    static Admin = "Admin";
    static Creator = "Creator";
    static Observer = "Observer";

}


export class UserInRoom implements MappedWithBack<IUserInRoomReturn> {

    Id: string;
    Name: string;
    Vote?: string;//number|string
    Roles: string[];
    HasVote: boolean;


    FillByBackModel(newData: IUserInRoomReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Vote = newData.vote;
        this.Roles = newData.roles;
        this.HasVote = newData.has_vote;

    }

    IsAdmin(): boolean {
        return this.Roles.includes(UserRoles.Creator) || this.Roles.includes(UserRoles.Admin);
    };

    CanVote(): boolean {
        //должно быть синхронно с бэком
        return !this.Roles.includes(UserRoles.Observer);
    };


}


export class PlaningPokerUserInfo {
    UserName: string;
    UserId: string;
    UserConnectionId: string;
    LoginnedInMainApp: boolean;
    constructor() {
        this.UserName = "";
        this.UserId = "";
        this.UserConnectionId = "";
        this.LoginnedInMainApp = false;
    }
}


export class VoteInfo implements MappedWithBack<IEndVoteInfoReturn>{
    MaxVote: number;
    MinVote: number;
    AverageVote: number;
    AllAreVoted: boolean;
    constructor() {
        this.MaxVote = 0;
        this.MinVote = 0;
        this.AverageVote = 0;
        this.AllAreVoted = false;
    }

    FillByBackModel(newData: IEndVoteInfoReturn): void {
        this.MaxVote = newData.max_vote;
        this.MinVote = newData.min_vote;
        this.AverageVote = newData.average_vote;
        this.AllAreVoted = false;
    }

}



export class Story implements MappedWithBack<IStoryReturn>{
    Id: string;
    // InitWithServer: boolean;
    Name: string;
    Description: string;
    Completed: boolean;

    Vote?: number;
    Date?: string;


    constructor() {
        this.Id = "";
        // this.InitWithServer = false;
        this.Name = "";
        this.Description = "";
        this.Vote = null;
        this.Date = null;
        this.Completed = false;
    }


    FillByBackModel(newData: IStoryReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Description = newData.description;
        this.Vote = newData.vote;
        this.Date = newData.date;
        this.Completed = newData.completed;
    }
}




export class StoriesHelper {
    GetStoryIndexById = (stories: Story[], storyId: string): number => {
        if (!storyId) {
            return -1;
        }

        let index = stories.findIndex(x => x.Id === storyId);
        if (index < 0 || index >= stories.length) {
            return -1;
        }

        return index;
    }

    GetStoryById = (stories: Story[], storyId: string): Story => {
        let index = this.GetStoryIndexById(stories, storyId);
        if (index < 0) {
            return;
        }

        return stories[index];
    }
}