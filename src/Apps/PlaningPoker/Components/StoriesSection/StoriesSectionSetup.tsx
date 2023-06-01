import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { PlaningPokerUserInfo } from "../../Models/Entity/State/PlaningPokerUserInfo";
import { RoomStatus } from "../../Models/Entity/State/RoomInfo";
import { Story } from "../../Models/Entity/State/Story";

export enum ListStoryType { Actual = 1, ThisSession, Old };


interface StoriesSectionOwnProps {
    MyHubConnection: signalR.HubConnection;
    IsAdmin: boolean;
}


interface StoriesSectionStateToProps {
    UserInfo: PlaningPokerUserInfo;
    RoomName: string;
    RoomStatus: RoomStatus;
    NotActualStories: Story[];
    Stories: Story[];
    CurrentStoryId: string;
    TotalNotActualStoriesCount: number;
}

interface StoriesSectionDispatchToProps {
    LoadOldStories: (roomname: string, userConnectionId: string
        , storiesPageNumber: number, countStoriesOnPage: number) => void;
}

export interface StoriesSectionProps extends StoriesSectionStateToProps, StoriesSectionOwnProps, StoriesSectionDispatchToProps {

}

export class StoriesSectionState {
    NameForAdd: string;
    DescriptionForAdd: string;
    SortByDateAsc: boolean;



    constructor() {
        this.NameForAdd = "";
        this.DescriptionForAdd = "";
        this.SortByDateAsc = false;
    }
}


const mapStateToProps = (state: AppState, ownProps: StoriesSectionOwnProps) => {
    let res = {} as StoriesSectionStateToProps;
    res.RoomName = state.PlaningPokerApp.RoomInfo.Name;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.UserInfo = state.PlaningPokerApp.User;
    res.NotActualStories = state.PlaningPokerApp.NotActualStories;
    res.Stories = state.PlaningPokerApp.StoriesInfo.Stories;
    res.CurrentStoryId = state.PlaningPokerApp.StoriesInfo.CurrentStoryId;
    res.TotalNotActualStoriesCount = state.PlaningPokerApp.TotalNotActualStoriesCount;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: StoriesSectionOwnProps) => {
    let res = {} as StoriesSectionDispatchToProps;
    res.LoadOldStories = (roomname: string, userConnectionId: string
        , storiesPageNumber: number, countStoriesOnPage: number) => {
        // console.log(JSON.stringify(props));
        dispatch(window.G_PlaningPokerController.GetNotActualStoriesRedux(roomname, userConnectionId, storiesPageNumber, countStoriesOnPage));

    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);