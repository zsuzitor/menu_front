import { IEndVoteInfoReturn } from "./EndVoteInfoReturn";
import { IOneRoomReturn } from "./OneRoomReturn";
import { IStoryReturn } from "./StoryReturn";






export interface IRoomInfoReturn {
    room: IOneRoomReturn;
    end_vote_info: IEndVoteInfoReturn;
    // die_room_time: Date;
}

export interface INotActualStoriesReturn {
    stories: IStoryReturn[];
    // die_room_time: Date;
}