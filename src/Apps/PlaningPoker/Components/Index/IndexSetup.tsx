import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetRoomNameActionCreator, SetRoomPasswordActionCreator } from "../../Models/Actions/RoomAction";
import { SetUserNameActionCreator } from "../../Models/Actions/UserActions";
import { RoomInfo } from "../../Models/Entity/State/RoomInfo";
import { RoomShortInfo } from "../../Models/Entity/State/RoomShortInfo";

interface IndexOwnProps {
    MyHubConnection: signalR.HubConnection;
    HubConnected: boolean;
}
interface IndexStateToProps {
    RoomInfo: RoomInfo;
    Username: string;
    // LogginnedInMainApp: boolean;
    AuthSuccess: boolean;
    Rooms: RoomShortInfo[];
}

interface IndexDispatchToProps {
    SetUserName: ((newName: string) => void);
    SetRoomName: (name: string) => void;
    SetRoomPassword: (name: string) => void;
    LoadRoomList: () => void;
}

export interface IndexProps extends IndexStateToProps, IndexOwnProps, IndexDispatchToProps {
}





const mapStateToProps = (state: AppState, ownProps: IndexOwnProps) => {
    let res = {} as IndexStateToProps;
    res.RoomInfo = state.PlaningPokerApp.RoomInfo;
    res.Username = state.PlaningPokerApp.User.UserName;
    // res.LogginnedInMainApp = state.PlaningPokerApp.User.LoginnedInMainApp;
    res.AuthSuccess = state.Auth.AuthSuccess;
    res.Rooms = state.PlaningPokerApp.RoomsList;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IndexOwnProps) => {
    let res = {} as IndexDispatchToProps;
    res.SetUserName = (username: string) => {
        dispatch(SetUserNameActionCreator(username));
    };

    res.SetRoomName = (roomname: string) => {
        dispatch(SetRoomNameActionCreator(roomname));
    }

    res.SetRoomPassword = (roompass: string) => {
        dispatch(SetRoomPasswordActionCreator(roompass));
    }

    res.LoadRoomList = () => {
        dispatch(window.G_PlaningPokerController.GetRoomsListRedux());
    };

    return res;
};

export default connect(mapStateToProps, mapDispatchToProps);
