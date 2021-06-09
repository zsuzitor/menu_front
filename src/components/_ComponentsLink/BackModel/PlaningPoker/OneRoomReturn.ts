import { RoomSatus } from "../../../Body/PlaningPoker/Models/RoomInfo";
import { IEndVoteInfoReturn } from "./EndVoteInfoReturn";
import { IStoryReturn } from "./StoryReturn";
import { IUserInRoomReturn } from "./UserInRoomReturn";




export interface IOneRoomReturn {
    name: string;
    die_date: any;//todo datetime
    users: IUserInRoomReturn[];
    status: RoomSatus;
    end_vote_info: IEndVoteInfoReturn;
    actual_stories: IStoryReturn[];

}