// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomSatus, PlaningPokerUserInfo } from './Models/RoomInfo';


import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';
import { IUserInRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn';
import UserInList from './UserInList';
import OneVoteCard from './OneVoteCard';

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

    SelectedVoteCard: number;

    constructor() {
        this.UsersList = [];
        this.CurrentVote = null;
        this.SelectedVoteCard = -1;
    }

}

let CurrentUserIsAdmin: (st: RoomState, userId: string) => boolean = (st: RoomState, userId: string) => {
    let user = st.UsersList.find(x => x.Id === userId);
    if (user && user.IsAdmin) {
        return true;
    }

    return false;
}





const Room = (props: RoomProps) => {

    if (!props.RoomInfo.InRoom) {//TODO тут по хорошему надо узнать название румы из урла и попросить ввести пароль, но пока что так
        window.location.href = "/planing-poker";
    }

    let initState = new RoomState();
    initState.RoomStatus = RoomSatus.AllCanVote;//TODO надо заменить запрос на получение пользователей на запрос получение roominfo и там будет статус
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


        props.MyHubConnection.on("VoteChanged", function (userId, vote) {
            if (!userId) {
                return;
            }

            let newState = { ...localState };
            let userIndex = newState.UsersList.findIndex(x => x.Id === userId);
            if (userIndex < 0) {
                return;
            }

            newState.UsersList[userIndex].Vote = vote;
            setLocalState(newState);
        });





    }, []);



    let tryToRemoveUserFromRoom = (userId: string) => {
        let isAdmin = CurrentUserIsAdmin(localState, props.UserInfo.UserId);
        if (!isAdmin) {
            return;
        }

        props.MyHubConnection.send("KickUser", props.RoomInfo.Name, userId);


    }


    let doVote = async (voteCardBlock: any) => {//number
        // console.log(vote);
        // console.dir(vote);
        if (!voteCardBlock?.target?.dataset?.vote) {
            return;
        }

        let voted = await props.MyHubConnection.invoke("Vote", props.RoomInfo.Name, +voteCardBlock.target.dataset.vote);
        if (!voted) {
            return;
        }

        let newState = { ...localState };
        newState.SelectedVoteCard = +voteCardBlock.target.dataset.vote;
        setLocalState(newState);
    }


    let renderVotePlaceIfNeed = () => {

        //TODO UNCOMMENT
        // if (localState.RoomStatus !== RoomSatus.AllCanVote) {
        //     return <div></div>
        // }
        let voteArr = [1, 2, 3, 5, 7, 10, 13, 15, 18, 20, 25, 30, 35, 40, 50];

        return <div onClick={(e) => doVote(e)} className="planing-cards-container">
            {voteArr.map(x => <OneVoteCard key={x} Num={x} NeedSelect={localState.SelectedVoteCard === x} />)}
            {/*             
            <div className="one-planing-vote-card" data-vote="1">1</div>
            <div className="one-planing-vote-card" data-vote="2">2</div>
            <div className="one-planing-vote-card" data-vote="3">3</div> */}
        </div>

    }

    let renderVoteResultIfNeed = () => {

        //UNCOMMENT
        if (localState.RoomStatus !== RoomSatus.CloseVote) {
            return <div></div>
        }

        return <div>vote result</div>

    }




    return <div className="container">
        <div className="padding-10-top"></div>
        <div>Room {props.RoomInfo.Name}</div>
        <div className="row">
            {/* <div className="persent-100-width"> */}
            <div className="planit-room-left-part col-12 col-md-9">
                <div>
                    <button>Начать голосование</button>
                    <button>Закончить голосование</button>
                    {renderVotePlaceIfNeed()}
                    {renderVoteResultIfNeed()}
                </div>
                <div>оценки</div>
                <div>описание задач?</div>
            </div>
            <div className="planit-room-right-part col-12 col-md-3">
                <div>люди</div>
                {localState.UsersList.map(x =>
                    <UserInList key={x.Id}
                        User={x}
                        TryToRemoveUserFromRoom={tryToRemoveUserFromRoom}
                        RenderForAdmin={CurrentUserIsAdmin(localState, props.UserInfo.UserId)} />
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