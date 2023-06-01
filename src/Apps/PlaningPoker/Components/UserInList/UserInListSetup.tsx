import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { PlaningPokerUserInfo } from "../../Models/Entity/State/PlaningPokerUserInfo";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { RoomStatus } from "../../Models/Entity/State/RoomInfo";
import { UserInRoom } from "../../Models/Entity/State/UserInRoom";

interface UserInListOwnProps {
    User: UserInRoom;
    RenderForAdmin: boolean;
    HideVote: boolean;
    HasVote: boolean;
    MyHubConnection: signalR.HubConnection;
    CurrentUserIsAdmin: boolean;

}


interface UserInListStateToProps {

    RoomStatus: RoomStatus;

    MinVote: number;
    MaxVote: number;
    RoomName: string;
    AuthInfo: IAuthState;
    PlaningUserInfo: PlaningPokerUserInfo;

}

interface UserInListDispatchToProps {

}

export interface UserInListProps extends UserInListStateToProps, UserInListOwnProps, UserInListDispatchToProps {

}



const mapStateToProps = (state: AppState, ownProps: UserInListOwnProps) => {
    let res = {} as UserInListStateToProps;
    res.RoomName = state.PlaningPokerApp.RoomInfo?.Name;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.MaxVote = state.PlaningPokerApp.VoteInfo?.MaxVote;
    res.MinVote = state.PlaningPokerApp.VoteInfo?.MinVote;
    res.AuthInfo = state.Auth;
    res.PlaningUserInfo = state.PlaningPokerApp.User;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: UserInListOwnProps) => {
    let res = {} as UserInListDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);