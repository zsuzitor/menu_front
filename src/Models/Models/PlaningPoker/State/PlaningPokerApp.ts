import { PlaningPokerUserInfo, RoomInfo, RoomStatus, Story, UserInRoom, VoteInfo } from "../RoomInfo";


export class PlaningPokerAppState {
    NotActualStories: Story[];
    UsersList: UserInRoom[];
    VoteInfo: VoteInfo;
    TotalNotActualStoriesCount: number;
    User: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;
    StoriesInfo: StoriesInfo;
    SelectedVoteCard: string;
    RoomStatus: RoomStatus;
    DieRoomTimeInitial: Date;
    EditRoom: boolean;
    RoomCards: (string | number)[];

    constructor() {
        this.NotActualStories = [];
        this.UsersList = [];
        this.VoteInfo = new VoteInfo();
        this.TotalNotActualStoriesCount = 0;
        this.User = new PlaningPokerUserInfo();
        this.User.UserName = 'enter_your_name';
        this.RoomInfo = new RoomInfo();
        this.StoriesInfo = new StoriesInfo();
        this.SelectedVoteCard = '-1';
        this.RoomStatus = RoomStatus.None;
        this.DieRoomTimeInitial = null;
        this.EditRoom = false;
        this.RoomCards = [];
    }
}


export class StoriesInfo {
    Stories: Story[];

    CurrentStoryId: string;
    // CurrentStoryNameChange: string;
    // CurrentStoryDescriptionChange: string;


    constructor() {
        this.Stories = [];
        this.CurrentStoryId = "";
        // this.CurrentStoryNameChange = "";
        // this.CurrentStoryDescriptionChange = "";
    }
}