import { RoomStatus } from "../Entity/State/RoomInfo";
import { IStoryReturn } from "./StoryReturn";
import { IUserInRoomReturn } from "./UserInRoomReturn";




export interface IOneRoomReturn {
    name: string;
    image_path: string;
    die_date: string;
    users: IUserInRoomReturn[];
    status: RoomStatus;
    // end_vote_info: IEndVoteInfoReturn;
    actual_stories: IStoryReturn[];
    current_story_id: string;
    total_stories_count: number;
    cards: string[];//(number | string)[];

}