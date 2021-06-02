// import *, {useEffect} as React from "react";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// import * as signalR from "@microsoft/signalr";
import Index from "./Index";
import Room from "./Room";
import { AlertData } from '../../_ComponentsLink/Models/AlertData';
import { PlaningPokerUserInfo, RoomInfo } from './Models/RoomInfo';

// import { HubConnection } from '@microsoft/signalr';
// import signalR, { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
// import * as signalR from '@aspnet/signalr'



// "@microsoft/signalr": "^5.0.6",
//





class PlaningPokerMainState {
    MyHubConnection: signalR.HubConnection;
    User: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;
    // InRoom: boolean;//по сути надо дернуть обновление стейта для перерендера
    constructor() {
        this.MyHubConnection = null;
        this.User = new PlaningPokerUserInfo();
        this.RoomInfo = new RoomInfo();

    }
}


require('../../../../style/planing_poker.css');


const PlaningPokerMain = () => {



    let initState = new PlaningPokerMainState();
    const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl("/planing-poker-hub"
        // , {
        //     skipNegotiation: true,
        //     transport: signalR.HttpTransportType.WebSockets//TODO эти 2 строки вроде как костыль
        // }
        )
        .build();

    // https://stackoverflow.com/questions/52086158/angular-signalr-error-failed-to-complete-negotiation-with-the-server
    //https://github.com/aspnet/SignalR/issues/2608
    //https://docs.microsoft.com/en-us/aspnet/core/tutorials/signalr-typescript-webpack?view=aspnetcore-2.1&tabs=visual-studio

    initState.MyHubConnection = hubConnection;
    const [localState, setLocalState] = useState(initState);




    //componentdidmount, должен вызваться уже когда childs отрендерятся
    useEffect(() => {
        //  console.log("PlaningPokerMain");
        // alert("PlaningPokerMain");
        // hubConnection.start();

        hubConnection.on("NotifyFromServer", function (data) {
            let alert = new AlertData();
            alert.Text = data.text;
            alert.Type = data.status;
            window.G_AddAbsoluteAlertToState(alert);
        });

        hubConnection.on("EnteredInRoom", function () {
            // window.history.pushState(null, "Room", "/");
            // window.history.pushState(null, "Room", "/planing-poker/room");
            let newState = { ...localState };
            newState.RoomInfo.InRoom = true;
            setLocalState(newState);
            let lk = document.getElementById('move_to_room_link_react');
            lk.click();
            // history.pushState(null, '/');
            // history.pushState(null, '/messages');
            // window.document.title

        });



        // возможно тут стоит выделить в child components методы которые вызвать до старта
        //Update, не стоит тк они актуальны только в самих компонентах
        hubConnection.start()
            .then(function () {
                hubConnection.invoke("GetConnectionId")
                    .then(function (connectionId) {
                        let newState = { ...localState };
                        newState.User.UserId = connectionId;
                        setLocalState(newState);
                    })
            }).catch(function () { alert("что то не так с подключением обновите страницу"); });


        // let newState = { ...localState };
        // newState.MyHubConnection = hubConnection;
        // setLocalState(newState);
    }, []);


    let userNameChange = (newName: string) => {
        let newState = { ...localState };
        newState.User.UserName = newName;
        setLocalState(newState);
    }


    let roomNameChanged = (name: string) => {
        let newState = { ...localState };
        newState.RoomInfo.Name = name;
        setLocalState(newState);
    }

    let roomPasswordChanged = (password: string) => {
        let newState = { ...localState };
        newState.RoomInfo.Password = password;
        setLocalState(newState);
    }







    return <div>
        <Switch>
            <Route exact path="/planing-poker" render={() =>
                <Index
                    Username={localState.User.UserName}
                    ChangeUserName={userNameChange}
                    MyHubConnection={localState.MyHubConnection}
                    RoomNameChanged={roomNameChanged}
                    RoomPasswordChanged={roomPasswordChanged}
                    RoomInfo={localState.RoomInfo}
                // InRoom={localState.InRoom}
                />} />
            <Route path="/planing-poker/room" render={() =>
                <Room
                    //  InRoom={localState.InRoom}
                    UserInfo={localState.User}
                    RoomInfo={localState.RoomInfo}
                    MyHubConnection={localState.MyHubConnection}
                />
            } />
        </Switch>
    </div>
}






export default PlaningPokerMain;
