// import *, {useEffect} as React from "react";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
// import * as signalR from "@microsoft/signalr";
import Index from "./Index";
import Room from "./Room/Room";
import { AlertData } from '../../../Models/Models/AlertData';
import { RoomInfo } from '../../../Models/Models/PlaningPoker/RoomInfo';

// import { HubConnection } from '@microsoft/signalr';
// import signalR, { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";
import { IAuthState } from '../../../Models/Models/AuthState';
import cloneDeep from 'lodash/cloneDeep';
import { MainErrorObjectBack } from '../../../Models/BackModel/ErrorBack';
import { connect } from 'react-redux';
import { AppState } from '../../../Models/Models/State/AppState';
import { EnteredInRoomActionCreator, SetUserConnectionIdActionCreator, SetUserNameActionCreator } from '../../../Models/Actions/PlaningPokerApp/Actions';


interface PlaningPokerMainOwnProps {
}

interface PlaningPokerMainStateToProps {
    RoomInfo: RoomInfo;
    AuthInfo: IAuthState;
}

interface PlaningPokerMainDispatchToProps {
    // TryToRemoveUserFromRoom: (userId: string, roomname: string, currentUserIsAdmin: boolean) => void;
    EnteredInRoom: (roomUserId: string, loginnedInMainApp: boolean) => void;
    SetUserConnectionId: (userConnectionId: string) => void;
    SetUserName: ((newName: string) => void);
}

interface PlaningPokerMainProps extends PlaningPokerMainStateToProps, PlaningPokerMainOwnProps, PlaningPokerMainDispatchToProps {

}




//см коммент для __planing_room_props_ref__

let __planing_poker_hubConnected_ref__: boolean = false;
let __planing_poker_roomname_ref__: string = '';//todo надо проверить можно ли убрать это


const PlaningPokerMain = (props: PlaningPokerMainProps) => {
    __planing_poker_roomname_ref__ = props.RoomInfo?.Name;


    // initState.User.UserName = "enter_your_name";
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
    // const [localState, setLocalState] = useState(initState);
    // __planing_poker_main_state_ref__ = localState;
    const [hubConnected, sethubConnectedState] = useState(false);
    __planing_poker_hubConnected_ref__ = hubConnected;



    //componentdidmount, должен вызваться уже когда childs отрендерятся
    useEffect(() => {

        hubConnection.onclose(() => {
            //todo тут сообщение об ошибке или что то еще мб перезагрузить страницу\редирект?
        });

        // window.onbeforeunload = function(e) {
        //     var dialogText = 'Dialog text here';
        //     e.returnValue = dialogText;
        //     return dialogText;
        //   };

        window.addEventListener('beforeunload', (event) => {
            if (__planing_poker_hubConnected_ref__) {
                hubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.OnWindowClosedAsync, __planing_poker_roomname_ref__);
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
            if (!dataT?.errors) {
                return;
            }
            let alertFactory = new AlertData();

            dataT.errors.forEach(errLvl1 => {
                errLvl1.errors.forEach(errTxt => {
                    let alert = alertFactory.GetDefaultError(errTxt);
                    window.G_AddAbsoluteAlertToState(alert);
                });
            });

        });

        hubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.EnteredInRoom, function (roomUserId: string, loginnedInMainApp: boolean) {
            props.EnteredInRoom(roomUserId, loginnedInMainApp);

            // document.cookie = "planing_poker_roomname=" + __planing_poker_main_state_ref__.RoomInfo.Name + "; path=/;";
            // let lk = document.getElementById('move_to_room_link_react');
            // //todo типо костыль
            // //если этой линки нет, значит мы уже на странице румы
            // if (lk) {
            //     // history.pushState(null, '/planing-poker/room/' + localState.RoomInfo.Name);
            //     lk.click();
            // }

            // history.pushState(null, '/');
            // history.pushState(null, '/messages');
            // window.document.title

        });


        hubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.ConnectedToRoomError, function () {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Подключение не удалось");
            window.G_AddAbsoluteAlertToState(alert);
            if (!location.href.includes("/planing-poker") || location.href.includes("/planing-poker/room")) {// && !location.href.endsWith("/planing-poker/")) {
                let roomName = __planing_poker_roomname_ref__ || "";
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
                        props.SetUserConnectionId(connectionId);
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
            props.SetUserName(props.AuthInfo.User.Name || props.AuthInfo.User.Email);
        }

    }, [props.AuthInfo.AuthSuccess]);



    useEffect(() => {
        if (props.RoomInfo.InRoom && !window.location.href.includes('planing-poker/room/')) {
            let lk = document.getElementById('move_to_room_link_react');
            if (lk) {
                // history.pushState(null, '/planing-poker/room/' + localState.RoomInfo.Name);
                lk.click();
            }
        }
    }, [props.RoomInfo.InRoom]);








    return <div>
        <Routes>
            <Route path="/room/*" element={<Room
                //  InRoom={localState.InRoom}
                MyHubConnection={myHubConnection}
                HubConnected={hubConnected}
            />
            } />

            {/* exact */}
            <Route path="/*" element={<Index
                MyHubConnection={myHubConnection}
                HubConnected={hubConnected}
            // InRoom={localState.InRoom}
            />
            } />

        </Routes>
    </div>
}





const mapStateToProps = (state: AppState, ownProps: PlaningPokerMainOwnProps) => {
    let res = {} as PlaningPokerMainStateToProps;
    res.RoomInfo = state.PlaningPokerApp.RoomInfo;
    res.AuthInfo = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: PlaningPokerMainOwnProps) => {
    let res = {} as PlaningPokerMainDispatchToProps;
    res.EnteredInRoom = (roomUserId: string, loginnedInMainApp: boolean) => {

        dispatch(EnteredInRoomActionCreator({ RoomUserId: roomUserId, LoginnedInMainApp: loginnedInMainApp }));
    };

    res.SetUserConnectionId = (userConnectionId: string) => {
        dispatch(SetUserConnectionIdActionCreator(userConnectionId));
    };

    res.SetUserName = (username: string) => {
        dispatch(SetUserNameActionCreator(username));
    };


    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(PlaningPokerMain);




