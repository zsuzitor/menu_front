// import { HubConnection } from "@microsoft/signalr";
// import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";

import { type } from "os";
import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { AlertData } from "../../_ComponentsLink/Models/AlertData";
import { RoomInfo } from "./Models/RoomInfo";


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
    RoomInfo:RoomInfo;
    RoomNameChanged: (name: string) => void;
    RoomPasswordChanged: (name: string) => void;
    // InRoom: boolean;
    // SetHubHandlers:()=>void;

    // SetRoomNotCreated:()=>void;
    // SetConnectedToRoomError:()=>void;
}


let Index = (props: IndexProps) => {

    const initState = new IndexState();
    const [localState, setLocalState] = useState(initState);



 






    useEffect(() => {
        // console.log("Index");
        props.MyHubConnection.on("RoomNotCreated", function () {
            let alert = new AlertData();
            alert.Text = "Комната не создана";
            alert.Type = 1;
            window.G_AddAbsoluteAlertToState(alert);
            return;
        });
    
        props.MyHubConnection.on("ConnectedToRoomError", function () {
            let alert = new AlertData();
            alert.Text = "подключение не удалось";
            alert.Type = 1;
            window.G_AddAbsoluteAlertToState(alert);
            return;
        });



    }, []);



    let createRoom = () => {
        //этот метод вроде как  может подождать результат выполнения и как то получить ответ
        // props.MyHubConnection.invoke("CreateRoom", localState.RoomName, localState.RoomPassword, props.Username);
        //а вот этот не ждет
        props.MyHubConnection.send("CreateRoom", props.RoomInfo.Name, props.RoomInfo.Password, props.Username);
    };

    let enterInRoom = () => {
        props.MyHubConnection.send("EnterInRoom", props.RoomInfo.Name, props.RoomInfo.Password, props.Username);
    }















    //React.Fragment
    let hasName = <div>

    </div>
    if (props.Username) {
        hasName = <div>
            <div>
                <p>название</p>
                <input type="text" value={props.RoomInfo.Name}
                    onChange={(e) => { props.RoomNameChanged(e.target.value) }}></input>
                <p>пароль</p>
                <input type="text" value={props.RoomInfo.Password}
                    onChange={(e) => { props.RoomPasswordChanged(e.target.value) }}></input>

                <button onClick={createRoom}>создать комнату</button>
                <button onClick={enterInRoom}>подключиться к существующей комнате</button>

            </div>

        </div>
    }

    return <div>
        <div>
            <p>изменить имя: {props.Username}</p>
            <input onChange={(e) => props.ChangeUserName(e.target.value)} type="text" value={props.Username}></input>
        </div>
        {hasName}
        <div className="display_none">
            <Link id="move_to_room_link_react" to="/planing-poker/room">hidden</Link>

        </div>
    </div>
}



export default Index;
