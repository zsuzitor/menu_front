// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomStatus, PlaningPokerUserInfo, VoteInfo, Story } from '../../../../Models/Models/PlaningPoker/RoomInfo';


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
import { IRoomWasSavedUpdateReturn, IStoryMappingReturn } from '../../../../Models/BackModel/PlaningPoker/RoomWasSavedUpdateReturn';
import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { AddNewStoryActionCreator, AddUserToRoomActionCreator, ChangeUserNameInRoomActionCreator, ClearVoteActionCreator, DeleteStoryActionCreator, MoveStoryToCompleteActionCreator, RemoveUserActionCreator, SetCurrentStoryIdActionCreator, SetRoomNameActionCreator, SetRoomStatusActionCreator, SetRoomUserIdActionCreator, SetRoomUsersActionCreator, SetSelectedCardActionCreator, SetStoriesActionCreator, SetUserNameActionCreator, SetVoteInfoActionCreator, StoryChangeActionCreator, UpdateStoriesIdActionCreator, UserRoleChangedActionCreator, VoteChangedActionCreator } from '../../../../Models/Actions/PlaningPokerApp/Actions';
import _ from 'lodash';
import { PlaningPokerHelper, StoriesHelper } from '../../../../Models/BL/PlaningPokerApp/PlaningPokerHelper';



require('./Room.css');



interface RoomOwnProps {
    MyHubConnection: signalR.HubConnection;
    HubConnected: boolean;

}


interface RoomStateToProps {

    UserInfo: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;
    VoteInfo: VoteInfo;
    UsersList: UserInRoom[];
    TotalNotActualStoriesCount: number;
    RoomStatus: RoomStatus;
    SelectedVoteCard: string;
}

interface RoomDispatchToProps {

    SetRoomName: (name: string) => void;
    SetUserName: ((newName: string) => void);
    SetUserId: (userId: string) => void;
    SetRoomUsers: (users: UserInRoom[]) => void;
    SetVoteInfo: (voteInfo: IEndVoteInfoReturn) => void;
    SetCurrentStoryId: (id: string) => void;
    SetStories: (id: Story[]) => void;
    SetRoomStatus: (status: RoomStatus) => void;
    AddUserToRoom: (data: UserInRoom) => void;

    //какой то пользователь изменил имя, надо прорастить изменения
    ChangeAnotherUserName: (userId: string, newUserName: string) => void;
    RemoveUsers: (usersId: string[]) => void;
    VoteChanged: (userId: string, vote: string) => void;
    UserRoleChanged: (userId: string, changeType: number, role: string) => void;
    SetSelectedCard: (val: string) => void;
    ClearVote: () => void;
    AddNewStory: (story: Story) => void;
    StoryChange: (story: Story) => void;
    DeleteStory: (id: string) => void;
    MoveStoryToComplete: (oldId: string, data: Story) => void;
    UpdateStoriesId: (data: IStoryMappingReturn[]) => void;

}

interface RoomProps extends RoomStateToProps, RoomOwnProps, RoomDispatchToProps {

}




class RoomState {
    DieRoomTime: Date;

    constructor() {
        this.DieRoomTime = null;

    }

}















//подписки сигналр захватывают пропсы непонятно как, раньше это работало, но предположительно после введения deepClone
//все вообще отвалилось. 6.30.2021, вот так получилось пофиксить, замена обработчика подписки на => не помогала
let __planing_room_props_ref__: RoomProps = null;

const Room = (props: RoomProps) => {
    __planing_room_props_ref__ = props;
    //эффект для доступа по прямой ссылке
    //


    //#state
    let initState = new RoomState();
    const [localState, setLocalState] = useState(initState);
    // const [roomStatusState, setRoomStatusState] = useState(RoomStatus.None);
    // const [selectedVoteCard, setSelectedVoteCard] = useState("-1");
    const [hideVoteState, setHideVoteState] = useState(false);
    const [userNameLocalState, setUserNameLocalState] = useState(props.UserInfo.UserName);//для редактирования
    // const initStories = new StoriesInfo();
    // const [storiesState, setStoriesState] = useState(initStories);




    const currentUserIsAdmin = (new PlaningPokerHelper()).CurrentUserIsAdmin(props.UsersList, props.UserInfo.UserId);




    useEffect(() => {
        if (!props.RoomInfo.Name) {
            let pathNameUrlSplit = document.location.pathname.split('/');
            if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[3]) {
                props.SetRoomName(pathNameUrlSplit[3]);
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
                props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.EnterInRoom
                    , props.RoomInfo.Name, props.RoomInfo.Password, props.UserInfo.UserName);
            }

            setUserNameLocalState(props.UserInfo.UserName);
        }


    }, [props.HubConnected]);








    useEffect(() => {
        if (!props.RoomInfo.InRoom) {
            return;
        }
        //мы проставили все необходимые данные, подключились к хабу и готовы работать

        let getRoomInfo = (error: MainErrorObjectBack, data: IRoomInfoReturn) => {
            if (data) {
                // console.log(data);

                setLocalState(prevState => {
                    // let newState = { ...prevState };
                    let newState = cloneDeep(prevState);
                    newState.DieRoomTime = new Date(data.room.die_date);

                    return newState;
                });

            }
        };


        window.G_PlaningPokerController.GetRoomInfoReduxCB(props.RoomInfo.Name, props.UserInfo.UserConnectionId, getRoomInfo);

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

            props.AddUserToRoom(us);

        });



        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.UserNameChanged, function (userId, newUserName) {
            if (!userId) {
                return;
            }

            props.ChangeAnotherUserName(userId, newUserName);

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
                    __planing_room_props_ref__.SetUserId('');//todo тут наверное стоит еще что то чистить

                    return;
                }
            });

            props.RemoveUsers(usersId);
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.VoteChanged, function (userId, vote) {
            if (!userId) {
                return;
            }

            props.VoteChanged(userId, vote);
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.UserRoleChanged
            , function (userId, changeType, role) {
                if (!userId) {
                    return;
                }

                props.UserRoleChanged(userId, changeType, role);


            });



        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.VoteStart, function () {

            props.SetSelectedCard('-1');
            props.ClearVote();
            props.SetRoomStatus(RoomStatus.AllCanVote);
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.VoteEnd, function (data: IEndVoteInfoReturn) {

            props.SetVoteInfo(data);
            props.SetRoomStatus(RoomStatus.CloseVote);
        });



        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.AddedNewStory, function (data: IStoryReturn) {
            let newStory = new Story();
            newStory.FillByBackModel(data);
            props.AddNewStory(newStory);

        });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.NewCurrentStory, function (id: string) {
            //изменении в целом объекта текущей истории

            props.SetCurrentStoryId(id);
        });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.CurrentStoryChanged
            , function (id: string, newName: string, newDescription: string) {
                //изменение данных текущей истории
                let story = new Story();
                story.Id = id;
                story.Name = newName;
                story.Description = newDescription;
                props.StoryChange(story);


            });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.DeletedStory, function (id: string) {
            //изменение данных текущей истории
            props.DeleteStory(id);
        });




        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.MovedStoryToComplete
            , function (oldId, newData: IStoryReturn) {
                if (!newData) {
                    return;
                }

                let st = new Story();
                st.FillByBackModel(newData);

                props.MoveStoryToComplete(oldId, st);

            });

        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.RoomWasSaved, function (newData: IRoomWasSavedUpdateReturn) {
            if (!newData?.success) {
                return;
            }

            props.UpdateStoriesId(newData.stories_mapping);

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
        if (!voteCardBlock?.target?.dataset?.vote) {
            return;
        }

        if (!(new PlaningPokerHelper()).CurrentUserCanVote(props.UsersList, props.UserInfo.UserId)) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Вы не можете голосовать");

            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        if (props.SelectedVoteCard === voteCardBlock.target.dataset.vote) {
            return;
        }

        let voted = await props.MyHubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.Vote, props.RoomInfo.Name, voteCardBlock.target.dataset.vote);
        if (!voted) {
            return;
        }

        props.SetSelectedCard(voteCardBlock.target.dataset.vote);


    }


    const renderVotePlaceIfNeed = () => {

        if (props.RoomStatus !== RoomStatus.AllCanVote) {
            return <></>
        }

        let voteArr = [0.5, 1, 2, 3, 5, 7, 10, 13, 15, 18, 20, 25, 30, 35, 40, 50, "tea"];

        return <div onClick={(e) => doVote(e)} className="planing-cards-container">
            {voteArr.map((x, i) => <OneVoteCard key={i} Val={x + ''} NeedSelect={props.SelectedVoteCard == x} />)}
        </div>

    }

    const renderVoteResultIfNeed = () => {

        if (props.RoomStatus !== RoomStatus.CloseVote) {
            return <></>
        }

        let maximumNames = props.UsersList.filter(x => x.HasVote
            && x.Vote === (props.VoteInfo.MaxVote + ''))
            .map(x => x.Name).join(', ');
        let minimumNames = props.UsersList.filter(x => x.HasVote
            && x.Vote === (props.VoteInfo.MinVote + ''))
            .map(x => x.Name).join(', ');
        let withoutMarkNames = props.UsersList.filter(x => x.Vote === 'tea' || !x.HasVote)
            .map(x => x.Name).join(', ');
        //

        // .forEach(x=>{        });
        return <div>
            <div className="padding-10-top"></div>
            <div className="planing-poker-left-one-section">
                <p>Результат голосования</p>
                <p>Максимальная оценка: {props.VoteInfo.MaxVote} - {maximumNames}</p>
                <p>Минимальная оценка: {props.VoteInfo.MinVote} - {minimumNames}</p>
                <p>Среднняя оценка: {props.VoteInfo.AverageVote}</p>
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

    // const currentStoryDescriptionOnChange = (str: string) => {
    //     setStoriesState(prevState => {
    //         // let newState = { ...prevState };
    //         let newState = cloneDeep(prevState);
    //         newState.CurrentStoryDescriptionChange = str;
    //         return newState;
    //     });
    // }

    // const currentStoryNameOnChange = (str: string) => {
    //     setStoriesState(prevState => {
    //         // let newState = { ...prevState };
    //         let newState = cloneDeep(prevState);
    //         newState.CurrentStoryNameChange = str;
    //         return newState;
    //     });
    // }



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
                onClick={() => props.SetUserName(userNameLocalState)}>
                <img className='persent-100-width-height' src="/images/pencil-edit.png" />
            </div>
            {hideVotesSetting}
        </div>
    };


    const updateAllUsers = () => {

        // console.log(JSON.stringify(props));
        window.G_PlaningPokerController.GetUsersIsRoomRedux(props.RoomInfo.Name, props.UserInfo.UserConnectionId);
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
                    MyHubConnection={props.MyHubConnection}
                    IsAdmin={currentUserIsAdmin}
                    // CurrentStoryDescriptionChange={props.CurrentStoryDescriptionChange}
                    // CurrentStoryNameChange={storiesState.CurrentStoryNameChange}
                    // CurrentStoryDescriptionOnChange={currentStoryDescriptionOnChange}
                    // CurrentStoryNameOnChange={currentStoryNameOnChange}
                    // UserInfo={props.UserInfo}
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
                {props.UsersList.map(x =>
                    <UserInList key={x.Id}
                        User={x}
                        RenderForAdmin={currentUserIsAdmin}
                        HideVote={hideVoteState}
                        HasVote={x.HasVote}
                        MyHubConnection={props.MyHubConnection}
                        CurrentUserIsAdmin={currentUserIsAdmin}
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
    res.UserInfo = state.PlaningPokerApp.User;
    res.RoomInfo = state.PlaningPokerApp.RoomInfo;
    res.VoteInfo = state.PlaningPokerApp.VoteInfo;
    res.UsersList = state.PlaningPokerApp.UsersList;
    res.TotalNotActualStoriesCount = state.PlaningPokerApp.TotalNotActualStoriesCount;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.SelectedVoteCard = state.PlaningPokerApp.SelectedVoteCard;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: RoomOwnProps) => {
    let res = {} as RoomDispatchToProps;
    res.SetUserId = (userId: string) => {
        dispatch(SetRoomUserIdActionCreator(userId));
    };

    res.SetUserName = (username: string) => {
        dispatch(SetUserNameActionCreator(username));
    };

    res.SetRoomName = (roomname: string) => {
        dispatch(SetRoomNameActionCreator(roomname));
    };


    res.SetRoomUsers = (users: UserInRoom[]) => {
        dispatch(SetRoomUsersActionCreator(users));
    };


    res.SetVoteInfo = (voteInfo: IEndVoteInfoReturn) => {
        dispatch(SetVoteInfoActionCreator(voteInfo));
    };

    res.SetCurrentStoryId = (id: string) => {
        dispatch(SetCurrentStoryIdActionCreator(id));
    };


    res.SetStories = (data: Story[]) => {
        dispatch(SetStoriesActionCreator(data));
    };

    res.SetRoomStatus = (status: RoomStatus) => {
        dispatch(SetRoomStatusActionCreator(status));

    }

    res.AddUserToRoom = (data: UserInRoom) => {
        dispatch(AddUserToRoomActionCreator(data));
    };


    res.ChangeAnotherUserName = (userId: string, newUserName: string) => {
        dispatch(ChangeUserNameInRoomActionCreator({ UserId: userId, UserName: newUserName }));
    };

    res.RemoveUsers = (usersId: string[]) => {
        dispatch(RemoveUserActionCreator(usersId));

    };

    res.VoteChanged = (userId: string, vote: string) => {
        dispatch(VoteChangedActionCreator({ UserId: userId, Vote: vote }));

    };

    res.UserRoleChanged = (userId: string, changeType: number, role: string) => {
        dispatch(UserRoleChangedActionCreator({ UserId: userId, ChangeType: changeType, Role: role }));
    }

    res.SetSelectedCard = (val: string) => {
        dispatch(SetSelectedCardActionCreator(val));

    }

    res.ClearVote = () => {
        dispatch(ClearVoteActionCreator());

    }

    res.AddNewStory = (story: Story) => {
        dispatch(AddNewStoryActionCreator(story));
    }

    res.StoryChange = (story: Story) => {
        dispatch(StoryChangeActionCreator(story));
    };

    res.DeleteStory = (id: string) => {
        dispatch(DeleteStoryActionCreator(id));

    }

    res.MoveStoryToComplete = (oldId: string, data: Story) => {
        dispatch(MoveStoryToCompleteActionCreator({ OldId: oldId, Story: data }));

    };

    res.UpdateStoriesId = (data: IStoryMappingReturn[]) => {
        dispatch(UpdateStoriesIdActionCreator(data));

    };


    return res;
};



const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(Room);

