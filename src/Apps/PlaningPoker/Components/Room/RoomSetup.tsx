import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ClearRoomPokerStateActionCreator } from "../../Models/Actions/Actions";
import { SetRoomNameActionCreator, SetVoteInfoActionCreator, SetRoomStatusActionCreator, VoteChangedActionCreator, SetSelectedCardActionCreator, ClearVoteActionCreator, SetEditRoomActionCreator, SetRoomCardsActionCreator, SetInitialRoomDieTimeActionCreator } from "../../Models/Actions/RoomAction";
import { SetCurrentStoryIdActionCreator, SetStoriesActionCreator, AddNewStoryActionCreator, StoryChangeActionCreator, DeleteStoryActionCreator, MoveStoryToCompleteActionCreator, UpdateStoriesIdActionCreator } from "../../Models/Actions/StoryActions";
import { SetRoomUserIdActionCreator, SetUserNameActionCreator, SetRoomUsersActionCreator, AddUserToRoomActionCreator, ChangeUserNameInRoomActionCreator, RemoveUserActionCreator, UserRoleChangedActionCreator } from "../../Models/Actions/UserActions";
import { IStoryMappingReturn } from "../../Models/BackModels/RoomWasSavedUpdateReturn";
import { EndVoteInfo } from "../../Models/Entity/EndVoteInfo";
import { RoomInfo, RoomStatus } from "../../Models/Entity/State/RoomInfo";
import { Story } from "../../Models/Entity/State/Story";
import { UserInRoom } from "../../Models/Entity/State/UserInRoom";
import { PlaningPokerUserInfo } from "../../Models/Entity/State/PlaningPokerUserInfo";
import { VoteInfo } from "../../Models/Entity/State/VoteInfo";


interface RoomOwnProps {
    MyHubConnection: signalR.HubConnection;
    HubConnected: boolean;

}


interface RoomStateToProps {

    UserInfo: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;
    VoteInfo: VoteInfo;
    UsersList: UserInRoom[];
    TotalNotActualStoriesCount: number;
    RoomStatus: RoomStatus;
    SelectedVoteCard: string;
    DieRoomTimeInitial?: Date;
    EditRoom: boolean;
    RoomCards: (string | number)[];
}

interface RoomDispatchToProps {

    SetRoomName: (name: string) => void;
    SetUserName: ((newName: string) => void);
    SetUserId: (userId: string) => void;
    SetRoomUsers: (users: UserInRoom[]) => void;
    SetVoteInfo: (voteInfo: EndVoteInfo) => void;
    SetCurrentStoryId: (id: string) => void;
    SetStories: (id: Story[]) => void;
    SetRoomStatus: (status: RoomStatus) => void;
    AddUserToRoom: (data: UserInRoom) => void;

    //какой то пользователь изменил имя, надо прорастить изменения
    ChangeAnotherUserName: (userId: string, newUserName: string) => void;
    RemoveUsers: (usersId: string[]) => void;
    VoteChanged: (userId: string, vote: string) => void;
    UserRoleChanged: (userId: string, changeType: number, role: string) => void;
    SetSelectedCard: (val: string) => void;
    ClearVote: () => void;
    AddNewStory: (story: Story) => void;
    StoryChange: (story: Story) => void;
    DeleteStory: (id: string) => void;
    MoveStoryToComplete: (oldId: string, data: Story) => void;
    UpdateStoriesId: (data: IStoryMappingReturn[]) => void;

    UpdateAllUsers: (roomname: string, userConnectionId: string) => void;
    GetRoomInfo: (roomname: string, userConnectionId: string) => void;
    StartEditRoom: () => void;
    EndEditRoom: () => void;
    SetRoomCards: (cards: string[]) => void;
    ClearPokerRoomState: () => void;
    SetInitialRoomDieTime: (date: Date) => void;
}

export interface RoomProps extends RoomStateToProps, RoomOwnProps, RoomDispatchToProps {

}




const mapStateToProps = (state: AppState, ownProps: RoomOwnProps) => {
    let res = {} as RoomStateToProps;
    res.UserInfo = state.PlaningPokerApp.User;
    res.RoomInfo = state.PlaningPokerApp.RoomInfo;
    res.VoteInfo = state.PlaningPokerApp.VoteInfo;
    res.UsersList = state.PlaningPokerApp.UsersList;
    res.TotalNotActualStoriesCount = state.PlaningPokerApp.TotalNotActualStoriesCount;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.SelectedVoteCard = state.PlaningPokerApp.SelectedVoteCard;
    res.DieRoomTimeInitial = state.PlaningPokerApp.DieRoomTimeInitial;
    res.EditRoom = state.PlaningPokerApp.EditRoom;
    res.RoomCards = state.PlaningPokerApp.RoomCards;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: RoomOwnProps) => {
    let res = {} as RoomDispatchToProps;
    res.SetUserId = (userId: string) => {
        dispatch(SetRoomUserIdActionCreator(userId));
    };

    res.SetUserName = (username: string) => {
        dispatch(SetUserNameActionCreator(username));
    };

    res.SetRoomName = (roomname: string) => {
        dispatch(SetRoomNameActionCreator(roomname));
    };


    res.SetRoomUsers = (users: UserInRoom[]) => {
        dispatch(SetRoomUsersActionCreator(users));
    };


    res.SetVoteInfo = (voteInfo: EndVoteInfo) => {
        dispatch(SetVoteInfoActionCreator(voteInfo));
    };

    res.SetCurrentStoryId = (id: string) => {
        dispatch(SetCurrentStoryIdActionCreator(id));
    };


    res.SetStories = (data: Story[]) => {
        dispatch(SetStoriesActionCreator(data));
    };

    res.SetRoomStatus = (status: RoomStatus) => {
        dispatch(SetRoomStatusActionCreator(status));

    }

    res.AddUserToRoom = (data: UserInRoom) => {
        dispatch(AddUserToRoomActionCreator(data));
    };


    res.ChangeAnotherUserName = (userId: string, newUserName: string) => {
        dispatch(ChangeUserNameInRoomActionCreator({ UserId: userId, UserName: newUserName }));
    };

    res.RemoveUsers = (usersId: string[]) => {
        dispatch(RemoveUserActionCreator(usersId));

    };

    res.VoteChanged = (userId: string, vote: string) => {
        dispatch(VoteChangedActionCreator({ UserId: userId, Vote: vote }));

    };

    res.UserRoleChanged = (userId: string, changeType: number, role: string) => {
        dispatch(UserRoleChangedActionCreator({ UserId: userId, ChangeType: changeType, Role: role }));
    }

    res.SetSelectedCard = (val: string) => {
        dispatch(SetSelectedCardActionCreator(val));

    }

    res.ClearVote = () => {
        dispatch(ClearVoteActionCreator());

    }

    res.AddNewStory = (story: Story) => {
        dispatch(AddNewStoryActionCreator(story));
    }

    res.StoryChange = (story: Story) => {
        dispatch(StoryChangeActionCreator(story));
    };

    res.DeleteStory = (id: string) => {
        dispatch(DeleteStoryActionCreator(id));

    }

    res.MoveStoryToComplete = (oldId: string, data: Story) => {
        dispatch(MoveStoryToCompleteActionCreator({ OldId: oldId, Story: data }));

    };

    res.UpdateStoriesId = (data: IStoryMappingReturn[]) => {
        dispatch(UpdateStoriesIdActionCreator(data));

    };

    res.UpdateAllUsers = (roomname: string, userConnectionId: string) => {
        dispatch(window.G_PlaningPokerController.GetUsersIsRoomRedux(roomname, userConnectionId));
    };

    res.GetRoomInfo = (roomname: string, userConnectionId: string) => {
        dispatch(window.G_PlaningPokerController.GetRoomInfoRedux(roomname, userConnectionId));
    };

    res.StartEditRoom = () => {
        dispatch(SetEditRoomActionCreator(true));
    };

    res.EndEditRoom = () => {
        dispatch(SetEditRoomActionCreator(false));
    };

    res.SetRoomCards = (cards: string[]) => {
        dispatch(SetRoomCardsActionCreator(cards));
    };

    res.ClearPokerRoomState = () => {
        dispatch(ClearRoomPokerStateActionCreator());
    }

    res.SetInitialRoomDieTime = (date: Date) => {
        dispatch(SetInitialRoomDieTimeActionCreator(date));
    }

    return res;
};



export default connect(mapStateToProps, mapDispatchToProps);