
export class RoomInfo {
    Name: string;
    ImagePath: string;
    Password: string;
    InRoom: boolean;

    constructor() {
        this.Name = '';
        this.ImagePath = '';
        this.Password = '';
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


