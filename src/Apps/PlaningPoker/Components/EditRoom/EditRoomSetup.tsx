import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { PlaningPokerUserInfo } from "../../Models/Entity/State/PlaningPokerUserInfo";
import { RoomStatus } from "../../Models/Entity/State/RoomInfo";

export enum SettingsPage { Info = 0, Password, Marks };


interface EditRoomOwnProps {
    MyHubConnection: signalR.HubConnection;

}

interface EditRoomStateToProps {
    RoomName: string;
    UserInfo: PlaningPokerUserInfo;
    RoomStatus: RoomStatus;
    Cards: (string | number)[];
}

interface EditRoomDispatchToProps {
    UpdateRoomImage: (roomname: string, img: File) => void;
}

export interface EditRoomProps extends EditRoomStateToProps, EditRoomOwnProps, EditRoomDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: EditRoomOwnProps) => {
    let res = {} as EditRoomStateToProps;
    res.RoomName = state.PlaningPokerApp.RoomInfo?.Name;
    res.UserInfo = state.PlaningPokerApp.User;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.Cards = state.PlaningPokerApp.RoomCards;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: EditRoomOwnProps) => {
    let res = {} as EditRoomDispatchToProps;
    res.UpdateRoomImage = (roomname: string, img: File) => {
        dispatch(window.G_PlaningPokerController.UpdateRoomImageRedux(roomname, img));
    };
    return res;
};

export default connect(mapStateToProps, mapDispatchToProps);
