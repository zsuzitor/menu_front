import { PlaningPokerUserInfo, RoomInfo, Story, UserInRoom, VoteInfo } from "../RoomInfo";


export class PlaningPokerAppState {
    NotActualStories: Story[];
    UsersList: UserInRoom[];
    VoteInfo: VoteInfo;
    TotalNotActualStoriesCount: number;
    User: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;

    constructor() {
        this.NotActualStories = [];
        this.UsersList = [];
        this.VoteInfo = new VoteInfo();
        this.TotalNotActualStoriesCount = 0;
        this.User = new PlaningPokerUserInfo();
        this.User.UserName = 'enter_your_name';
        this.RoomInfo = new RoomInfo();
    }
}