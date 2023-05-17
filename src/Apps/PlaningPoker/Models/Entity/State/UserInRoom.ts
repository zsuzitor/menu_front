import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IUserInRoomReturn } from "../../BackModels/UserInRoomReturn";
import { UserRoles } from "./RoomInfo";

export class UserInRoom implements MappedWithBack<IUserInRoomReturn> {

    Id: string;
    Name: string;
    Vote?: string;//number|string
    Roles: string[];
    HasVote: boolean;
    ImageLink: string;


    FillByBackModel(newData: IUserInRoomReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.Vote = newData.vote;
        this.Roles = newData.roles;
        this.HasVote = newData.has_vote;
        this.ImageLink = newData.image_link;
    }

    IsAdmin(): boolean {
        return this.Roles.includes(UserRoles.Creator) || this.Roles.includes(UserRoles.Admin);
    };

    CanVote(): boolean {
        //должно быть синхронно с бэком
        return !this.Roles.includes(UserRoles.Observer);
    };


}