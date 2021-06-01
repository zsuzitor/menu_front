// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomSatus, PlaningPokerUserInfo, VoteInfo } from './Models/RoomInfo';


import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';
import { IUserInRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn';
import UserInList from './UserInList';
import OneVoteCard from './OneVoteCard';
import { IEndVoteInfoReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/EndVoteInfoReturn';
import { IOneRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/OneRoomReturn';


class RoomProps {
    // InRoom: boolean;
    UserInfo: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;

    MyHubConnection: signalR.HubConnection;
}

class RoomState {
    UsersList: UserInRoom[];
    // CurrentVote?: number;
    // RoomStatus: RoomSatus;
    VoteInfo: VoteInfo;
    SelectedVoteCard: number;

    constructor() {
        this.UsersList = [];
        // this.CurrentVote = null;
        this.SelectedVoteCard = -1;
        this.VoteInfo = new VoteInfo();
        // this.RoomStatus = RoomSatus.None;
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
    //TODO тут выбило какую то ошибку, но после перезагрузки прошло - Cannot flush updates when React is already rendering
    if (!props.RoomInfo.InRoom) {//TODO тут по хорошему надо узнать название румы из урла и попросить ввести пароль, но пока что так
        window.location.href = "/planing-poker";
    }

    let initState = new RoomState();
    const [localState, setLocalState] = useState(initState);
    //НЕ заносить в общий объект, перестает работать, начинает сбрасываться при ререндере
    const [roomStatusState, setRoomStatusState] = useState(RoomSatus.None);
    // console.log("room");
    // console.log(localState);






    useEffect(() => {
        // let loadedUsers = (error: MainErrorObjectBack, data: IUserInRoomReturn[]) => {
        //     if (error) {
        //         //TODO выбить из комнаты?
        //         alert("todo что то пошло не так лучше обновить страницу");
        //         return;
        //     }

        //     if (data) {
        //         let newUsersData = data.map(x => {
        //             let us = new UserInRoom();
        //             us.FillByBackModel(x);
        //             return us;
        //         });
        //         let newState = { ...localState };
        //         //реинициализировать нельзя, почему то отваливается
        //         newState.UsersList.splice(0, newState.UsersList.length);
        //         newState.UsersList.push(...newUsersData);
        //         // newState.UsersList = newUsersData;
        //         setLocalState(newState);
        //     }

        // };
        // // console.log(JSON.stringify(props));
        // window.G_PlaningPokerController.GetUsersIsRoom(props.RoomInfo.Name, props.UserInfo.UserId, loadedUsers);





        let getRoomInfo = (error: MainErrorObjectBack, data: IOneRoomReturn) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                let newUsersData = data.users.map(x => {
                    let us = new UserInRoom();
                    us.FillByBackModel(x);
                    return us;
                });
                let newState = { ...localState };
                //реинициализировать нельзя, почему то отваливается
                newState.UsersList.splice(0, newState.UsersList.length);
                newState.UsersList.push(...newUsersData);
                // newState.RoomStatus = data.status;
                // newState.UsersList = newUsersData;
                setLocalState(newState);
                setRoomStatusState(data.status);
            }

        };


        window.G_PlaningPokerController.GetRoomInfo(props.RoomInfo.Name, props.UserInfo.UserId, getRoomInfo);



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
            //         console.log("newuser");
            // console.log(newState);
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

        props.MyHubConnection.on("VoteStart", function () {


            let newState = { ...localState };
            // newState.RoomStatus = RoomSatus.AllCanVote;
            newState.SelectedVoteCard = -1;
            newState.UsersList.forEach(x => {
                x.Vote = null;
            });
            newState.VoteInfo = new VoteInfo();

            setLocalState(newState);
            setRoomStatusState(RoomSatus.AllCanVote);
        });


        props.MyHubConnection.on("VoteEnd", function (data: IEndVoteInfoReturn) {

            let newState = { ...localState };
            // newState.RoomStatus = RoomSatus.CloseVote;
            newState.SelectedVoteCard = -1;
            newState.UsersList.forEach(x => {
                let userFromRes = data.users_info.find(x1 => x1.id === x.Id);
                if (userFromRes) {
                    x.Vote = userFromRes.vote;
                }
            });

            newState.VoteInfo.MaxVote = data.max_vote;
            newState.VoteInfo.MinVote = data.min_vote;
            newState.VoteInfo.AverageVote = data.average_vote;
            setLocalState(newState);
            setRoomStatusState(RoomSatus.CloseVote);
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
        if (roomStatusState !== RoomSatus.AllCanVote) {
            return <div></div>
        }
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
        if (roomStatusState !== RoomSatus.CloseVote) {
            return <div></div>
        }

        return <div>
            <p>vote result</p>
            <p>Max: {localState.VoteInfo.MaxVote}</p>
            <p>Min: {localState.VoteInfo.MinVote}</p>
            <p>Average: {localState.VoteInfo.AverageVote}</p>

        </div>

    }

    let tryStartVote = () => {
        props.MyHubConnection.send("StartVote", props.RoomInfo.Name);


    }

    let tryEndVote = () => {
        props.MyHubConnection.send("EndVote", props.RoomInfo.Name);


    }


    let roomMainActionButton = () => {
        let isAdmin = CurrentUserIsAdmin(localState, props.UserInfo.UserId);
        if (isAdmin) {
            return <div>
                <button onClick={() => tryStartVote()}>Начать голосование</button>
                <button onClick={() => tryEndVote()}>Закончить голосование</button>
            </div>
        }

        return <div></div>
    }


    return <div className="container">
        <div className="padding-10-top"></div>
        <div>Room {props.RoomInfo.Name}</div>
        <div className="row">
            {/* <div className="persent-100-width"> */}
            <div className="planit-room-left-part col-12 col-md-9">
                <div>
                    {roomMainActionButton()}
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