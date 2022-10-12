// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomStatus, PlaningPokerUserInfo, VoteInfo, Story, StoriesHelper } from '../../../../Models/Models/PlaningPoker/RoomInfo';


import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { IUserInRoomReturn } from '../../../../Models/BackModel/PlaningPoker/UserInRoomReturn';
import UserInList from '../UserInList/UserInList';
import OneVoteCard from '../OneVoteCard/OneVoteCard';
import { IEndVoteInfoReturn } from '../../../../Models/BackModel/PlaningPoker/EndVoteInfoReturn';
// import { IOneRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/OneRoomReturn';
import { AlertData, AlertTypeEnum } from '../../../../Models/Models/AlertData';
import { IStoryReturn } from '../../../../Models/BackModel/PlaningPoker/StoryReturn';
import StoriesSection from '../StoriesSection/StoriesSection';
import { IRoomInfoReturn } from '../../../../Models/BackModel/PlaningPoker/RoomInfoReturn';
import cloneDeep from 'lodash/cloneDeep';
import RoomTimer from '../RoomTimer/RoomTimer';
import { IRoomWasSavedUpdateReturn } from '../../../../Models/BackModel/PlaningPoker/RoomWasSavedUpdateReturn';
import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';



require('./Room.css');



interface RoomOwnProps {
    MyHubConnection: signalR.HubConnection;
    HubConnected: boolean;
    UsersList: UserInRoom[];
    VoteInfo: VoteInfo;
    TotalNotActualStoriesCount: number;

}


interface RoomStateToProps {
    
    UserInfo: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;

}

interface RoomDispatchToProps {
    
    RoomNameChanged: (name: string) => void;
    ChangeUserName: ((newName: string) => void);
    ClearUserId: () => void;
}

interface RoomProps extends RoomStateToProps, RoomOwnProps, RoomDispatchToProps {

}




class RoomState {
    DieRoomTime: Date;

    constructor() {
        this.DieRoomTime = null;

    }

}



class StoriesInfo {
    Stories: Story[];

    CurrentStoryId: string;
    CurrentStoryNameChange: string;
    CurrentStoryDescriptionChange: string;


    constructor() {
        this.Stories = [];
        this.CurrentStoryId = "";
        this.CurrentStoryNameChange = "";
        this.CurrentStoryDescriptionChange = "";
    }
}


//TODO а так можно? не будут ли они затирать в теории методы с других компонентов с такими же названиями, может их переименовать более сложно?
const CurrentUserIsAdmin = (users: UserInRoom[], userId: string): boolean => {
    let user = GetUserById(users, userId);
    if (user && user.IsAdmin()) {
        return true;
    }

    return false;
}



const CurrentUserCanVote = (users: UserInRoom[], userId: string): boolean => {
    let user = GetUserById(users, userId);
    if (user && user.CanVote()) {
        return true;
    }

    return false;
}

const GetUserIndexById = (users: UserInRoom[], userId: string): number => {
    if (!users || !userId) {
        return -1;
    }

    return users.findIndex(x => x.Id === userId);
}

const GetUserById = (users: UserInRoom[], userId: string): UserInRoom => {
    let index = GetUserIndexById(users, userId);
    if (index < 0 || index >= users.length) {
        return null;
    }

    return users[index];
}






//подписки сигналр захватывают пропсы непонятно как, раньше это работало, но предположительно после введения deepClone
//все вообще отвалилось. 6.30.2021, вот так получилось пофиксить, замена обработчика подписки на => не помогала
let __planing_room_props_ref__: RoomProps = null;

const Room = (props: RoomProps) => {
    __planing_room_props_ref__ = props;
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

    }, [props.RoomInfo.Name]);

    useEffect(() => {
        if (props.HubConnected) {
            if (props.RoomInfo.Name && !props.RoomInfo.InRoom) {
                props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.EnterInRoom, props.RoomInfo.Name, props.RoomInfo.Password, props.UserInfo.UserName);
            }

            setUserNameLocalState(props.UserInfo.UserName);
        }


    }, [props.HubConnected]);







    //#state
    let initState = new RoomState();
    const [localState, setLocalState] = useState(initState);
    const [roomStatusState, setRoomStatusState] = useState(RoomStatus.None);
    const [selectedVoteCard, setSelectedVoteCard] = useState("-1");
    const [hideVoteState, setHideVoteState] = useState(false);
    const [userNameLocalState, setUserNameLocalState] = useState(props.UserInfo.UserName);//для редактирования
    const initStories = new StoriesInfo();
    const [storiesState, setStoriesState] = useState(initStories);


    const storiesHelper = new StoriesHelper();


    const currentUserIsAdmin = CurrentUserIsAdmin(props.UsersList, props.UserInfo.UserId);


    useEffect(() => {
        if (!props.RoomInfo.InRoom) {
            return;
        }
        //мы проставили все необходимые данные, подключились к хабу и готовы работать

        let getRoomInfo = (error: MainErrorObjectBack, data: IRoomInfoReturn) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                // console.log(data);
                let newUsersData = data.room.users.map(x => {

                    let us = new UserInRoom();
                    us.FillByBackModel(x);
                    return us;
                });

                setRoomStatusState(prevState => {
                    // let newState = { ...prevState };
                    return data.room.status;
                    // return newState;
                });

                setLocalState(prevState => {
                    // let newState = { ...prevState };
                    let newState = cloneDeep(prevState);
                    newState.UsersList.splice(0, newState.UsersList.length);
                    newState.UsersList.push(...newUsersData);
                    newState.DieRoomTime = new Date(data.room.die_date);
                    newState.TotalNotActualStoriesCount = data.room.total_stories_count;

                    fillVoteInfo(newState, data.end_vote_info);
                    newState.UsersList.forEach(us => {
                        if (us.Id === props.UserInfo.UserId) {
                            if (us.Vote) {
                                setSelectedVoteCard(us.Vote);
                            }
                        }
                    });


                    return newState;
                });


                setStoriesState(prevState => {
                    // let newState = { ...prevState };
                    let newStoriesState = cloneDeep(prevState);
                    newStoriesState.CurrentStoryId = data.room.current_story_id;
                    newStoriesState.Stories = data.room.actual_stories.map(x => {
                        let st = new Story();
                        st.FillByBackModel(x);
                        return st;
                    });
                    return newStoriesState;
                });

            }
        };


        window.G_PlaningPokerController.GetRoomInfo(props.RoomInfo.Name, props.UserInfo.UserConnectionId, getRoomInfo);

    }, [props.RoomInfo.InRoom]);


    useEffect(() => {
        if (props.UserInfo.UserName === "enter_your_name") {
            return;
        }

        if (!props.HubConnected) {
            return;
        }

        props.MyHubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.UserNameChange
            , props.RoomInfo.Name, userNameLocalState).then(dt => {
                if (!dt) {
                    let alertFactory = new AlertData();
                    let alert = alertFactory.GetDefaultError("изменить имя не удалось");
                    window.G_AddAbsoluteAlertToState(alert);
                    return;
                }

            });

    }, [props.UserInfo.UserName]);



    useEffect(() => {


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.NewUserInRoom, function (data) {
            if (!data) {
                return;
            }


            let dataTyped = data as IUserInRoomReturn;
            let us = new UserInRoom();
            us.FillByBackModel(dataTyped);


            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                var existUser = GetUserById(newState.UsersList, dataTyped.id);
                if (!existUser) {
                    newState.UsersList.push(us);
                }

                return newState;
            });

        });



        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.UserNameChanged, function (userId, newUserName) {
            if (!userId) {
                return;
            }


            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                let user = GetUserById(newState.UsersList, userId);
                if (!user) {
                    return newState;
                }

                user.Name = newUserName;

                return newState;
            });
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.UserLeaved, function (usersId: string[]) {
            if (!usersId) {
                return;
            }

            usersId.forEach(x => {
                if (x == __planing_room_props_ref__.UserInfo.UserId) {
                    // document.cookie = "planing_poker_roomname=; path=/;";
                    alert("you kicked or leave");//TODO может как то получше сделать, и хорошо бы без перезагрузки\редиректа
                    window.location.href = "/planing-poker";
                    __planing_room_props_ref__.ClearUserId();//todo тут наверное стоит еще что то чистить

                    return;
                }
            });




            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                usersId.forEach(x => {
                    let userIndex = GetUserIndexById(newState.UsersList, x);
                    if (userIndex < 0) {
                        return newState;
                    }

                    newState.UsersList.splice(userIndex, 1);
                });

                return newState;
            });
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.VoteChanged, function (userId, vote) {
            if (!userId) {
                return;
            }


            let allAreVotedChanged = false;
            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                let user = GetUserById(newState.UsersList, userId);
                if (!user) {
                    return newState;
                }

                user.HasVote = true;


                // if (!isNaN(vote)) {
                if (vote !== "?") {
                    user.Vote = vote;
                }

                if (newState.UsersList.every(x => x.HasVote || !x.CanVote()) && !newState.VoteInfo.AllAreVoted) {
                    newState.VoteInfo.AllAreVoted = true;
                    allAreVotedChanged = true;

                    // return;
                }

                return newState;
            });

            if (allAreVotedChanged) {
                let alertFactory = new AlertData();
                let alert = alertFactory.GetDefaultNotify("Все участники проголосовали");
                window.G_AddAbsoluteAlertToState(alert);
            }
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.UserRoleChanged, function (userId, changeType, role) {
            if (!userId) {
                return;
            }



            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                let user = GetUserById(newState.UsersList, userId);
                if (!user) {
                    return newState;
                }

                if (changeType === 1) {
                    //добавлен
                    let index = user.Roles.findIndex(x => x === role);
                    if (index == -1) {
                        user.Roles.push(role);
                    }
                }
                else {
                    //удален
                    let index = user.Roles.findIndex(x => x === role);
                    if (index >= 0) {
                        user.Roles.splice(index, 1);
                    }
                }

                if (!user.CanVote()) {
                    //todo убрать все оценки

                    // GetUserById(localState.UsersList,);
                    // users
                    user.Vote = null;
                    user.HasVote = false;
                    if (userId === __planing_room_props_ref__.UserInfo.UserId) {
                        setSelectedVoteCard("-1");
                    }

                }

                return newState;
            });
        });



        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.VoteStart, function () {


            setSelectedVoteCard(prevState => {
                return "-1";
            });

            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                newState.UsersList.forEach(x => {
                    x.Vote = null;
                    x.HasVote = false;
                });
                newState.VoteInfo = new VoteInfo();

                return newState;
            });

            // setRoomStatusState(RoomSatus.AllCanVote);
            setRoomStatusState(prevState => {
                // let newState = { ...prevState };
                return RoomStatus.AllCanVote;
                // return newState;
            });
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.VoteEnd, function (data: IEndVoteInfoReturn) {

            // fillVoteInfo(null, data);
            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);

                fillVoteInfo(newState, data);

                return newState;
            });



            // setRoomStatusState(RoomSatus.CloseVote);
            setRoomStatusState(prevState => {
                // let newState = { ...prevState };
                return RoomStatus.CloseVote;
                // return newState;
            });
        });



        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.AddedNewStory, function (data: IStoryReturn) {

            setStoriesState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                let newStory = new Story();
                newStory.FillByBackModel(data);
                newState.Stories.push(newStory);
                return newState;
            });
        });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.NewCurrentStory, function (id: string) {
            //изменении в целом объекта текущей истории


            setStoriesState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                newState.CurrentStoryId = id;
                return newState;
            });
        });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.CurrentStoryChanged, function (id: string, newName: string, newDescription: string) {
            //изменение данных текущей истории


            setStoriesState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                let story = storiesHelper.GetStoryById(newState.Stories, id);

                newState.CurrentStoryNameChange = newName;
                newState.CurrentStoryDescriptionChange = newDescription;
                if (story) {
                    newState.CurrentStoryId = id;
                    story.Name = newName;
                    story.Description = newDescription;

                }
                return newState;
            });

        });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.DeletedStory, function (id: string) {
            //изменение данных текущей истории

            setStoriesState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                let storyIndex = storiesHelper.GetStoryIndexById(newState.Stories, id);
                if (storyIndex < 0) {
                    return newState;
                }

                newState.Stories.splice(storyIndex, 1);
                if (newState.CurrentStoryId == id) {
                    newState.CurrentStoryId = "";
                }
                return newState;
            });
        });




        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.MovedStoryToComplete
            , function (oldId, newData: IStoryReturn) {
                if (!newData) {
                    return;
                }

                // let needIncrementTotalCount = false;
                setStoriesState(prevState => {
                    // let newState = { ...prevState };
                    let newState = cloneDeep(prevState);
                    let story = storiesHelper.GetStoryById(newState.Stories, oldId);

                    if (story) {
                        story.Id = newData.id;
                        story.Completed = newData.completed;
                        story.Date = newData.date;
                        story.Vote = newData.vote;
                        story.ThisSession = newData.current_session;
                        if (newState.CurrentStoryId === oldId) {
                            newState.CurrentStoryId = "";
                        }

                        newState.CurrentStoryDescriptionChange = "";
                        newState.CurrentStoryNameChange = "";
                    }

                    return newState;
                });
            });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.RoomWasSaved, function (newData: IRoomWasSavedUpdateReturn) {
            if (!newData?.success) {
                return;
            }

            setStoriesState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                newState.Stories.forEach(st => {
                    let fromBack = newData.stories_mapping.find(x => x.old_id.toUpperCase() === st.Id.toUpperCase());
                    if (fromBack) {
                        st.Id = fromBack.new_id + '';
                    }
                });
                let fromBack = newData.stories_mapping
                    .find(x => x.old_id.toUpperCase() === newState.CurrentStoryId.toUpperCase());
                if (fromBack) {
                    newState.CurrentStoryId = fromBack.new_id + '';
                }

                return newState;
            });

        });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.NewRoomAlive, function (newDieTime: string) {
            if (!newDieTime) {
                return;
            }

            setLocalState(prevState => {
                // let newState = { ...prevState };
                let newState = cloneDeep(prevState);
                newState.DieRoomTime = new Date(newDieTime);
                return newState;
            });

        });



        return function cleanUp() {
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.MovedStoryToComplete);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.DeletedStory);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.CurrentStoryChanged);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.NewCurrentStory);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.AddedNewStory);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.VoteEnd);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.VoteStart);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.UserRoleChanged);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.VoteChanged);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.UserLeaved);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.UserNameChanged);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.NewUserInRoom);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.NewRoomAlive);
            props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.RoomWasSaved);

        };
    }, []);



    const fillVoteInfo = (state: RoomState, data: IEndVoteInfoReturn) => {
        setSelectedVoteCard(prevState => {
            return "-1";
        });

        if (!data) {
            state.VoteInfo = new VoteInfo();
            return;
        }


        state.UsersList.forEach(x => {
            let userFromRes = data.users_info.find(x1 => x1.id === x.Id);
            if (userFromRes) {
                x.Vote = userFromRes.vote;
            }

        });

        state.VoteInfo.FillByBackModel(data);

    }




    if (!props.RoomInfo.InRoom) {
        return <h1>пытаемся войти</h1>
    }





    const tryToRemoveUserFromRoom = (userId: string) => {
        // let isAdmin = CurrentUserIsAdmin(localState.UsersList, props.UserInfo.UserId);
        if (!currentUserIsAdmin) {
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.KickUser, props.RoomInfo.Name, userId);


    }


    const doVote = async (voteCardBlock: any) => {//number
        // console.log(vote);
        // console.dir(vote);
        if (!voteCardBlock?.target?.dataset?.vote) {
            return;
        }

        if (!CurrentUserCanVote(localState.UsersList, props.UserInfo.UserId)) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Вы не можете голосовать");

            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        if (selectedVoteCard === voteCardBlock.target.dataset.vote) {
            return;
        }

        let voted = await props.MyHubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.Vote, props.RoomInfo.Name, voteCardBlock.target.dataset.vote);
        if (!voted) {
            return;
        }

        setSelectedVoteCard(prevState => {
            return voteCardBlock.target.dataset.vote;
        });

    }


    const renderVotePlaceIfNeed = () => {

        if (roomStatusState !== RoomStatus.AllCanVote) {
            return <></>
        }

        let voteArr = [0.5, 1, 2, 3, 5, 7, 10, 13, 15, 18, 20, 25, 30, 35, 40, 50, "tea"];

        return <div onClick={(e) => doVote(e)} className="planing-cards-container">
            {voteArr.map((x, i) => <OneVoteCard key={i} Val={x + ''} NeedSelect={selectedVoteCard == x} />)}
        </div>

    }

    const renderVoteResultIfNeed = () => {

        if (roomStatusState !== RoomStatus.CloseVote) {
            return <></>
        }

        let maximumNames = localState.UsersList.filter(x => x.HasVote
            && x.Vote === (localState.VoteInfo.MaxVote + ''))
            .map(x => x.Name).join(', ');
        let minimumNames = localState.UsersList.filter(x => x.HasVote
            && x.Vote === (localState.VoteInfo.MinVote + ''))
            .map(x => x.Name).join(', ');
        let withoutMarkNames = localState.UsersList.filter(x => x.Vote === 'tea' || !x.HasVote)
            .map(x => x.Name).join(', ');
        //

        // .forEach(x=>{        });
        return <div>
            <div className="padding-10-top"></div>
            <div className="planing-poker-left-one-section">
                <p>Результат голосования</p>
                <p>Максимальная оценка: {localState.VoteInfo.MaxVote} - {maximumNames}</p>
                <p>Минимальная оценка: {localState.VoteInfo.MinVote} - {minimumNames}</p>
                <p>Среднняя оценка: {localState.VoteInfo.AverageVote}</p>
                <p>Не голосовали: {withoutMarkNames}</p>

            </div>
        </div>

    }

    const tryStartVote = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.StartVote, props.RoomInfo.Name);

    }

    const tryEndVote = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.EndVote, props.RoomInfo.Name);
    }


    const makeCurrentStory = (id: string) => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.MakeCurrentStory, props.RoomInfo.Name, id);
    }

    const deleteStory = (id: string) => {
        if (!confirm('Удалить историю?')) {
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.DeleteStory, props.RoomInfo.Name, id);
    }

    const saveRoom = () => {
        props.MyHubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.SaveRoom, props.RoomInfo.Name).then(() => {
            alert("Сохранено")
        });
    }

    const deleteRoom = () => {
        if (!confirm('Удалить комнату?')) {
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.DeleteRoom, props.RoomInfo.Name);
    }


    const aliveRoom = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.AliveRoom, props.RoomInfo.Name);
    }

    const currentStoryDescriptionOnChange = (str: string) => {
        setStoriesState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.CurrentStoryDescriptionChange = str;
            return newState;
        });
    }

    const currentStoryNameOnChange = (str: string) => {
        setStoriesState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.CurrentStoryNameChange = str;
            return newState;
        });
    }



    const roomMainActionButton = () => {
        // let isAdmin = CurrentUserIsAdmin(localState.UsersList, props.UserInfo.UserId);

        let saveBut = <></>
        if (props.UserInfo.LoginnedInMainApp) {
            saveBut = <div className='room-action-btn' onClick={() => saveRoom()}
                title='Сохранить комнату'>
                <img className='persent-100-width-height' src="/images/save-icon.png" />
            </div>
        }

        if (currentUserIsAdmin) {
            return <div className='planit-room-buttons'>
                <div className='room-action-btn' onClick={() => tryStartVote()}
                    title='Начать голосование'>
                    <img className='persent-100-width-height' src="/images/vote2.png" />
                </div>
                <div className='room-action-btn' onClick={() => tryEndVote()}
                    title='Закончить голосование'>
                    <img className='persent-100-width-height' src="/images/vote3.png" />
                </div>
                {saveBut}
                <div className='room-action-btn room-action-btn-del' onClick={() => deleteRoom()}
                    title='Удалить комнату'>
                    <img className='persent-100-width-height' src="/images/delete-icon.png" />
                </div>
            </div>
        }

        return <></>
    }


    const settingsUpUserListRender = () => {
        let showVoteImage = 'eye5.png';
        if (hideVoteState) {
            showVoteImage = 'eye1.png';
        }

        let hideVotesSetting = <></>
        if (currentUserIsAdmin) {
            hideVotesSetting = <div>
                <div className="padding-10-top"></div>
                <div className="planning-vote-settings">
                    <label>Оценки</label>
                    <div className='planing-vote-show-but'
                        title='Показать\скрыть оценки' onClick={() => setHideVoteState(prevState => {
                            return !hideVoteState;
                        })}>
                        <img className='persent-100-width-height' src={"/images/" + showVoteImage} />
                    </div>
                </div>
            </div>
        }


        return <div>
            <p>Пользователь</p>
            <input type="text" className="persent-100-width form-control"
                onChange={(e) => {
                    setUserNameLocalState(prevState => {
                        return e.target.value;
                    });
                }}
                value={userNameLocalState}></input>

            <div className='planing-name-change-but'
                title='Изменить имя'
                onClick={() => props.ChangeUserName(userNameLocalState)}>
                <img className='persent-100-width-height' src="/images/pencil-edit.png" />
            </div>
            {hideVotesSetting}
        </div>
    };


    const updateAllUsers = () => {
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


                setLocalState(prevState => {
                    // let newState = { ...prevState };
                    let newState = cloneDeep(prevState);
                    newState.UsersList.splice(0, newState.UsersList.length);
                    newState.UsersList.push(...newUsersData);

                    return newState;
                });
            }

        };
        // console.log(JSON.stringify(props));
        window.G_PlaningPokerController.GetUsersIsRoom(props.RoomInfo.Name, props.UserInfo.UserConnectionId, loadedUsers);
    };

    const renderNotAuthMessage = () => {
        if (props.UserInfo.LoginnedInMainApp) {
            return <></>
        }

        return <div className="planing-room-not-auth"
            title={"при обновлении страницы, вы подключаетесь как новый пользователь(исключение-вы авторизованы в основном приложении)." +
                "если в комнате все пользвоатели - неавторизованы, комната не будет сохраняться"}>!
        </div>
    }

    return <div className="container">
        {/* что бы кратинки прогрузились и не пришлось из грузить при нажатии кнопки */}
        <img className='visibility-hidden size-0' src="/images/eye5.png" />
        <img className='visibility-hidden size-0' src="/images/eye1.png" />

        <div className="padding-10-top planing-room-header">
            <h1>Комната: {props.RoomInfo.Name}</h1>
            {renderNotAuthMessage()}
        </div>

        <div>
            <RoomTimer
                DieDate={localState.DieRoomTime}
                AliveRoom={aliveRoom} />
        </div>


        <div className="row">
            <div className="planit-room-left-part col-12 col-md-9">
                <div>
                    {roomMainActionButton()}
                    {renderVotePlaceIfNeed()}
                    {renderVoteResultIfNeed()}
                </div>
                {/* <div>оценки</div> */}
                <StoriesSection
                    CurrentStoryId={storiesState.CurrentStoryId}
                    MyHubConnection={props.MyHubConnection}
                    RoomName={props.RoomInfo.Name}
                    Stories={storiesState.Stories}
                    TotalNotActualStoriesCount={localState.TotalNotActualStoriesCount}
                    DeleteStory={deleteStory}
                    MakeCurrentStory={makeCurrentStory}
                    IsAdmin={currentUserIsAdmin}
                    CurrentStoryDescriptionChange={storiesState.CurrentStoryDescriptionChange}
                    CurrentStoryNameChange={storiesState.CurrentStoryNameChange}
                    CurrentStoryDescriptionOnChange={currentStoryDescriptionOnChange}
                    CurrentStoryNameOnChange={currentStoryNameOnChange}
                    RoomStatus={roomStatusState}
                    UserInfo={props.UserInfo}
                />
            </div>
            <div className="planit-room-right-part col-12 col-md-3">
                <div>
                    {settingsUpUserListRender()}

                </div>
                <div className="padding-10-top"></div>
                <div className='people-room-header'>
                    <span>Участники</span>
                    <div className='planing-people-refresh' onClick={() => updateAllUsers()}>
                        <img className='persent-100-width-height' src="/images/refresh.png" />
                    </div>
                </div>
                {localState.UsersList.map(x =>
                    <UserInList key={x.Id}
                        User={x}
                        TryToRemoveUserFromRoom={tryToRemoveUserFromRoom}
                        RenderForAdmin={currentUserIsAdmin}
                        HideVote={hideVoteState}
                        HasVote={x.HasVote}
                        RoomStatus={roomStatusState}
                        MaxVote={localState.VoteInfo.MaxVote}
                        MinVote={localState.VoteInfo.MinVote}
                        MyHubConnection={props.MyHubConnection}
                        RoomName={props.RoomInfo.Name}
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




const mapStateToProps = (state: AppState, ownProps: RoomOwnProps) => {
    let res = {} as RoomStateToProps;
    
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: RoomOwnProps) => {
    let res = {} as RoomDispatchToProps;

    
    return res;
};



const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(Room);

