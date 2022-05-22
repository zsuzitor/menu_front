import { IEndVoteInfoReturn } from "./EndVoteInfoReturn";
import { IOneRoomReturn } from "./OneRoomReturn";






export interface IRoomInfoReturn {
    room: IOneRoomReturn;
    end_vote_info: IEndVoteInfoReturn;
    // die_room_time: Date;
}