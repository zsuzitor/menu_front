import { RoomSatus } from "../../../Body/PlaningPoker/Models/RoomInfo";
import { IUserInRoomReturn } from "./UserInRoomReturn";




export interface IOneRoomReturn {
    name: string;
    die_date: any;//todo datetime
    users: IUserInRoomReturn[];
    status: RoomSatus;
}