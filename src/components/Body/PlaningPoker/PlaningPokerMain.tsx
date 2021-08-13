// import *, {useEffect} as React from "react";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
// import * as signalR from "@microsoft/signalr";
import Index from "./Index";
import Room from "./Room";
import { AlertData, AlertTypeEnum } from '../../_ComponentsLink/Models/AlertData';
import { PlaningPokerUserInfo, RoomInfo } from './Models/RoomInfo';

// import { HubConnection } from '@microsoft/signalr';
// import signalR, { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
import { IAuthState } from '../../_ComponentsLink/Models/AuthState';
import cloneDeep from 'lodash/cloneDeep';
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';

// import * as signalR from '@aspnet/signalr'



// "@microsoft/signalr": "^5.0.6",
//





class PlaningPokerMainState {
    // MyHubConnection: signalR.HubConnection;
    User: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;
    // InRoom: boolean;//по сути надо дернуть обновление стейта для перерендера
    constructor() {
        // this.MyHubConnection = null;
        this.User = new PlaningPokerUserInfo();
        this.RoomInfo = new RoomInfo();

    }
}

class PlaningPokerMainProps {
    AuthInfo: IAuthState;
}

require('../../../../style/planing_poker.css');


//см коммент для __planing_room_props_ref__
let __planing_poker_main_state_ref__: PlaningPokerMainState = null;
let __planing_poker_hubConnected_ref__:boolean = false;

const PlaningPokerMain = (props: PlaningPokerMainProps) => {



    let initState = new PlaningPokerMainState();
    initState.User.UserName = "enter_your_name";
    // console.log(initState.User.UserName);
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

    // initState.MyHubConnection = hubConnection;
    const [myHubConnection, setHubConnection] = useState(hubConnection);
    const [localState, setLocalState] = useState(initState);
    __planing_poker_main_state_ref__ = localState;
    const [hubConnected, sethubConnectedState] = useState(false);
    __planing_poker_hubConnected_ref__ = hubConnected;



    //componentdidmount, должен вызваться уже когда childs отрендерятся
    useEffect(() => {
        hubConnection.onclose(() => {
            // console.log(JSON.stringify(__planing_poker_main_state_ref__));
            // alert("asd");
            //todo тут сообщение об ошибке или что то еще мб перезагрузить страницу\редирект?
        });

        // window.onbeforeunload = function(e) {
        //     var dialogText = 'Dialog text here';
        //     e.returnValue = dialogText;
        //     return dialogText;
        //   };

        window.addEventListener('beforeunload', (event) => {
            if (__planing_poker_hubConnected_ref__) {
                hubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.OnWindowClosedAsync, __planing_poker_main_state_ref__?.RoomInfo?.Name);
            }

            // console.log(JSON.stringify(__planing_poker_main_state_ref__));
            // var dialogText = 'Dialog text here';
            // event.returnValue = dialogText;
            // return dialogText;

            // Отмените событие, как указано в стандарте.
            //event.preventDefault();
            // Chrome требует установки возвратного значения.
            //event.returnValue = '';
        });



        hubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.PlaningNotifyFromServer, function (data) {
            let dataT = data as MainErrorObjectBack;
            let alert = new AlertData();
            if (!dataT) {
                return;
            }

            dataT.errors.forEach(errLvl1 => {
                errLvl1.errors.forEach(errTxt => {

                    alert.Text = errTxt;
                    alert.Type = AlertTypeEnum.Error;
                    alert.Timeout = 5000;
                });
            });

            // alert.Text = data.text;
            // alert.Type = data.status;


            window.G_AddAbsoluteAlertToState(alert);
        });

        hubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.EnteredInRoom, function (roomUserId, loginnedInMainApp: boolean) {

            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                newState.RoomInfo.InRoom = true;
                newState.User.UserId = roomUserId;
                newState.User.LoginnedInMainApp = loginnedInMainApp;

                newState.RoomInfo.Password = "";
                return newState;
            });

            document.cookie = "planing_poker_roomname=" + __planing_poker_main_state_ref__.RoomInfo.Name + "; path=/;";
            let lk = document.getElementById('move_to_room_link_react');
            //todo типо костыль
            //если этой линки нет, значит мы уже на странице румы
            if (lk) {
                // history.pushState(null, '/planing-poker/room/' + localState.RoomInfo.Name);
                lk.click();
            }

            // history.pushState(null, '/');
            // history.pushState(null, '/messages');
            // window.document.title

        });


        hubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.ConnectedToRoomError, function () {
            let alert = new AlertData();
            alert.Text = "подключение не удалось";
            alert.Type = 1;
            window.G_AddAbsoluteAlertToState(alert);
            if (!location.href.includes("/planing-poker") || location.href.includes("/planing-poker/room")) {// && !location.href.endsWith("/planing-poker/")) {
                let roomName = __planing_poker_main_state_ref__.RoomInfo.Name || "";
                window.location.href = "/planing-poker/" + roomName;
            }
            return;
        });


        hubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.NeedRefreshTokens, function () {
            window.G_AuthenticateController.RefreshAccessToken(true, null);
        });




        // возможно тут стоит выделить в child components методы которые вызвать до старта
        //Update, не стоит тк они актуальны только в самих компонентах
        hubConnection.start()
            .then(function () {
                hubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.GetConnectionId)
                    .then(function (connectionId) {
                        // let newState = { ...localState };
                        // newState.User.UserId = connectionId;
                        // setLocalState(newState);
                        setLocalState(prevState => {
                            // let newState = { ...prevState };
                            let newState = cloneDeep(prevState);
                            newState.User.UserConnectionId = connectionId;

                            return newState;
                        });
                        //sethubConnectedState(true);
                        sethubConnectedState(prevState => {
                            return true;
                        });
                    })
            }).catch(function () {
                alert("что то не так с подключением обновите страницу");
                // sethubConnectedState(false);
                sethubConnectedState(prevState => {
                    return false;
                });
            });







        return function cleanUp() {
            hubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.ConnectedToRoomError);
            hubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.EnteredInRoom);
            hubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.PlaningNotifyFromServer);
            hubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.NeedRefreshTokens);

        };


    }, []);



    useEffect(() => {
        if (props.AuthInfo.AuthSuccess) {
            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                newState.User.UserName = props.AuthInfo.User.Email;
                return newState;
            });
        }

    }, [props.AuthInfo.AuthSuccess])



    const userNameChange = (newName: string) => {

        setLocalState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.User.UserName = newName;

            return newState;
        });

    }


    const roomNameChanged = (name: string) => {
        // let newState = { ...localState };
        // newState.RoomInfo.Name = name;
        // setLocalState(newState);
        setLocalState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.RoomInfo.Name = name;

            return newState;
        });
    }

    const roomPasswordChanged = (password: string) => {
        // let newState = { ...localState };
        // newState.RoomInfo.Password = password;
        // setLocalState(newState);
        setLocalState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.RoomInfo.Password = password;

            return newState;
        });
    }

    const clearUserId = () => {
        setLocalState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.User.UserId = "";
            return newState;
        });
    }





    return <div>
        <Switch>
            <Route path="/planing-poker/room" render={() =>
                <Room
                    //  InRoom={localState.InRoom}
                    UserInfo={localState.User}
                    RoomInfo={localState.RoomInfo}
                    MyHubConnection={myHubConnection}
                    RoomNameChanged={roomNameChanged}
                    ChangeUserName={userNameChange}
                    HubConnected={hubConnected}
                    ClearUserId={clearUserId}
                />
            } />

            {/* exact */}
            <Route path="/planing-poker" render={() =>
                <Index
                    Username={localState.User.UserName}
                    ChangeUserName={userNameChange}
                    MyHubConnection={myHubConnection}
                    RoomNameChanged={roomNameChanged}
                    RoomPasswordChanged={roomPasswordChanged}
                    RoomInfo={localState.RoomInfo}
                // InRoom={localState.InRoom}
                />} />

        </Switch>
    </div>
}






export default PlaningPokerMain;

