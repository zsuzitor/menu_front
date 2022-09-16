// import { HubConnection } from "@microsoft/signalr";
// import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";

import { type } from "os";
import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { AlertData } from "../../../../Models/Models/AlertData";
import { RoomInfo } from "../../../../Models/Models/PlaningPoker/RoomInfo";


require('./Index.css');

class IndexState {
    // RoomName: string;
    // RoomPassword: string;

    constructor() {
        // this.RoomName = "";
        // this.RoomPassword = "";
    }
}

class IndexProps {
    Username: string;
    ChangeUserName: ((newName: string) => void);
    MyHubConnection: signalR.HubConnection;
    RoomInfo: RoomInfo;
    RoomNameChanged: (name: string) => void;
    RoomPasswordChanged: (name: string) => void;

}


let Index = (props: IndexProps) => {





    useEffect(() => {
        let pathNameUrlSplit = document.location.pathname.split('/');
        if (pathNameUrlSplit && pathNameUrlSplit.length > 2) {
            props.RoomNameChanged(pathNameUrlSplit[2]);
        }

        // console.log("Index");
        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.RoomNotCreated, function () {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Комната не создана");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        });




        return function cleanUp() {
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.RoomNotCreated);

        };
    }, []);



    let createRoom = () => {
        //этот метод вроде как  может подождать результат выполнения и как то получить ответ
        // props.MyHubConnection.invoke("CreateRoom", localState.RoomName, localState.RoomPassword, props.Username);
        //а вот этот не ждет
        if (!props.RoomInfo.Name) {
            alert('Введите название комнаты');
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.CreateRoom, props.RoomInfo.Name, props.RoomInfo.Password, props.Username);
    };

    let enterInRoom = () => {
        if (!props.RoomInfo.Name) {
            alert('Введите название комнаты');
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.EnterInRoom, props.RoomInfo.Name, props.RoomInfo.Password, props.Username);
    }



    //React.Fragment
    let actionsButton = <div>

    </div>
    if (props.Username) {
        actionsButton = <div>
            <button className="btn btn-b-light" onClick={createRoom}>Создать</button>
            <button className="btn btn-b-light" onClick={enterInRoom}>Подключиться</button>
        </div>
    }

    return <div className="planing-enter-main">
        {/* <input type="hidden" value={test + ""}></input> */}
        {/* TODO из за того что сделано бутстрапом, сейчас криво, слева может быть отступ меньше чем справа, перписать*/}
        <div className="planing-enter-inner col-sm-6 col-md-5 col-lg-4 offset-sm-3 offset-lg-4">
            <div>
                <p>изменить имя: {props.Username}</p>
                <input className="form-control persent-100-width" onChange={(e) => props.ChangeUserName(e.target.value)} type="text" value={props.Username}></input>
            </div>
            <div>
                <p>название</p>
                <input className="form-control persent-100-width" type="text" value={props.RoomInfo.Name}
                    onChange={(e) => { props.RoomNameChanged(e.target.value) }}></input>

                {/* <span>создать без пароля</span>
                <input onClick={() => withoutPasswordOnClick()} type="checkbox"></input> */}
                <div>
                    <p>пароль(необязательно)</p>
                    <input className="form-control persent-100-width" type="text" value={props.RoomInfo.Password}
                        onChange={(e) => { props.RoomPasswordChanged(e.target.value) }}></input>
                </div>
                <p>если создать комнату без авторизации в основном приложении,
                    создается одноразовая комната(будет удалена через некоторое время)</p>
            </div>
            {actionsButton}
            <div className="display_none">
                <Link id="move_to_room_link_react" to={"/planing-poker/room/" + props.RoomInfo.Name}>hidden</Link>

            </div>
        </div>
    </div>
}



export default Index;
