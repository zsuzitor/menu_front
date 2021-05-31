// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomSatus, PlaningPokerUserInfo } from './Models/RoomInfo';


import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';
import { IUserInRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn';
import UserInList from './UserInList';

class RoomProps {
    // InRoom: boolean;
    UserInfo: PlaningPokerUserInfo;
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

    if (!props.RoomInfo.InRoom) {//TODO тут по хорошему надо узнать название румы из урла и попросить ввести пароль, но пока что так
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
                //реинициализировать нельзя, почему то отваливается
                newState.UsersList.splice(0, newState.UsersList.length);
                newState.UsersList.push(...newUsersData);
                // newState.UsersList = newUsersData;
                setLocalState(newState);
            }

        };
        // console.log(JSON.stringify(props));
        window.G_PlaningPokerController.GetUsersIsRoom(props.RoomInfo.Name, loadedUsers);



        props.MyHubConnection.on("NewUserInRoom", function (data) {
            if (!data) {
                return;
            }

            let dataTyped = data as IUserInRoomReturn;
            let us = new UserInRoom();
            us.FillByBackModel(dataTyped);
            let newState = { ...localState };
            newState.UsersList.push(us);
            setLocalState(newState);
        });


        props.MyHubConnection.on("UserLeaved", function (userId) {
            if (!userId) {
                return;
            }

            if (userId == props.UserInfo.UserId) {
                alert("you kicked or leave");//TODO может как то получше сделать, и хорошо бы без перезагрузки\редиректа
                window.location.href = "/planing-poker";
                return;
            }

            let newState = { ...localState };
            let userIndex = newState.UsersList.findIndex(x => x.Id === userId);
            if (userIndex < 0) {
                return;
            }

            newState.UsersList.splice(userIndex, 1);
            setLocalState(newState);
        });





    }, []);



    let tryToRemoveUserFromRoom = (userId: string) => {
        let user = localState.UsersList.find(x => x.Id == props.UserInfo.UserId);
        if (!user || !user.IsAdmin) {
            return;
        }

        props.MyHubConnection.send("KickUser", props.RoomInfo.Name, userId);


    }





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
                {localState.UsersList.map(x =>
                    <UserInList key={x.Id} User={x} TryToRemoveUserFromRoom={tryToRemoveUserFromRoom} />
                )}
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