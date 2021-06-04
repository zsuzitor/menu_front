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
import { AlertData, AlertTypeEnum } from '../../_ComponentsLink/Models/AlertData';


class RoomProps {
    // InRoom: boolean;
    UserInfo: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;

    MyHubConnection: signalR.HubConnection;
    HubConnected: boolean;

    RoomNameChanged: (name: string) => void;
    ChangeUserName: ((newName: string) => void);
}

class RoomState {
    UsersList: UserInRoom[];
    // CurrentVote?: number;
    // RoomStatus: RoomSatus;
    VoteInfo: VoteInfo;
    // SelectedVoteCard: number;

    constructor() {
        this.UsersList = [];
        // this.CurrentVote = null;
        // this.SelectedVoteCard = -1;
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

    // useEffect(() => {
    //     console.log("use_1");
    // }, [1]);


    //эффект для доступа по прямой ссылке
    //
    useEffect(() => {
        if (!props.RoomInfo.Name) {
            let pathNameUrlSplit = document.location.pathname.split('/');
            if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[3]) {
                props.RoomNameChanged(pathNameUrlSplit[3]);
            }
            else {
                //todo тут можно ошибку какую нибудь бахнуть, типо вход не удался
                window.location.href = "/planing-poker";
            }
        }
        // else {
        //     if (!props.RoomInfo.InRoom) {
        //         props.MyHubConnection.send("EnterInRoom", props.RoomInfo.Name, props.RoomInfo.Password, props.UserInfo.UserName);

        //     }
        // }
    }, [props.RoomInfo.Name]);

    useEffect(() => {
        if (props.HubConnected && props.RoomInfo.Name && !props.RoomInfo.InRoom) {
            props.MyHubConnection.send("EnterInRoom", props.RoomInfo.Name, props.RoomInfo.Password, props.UserInfo.UserName);
        }
    }, [props.HubConnected]);

    // console.log("render Room");

    // console.log(props.RoomInfo.Name);


    // if (!props.UserInfo.UserName) {
    //     props.ChangeUserName("enter_your_name");//todo хотя бы math random сюда закинуть?
    //     return <div></div>
    // }

    // if (!props.RoomInfo.InRoom) {
    //     return <div></div>
    //     //означает что мы пришли по прямой ссылке, не через форму входа с index page 
    //     //и при этом комната еще не загружена\мы не вошли

    //     // if (!props.RoomInfo.Name) {
    //     //     //имя комнаты пустое. либо это первый рендер либо имя комнаты нет вообще
    //     //     return <div></div>
    //     // }

    //     //это уже не первый рендер тк имя комнаты спаршено из урла и не пустое, означает что хаб подключен
    //     //но мы еще не вошли у нее
    //     // props.MyHubConnection.send("EnterInRoom", props.RoomInfo.Name, props.RoomInfo.Password, props.Username);
    // }





    let initState = new RoomState();
    const [localState, setLocalState] = useState(initState);
    //НЕ заносить в общий объект, перестает работать, начинает сбрасываться при ререндере
    const [roomStatusState, setRoomStatusState] = useState(RoomSatus.None);
    const [selectedVoteCard, setSelectedVoteCard] = useState(-1);
    const [hideVoteState, setHideVoteState] = useState(false);
    const [userNameLocalState, changeUserNameLocalState] = useState(props.UserInfo.UserName);

    // const [roomIsGoodState, setRoomIsGoodState] = useState(false);

    // console.log("room");
    // console.log(localState);

    useEffect(() => {
        if (!props.RoomInfo.InRoom) {
            return;
        }
        //мы проставили все необходимые данные, подключились к хабу и готовы работать

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

    }, [props.RoomInfo.InRoom]);




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



        props.MyHubConnection.on("UserNameChanged", function (userId, newUserName) {
            if (!userId) {
                return;
            }

            let newState = { ...localState };
            let userIndex = newState.UsersList.findIndex(x => x.Id === userId);
            if (userIndex < 0) {
                return;
            }

            newState.UsersList[userIndex].Name = newUserName;
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


            newState.UsersList[userIndex].HasVote = true;

            if (!isNaN(vote)) {
                newState.UsersList[userIndex].Vote = vote;
            }
            // else{
            // }
            setLocalState(newState);
        });

        props.MyHubConnection.on("VoteStart", function () {


            let newState = { ...localState };
            // newState.RoomStatus = RoomSatus.AllCanVote;
            // newState.SelectedVoteCard = -1;
            setSelectedVoteCard(-1);
            newState.UsersList.forEach(x => {
                x.Vote = null;
                x.HasVote = false;
            });
            newState.VoteInfo = new VoteInfo();

            setLocalState(newState);
            setRoomStatusState(RoomSatus.AllCanVote);
        });


        props.MyHubConnection.on("VoteEnd", function (data: IEndVoteInfoReturn) {

            let newState = { ...localState };
            // newState.RoomStatus = RoomSatus.CloseVote;
            // newState.SelectedVoteCard = -1;
            setSelectedVoteCard(-1);
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
        // newState.SelectedVoteCard = +voteCardBlock.target.dataset.vote;
        setSelectedVoteCard(+voteCardBlock.target.dataset.vote);
        setLocalState(newState);
    }


    let renderVotePlaceIfNeed = () => {

        //TODO UNCOMMENT
        if (roomStatusState !== RoomSatus.AllCanVote) {
            return <div></div>
        }
        let voteArr = [1, 2, 3, 5, 7, 10, 13, 15, 18, 20, 25, 30, 35, 40, 50];

        return <div onClick={(e) => doVote(e)} className="planing-cards-container">
            {voteArr.map(x => <OneVoteCard key={x} Num={x} NeedSelect={selectedVoteCard === x} />)}
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
                <button className="btn btn-primary" onClick={() => tryStartVote()}>Начать голосование</button>
                <button className="btn btn-primary" onClick={() => tryEndVote()}>Закончить голосование</button>
            </div>
        }

        return <div></div>
    }


    let settingsUpUserList = () => {

        let hideVotesSetting = <div></div>
        if (CurrentUserIsAdmin(localState, props.UserInfo.UserId)) {
            hideVotesSetting = <div>
                <div className="padding-10-top"></div>
                <div className="planning-vote-settings">
                    <label>Скрывать оценки</label>
                    {/* className="form-control persent-100-width" */}
                    <input onClick={() => setHideVoteState(!hideVoteState)} type="checkbox"></input>
                </div>
            </div>
        }


        let changeUserName = () => {
            props.MyHubConnection.invoke("UserNameChange", props.RoomInfo.Name, userNameLocalState).then(dt => {
                if (!dt) {
                    let alert = new AlertData();
                    alert.Text = "изменить имя не удалось";
                    alert.Type = AlertTypeEnum.Error;
                    window.G_AddAbsoluteAlertToState(alert);
                }
                else {
                    props.ChangeUserName(userNameLocalState)
                }
            });





        }


        return <div>
            <p>доп настройки</p>
            <input onChange={(e) => changeUserNameLocalState(e.target.value)} value={props.UserInfo.UserName}></input>
            <button onClick={() => changeUserName()}>Изменить имя</button>
            {hideVotesSetting}
        </div>
    };


    if (!props.RoomInfo.InRoom) {
        return <h1>пытаемся войти</h1>
    }

    return <div className="container">
        <div className="padding-10-top"></div>
        <h1>Room {props.RoomInfo.Name}</h1>
        <p>
            при обновлении страницы, вы подключаетесь как новый пользователь(исключение-вы авторизованы в основном приложении(TODO)).
            это означает что все права(в том числе админские) остаются на старом пользователе,
            и в случае наличия только 1 администратора комната становится неадминистрируемой
        </p>
        <div className="row">
            {/* <div className="persent-100-width"> */}
            <div className="planit-room-left-part col-12 col-md-9">
                <div>
                    {roomMainActionButton()}
                    {renderVotePlaceIfNeed()}
                    {renderVoteResultIfNeed()}
                </div>
                {/* <div>оценки</div> */}
                <div>описание задач?</div>
            </div>
            <div className="planit-room-right-part col-12 col-md-3">
                <div>
                    {settingsUpUserList()}

                </div>
                <div className="padding-10-top"></div>
                <div>люди</div>
                {localState.UsersList.map(x =>
                    <UserInList key={x.Id}
                        User={x}
                        TryToRemoveUserFromRoom={tryToRemoveUserFromRoom}
                        RenderForAdmin={CurrentUserIsAdmin(localState, props.UserInfo.UserId)}
                        HideVote={hideVoteState}
                        HasVote={x.HasVote}
                        RoomStatus={roomStatusState}
                        MaxVote={localState.VoteInfo.MaxVote}
                        MinVote={localState.VoteInfo.MinVote}
                    />
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