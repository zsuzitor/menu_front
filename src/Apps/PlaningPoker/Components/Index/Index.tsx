// import { HubConnection } from "@microsoft/signalr";
// import { HubConnection } from "@aspnet/signalr";
import * as signalR from "@aspnet/signalr";

import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { AlertData } from "../../../../Models/Entity/AlertData";
import connectToStore, { IndexProps } from "./IndexSetup";


require('./Index.css');




let Index = (props: IndexProps) => {

    const [roomName, setRoomName] = useState(props.RoomInfo.Name || '');
    const [roomPassword, setRoomPassword] = useState(props.RoomInfo.Password || '');


    useEffect(() => {
        let pathNameUrlSplit = document.location.pathname.split('/');
        if (pathNameUrlSplit && pathNameUrlSplit.length > 2) {
            props.SetRoomName(pathNameUrlSplit[2]);
        }

        // if (props.AuthSuccess) {
        //     //грузим список комнат

        // }


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



    useEffect(() => {
        if (props.AuthSuccess && !props.RoomInfo.InRoom && !props.Rooms) {
            props.LoadRoomList();
        }
    }, [props.AuthSuccess, props.RoomInfo.InRoom]);

    useEffect(() => {
        setRoomName(props.RoomInfo.Name || '');
    }, [props.RoomInfo.Name]);

    useEffect(() => {
        setRoomPassword(props.RoomInfo.Password || '');
    }, [props.RoomInfo.Password]);


    let createRoom = () => {
        //этот метод вроде как  может подождать результат выполнения и как то получить ответ
        // props.MyHubConnection.invoke("CreateRoom", localState.RoomName, localState.RoomPassword, props.Username);
        //а вот этот не ждет
        if (!roomName) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Введите название комнаты");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        props.SetRoomName(roomName);
        props.SetRoomPassword(roomPassword);

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.CreateRoom
            , roomName, roomPassword, props.Username);
    };

    let enterInRoom = () => {
        if (!roomName) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Введите название комнаты");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        props.SetRoomName(roomName);
        props.SetRoomPassword(roomPassword);

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.EnterInRoom
            , roomName, roomPassword, props.Username);
    }



    //React.Fragment
    let actionsButton = <div>

    </div>
    (props.Username && props.HubConnected)
        ? actionsButton =
            <div className="actions-button">
                <button className="button button-grey" onClick={createRoom}>Создать</button>
                <button className="button button-grey" onClick={enterInRoom}>Подключиться</button>
            </div>
        : actionsButton = <></>

    return <div className="planing-enter-main">
        {/* <input type="hidden" value={test + ""}></input> */}
        {/* TODO из за того что сделано бутстрапом, сейчас криво, слева может быть отступ меньше чем справа, перписать*/}
        {/* TODO  посмотреть из-за чего в консоли вылезает ошибка с паролем*/}
        <div className="planing-enter-inner">
            <div className="form-input-wrapper">
                <p>Имя пользователя: {props.Username}</p>
                <input className="form-input persent-100-width"
                    onChange={(e) => props.SetUserName(e.target.value)}
                    type="text" value={props.Username}
                    placeholder='Имя пользователя'></input>
            </div>
            <div className="form-input-wrapper">
                <p>Название комнаты</p>
                <input className="form-input persent-100-width" type="text" value={roomName}
                    onChange={(e) => { setRoomName(e.target.value) }}
                    placeholder='Название комнаты'></input>
            </div>
            <div className="form-input-wrapper">
                <p>Пароль (необязательно)</p>
                <input className="form-input persent-100-width" type="password" value={roomPassword}
                    onChange={(e) => { setRoomPassword(e.target.value) }}
                    placeholder='Пароль (необязательно)'></input>
            </div>

            {actionsButton}

            <div className="display_none">
                <Link id="move_to_room_link_react" to={"/planing-poker/room/" + roomName}>hidden</Link>
            </div>
            {props.Rooms ? <div className="planing-poker-rooms-list">
                {props.Rooms.map(x => <div key={x.Name} className='one-room'
                    onClick={() => setRoomName(x.Name)}>
                    <div className="one-room-img"><img className='persent-100-width-height'
                        src={x.ImagePath || G_EmptyImagePath}
                        alt="Аватар группы" title='Аватар группы' /></div>
                    <div>{x.Name}</div>
                </div>)}
            </div> : <></>}
        </div>
        {props.AuthSuccess
            ? <></>
            : <div className="planing-enter-reminder">
                  <img className="persent-100-width-height" src={G_PathToBaseImages + 'exclamation.png'} alt="" />
                  <p>Если создать комнату без авторизации в основном приложении,
                  создается одноразовая комната (будет удалена через некоторое время).</p>
              </div>}
    </div>
}





// and that function returns the connected, wrapper component:
export default connectToStore(Index);
