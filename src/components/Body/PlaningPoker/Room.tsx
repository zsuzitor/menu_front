// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomSatus } from './Models/RoomInfo';


import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';
import { IUserInRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn';
import UserInList from './UserInList';

class RoomProps {
    // InRoom: boolean;
    Username: string;
    RoomInfo: RoomInfo;

    MyHubConnection: signalR.HubConnection;
}

class RoomState {
    UsersList: UserInRoom[];
    CurrentVote?: number;
    RoomStatus: RoomSatus;


    constructor() {
        this.UsersList = [];
        this.CurrentVote = null;
    }

}

const Room = (props: RoomProps) => {

    if (!props.RoomInfo.InRoom) {//TODO тут по хорошему надо узнать название русы из урла и попросить ввести пароль, но пока что так
        window.location.href = "/planing-poker";
    }

    let initState = new RoomState();
    const [localState, setLocalState] = useState(initState);


    useEffect(() => {
        let loadedUsers = (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                let newUsersData = data.map(x => {
                    let us = new UserInRoom();
                    us.FillByBackModel(x);
                    return us;
                });
                let newState = { ...localState };
                newState.UsersList = newUsersData;
                setLocalState(newState);
            }

        };
        // console.log(JSON.stringify(props));
        window.G_PlaningPokerController.GetUsersIsRoom(props.RoomInfo.Name, loadedUsers);


    }, []);



    return <div className="container">
        <div className="padding-10-top"></div>
        <div>Room {props.RoomInfo.Name}</div>
        <div className="row">
            {/* <div className="persent-100-width"> */}
            <div className="planit-room-left-part col-12 col-md-9">
                <div>оценки</div>
                <div>описание задач?</div>
            </div>
            <div className="planit-room-right-part col-12 col-md-3">
                <div>люди</div>
                {localState.UsersList.map(x => {
                    return <UserInList key={x.Id} User={x} />
                })}
            </div>
            {/* </div> */}

            {/* <input type="hidden" value={props.InRoom + ''}></input> */}

            <div className="display_none">
                <Link id="move_to_index_link_react" to="/planing-poker/">hidden</Link>
            </div>
        </div>
    </div>
}




export default Room;