import { RoomStatus } from "../../../Body/PlaningPoker/Models/RoomInfo";
import { IStoryReturn } from "./StoryReturn";
import { IUserInRoomReturn } from "./UserInRoomReturn";




export interface IOneRoomReturn {
    name: string;
    die_date: string;
    users: IUserInRoomReturn[];
    status: RoomStatus;
    // end_vote_info: IEndVoteInfoReturn;
    actual_stories: IStoryReturn[];
    current_story_id: string;

}