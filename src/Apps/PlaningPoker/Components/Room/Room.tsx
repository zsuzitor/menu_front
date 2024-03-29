// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, RoomStatus } from '../../Models/Entity/State/RoomInfo';


import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import UserInList from '../UserInList/UserInList';
import OneVoteCard from '../OneVoteCard/OneVoteCard';
import { IEndVoteInfoReturn } from '../../Models/BackModels/EndVoteInfoReturn';
// import { IOneRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/OneRoomReturn';
import { AlertData } from '../../../../Models/Entity/AlertData';
import StoriesSection from '../StoriesSection/StoriesSection';
import cloneDeep from 'lodash/cloneDeep';
import RoomTimer from '../RoomTimer/RoomTimer';
import _ from 'lodash';
import { PlaningPokerHelper } from '../../Models/PlaningPokerHelper';
import EditRoom from '../EditRoom/EditRoom';
import { Story } from '../../Models/Entity/State/Story';
import { UserInRoom } from '../../Models/Entity/State/UserInRoom';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import { IRoomWasSavedUpdateReturn } from '../../Models/BackModels/RoomWasSavedUpdateReturn';
import { IStoryReturn } from '../../Models/BackModels/StoryReturn';
import { IUserInRoomReturn } from '../../Models/BackModels/UserInRoomReturn';
import { EndVoteInfo } from '../../Models/Entity/EndVoteInfo';
import connectToStore, { RoomProps } from './RoomSetup';



require('./Room.css');



//подписки сигналр захватывают пропсы непонятно как, раньше это работало, но предположительно после введения deepClone
//все вообще отвалилось. 6.30.2021, вот так получилось пофиксить, замена обработчика подписки на => не помогала
let __planing_room_props_ref__: RoomProps = null;
let __planing_room_forceLeaveFromRoom: () => void;
const Room = (props: RoomProps) => {
    __planing_room_props_ref__ = props;
    //эффект для доступа по прямой ссылке
    //


    //#state
    // const [dieRoomTime, setDieRoomTime] = useState(null);
    const [hideVoteState, setHideVoteState] = useState(false);
    const [userNameLocalState, setUserNameLocalState] = useState(props.UserInfo.UserName);//для редактирования

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

    // useEffect(() => {
    //     setDieRoomTime(props.DieRoomTimeInitial);
    // }, [props.DieRoomTimeInitial]);



    useEffect(() => {
        if (!props.RoomInfo.InRoom) {
            return;
        }
        //мы проставили все необходимые данные, подключились к хабу и готовы работать

        props.GetRoomInfo(props.RoomInfo.Name, props.UserInfo.UserConnectionId);

    }, [props.RoomInfo.InRoom]);


    useEffect(() => {
        setUserNameLocalState(props.UserInfo.UserName);

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
                    forceLeaveFromRoom();
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
            let vtInfo = new EndVoteInfo();
            vtInfo.FillByBackModel(data);
            props.SetVoteInfo(vtInfo);
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

            props.SetInitialRoomDieTime(new Date(newDieTime));
        });


        props.MyHubConnection.on(G_PlaningPokerController.EndPoints.EndpointsFront.RoomCardsChanged, function (newData: string[]) {
            props.SetRoomCards(newData);
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultNotify("Оценки были изменены");
            window.G_AddAbsoluteAlertToState(alert);
        });

        return function cleanUp() {
            try {
                //try catch нужен на случай если произошло закрытие компонента PlaningPokerMain и подключение вообще закрылось
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
                props.MyHubConnection.off(G_PlaningPokerController.EndPoints.EndpointsFront.RoomCardsChanged);
                props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.OnWindowClosedAsync, __planing_room_props_ref__?.RoomInfo?.Name);

            }
            catch {
            }

            props.ClearPokerRoomState();
        };
    }, []);





    const forceLeaveFromRoom = () => {
        // document.cookie = "planing_poker_roomname=; path=/;";
        alert("you kicked or leave");//TODO может как то получше сделать, и хорошо бы без перезагрузки\редиректа
        window.location.href = "/planing-poker";
        // __planing_room_props_ref__.SetUserId('');//todo тут наверное стоит еще что то чистить

    }

    __planing_room_forceLeaveFromRoom = forceLeaveFromRoom;


    if (!props.RoomInfo.InRoom) {
        return <h1>пытаемся войти</h1>
    }


    const changeCurrentUserName = () => {
        if (userNameLocalState === "enter_your_name") {
            return;
        }

        if (!props.HubConnected || !props.RoomInfo.Name) {
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

                props.SetUserName(userNameLocalState)

            });
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

        let voteArr = props.RoomCards;

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

        let notNumberMarks = props.UsersList.filter(x => x.HasVote
            && isNaN(x.Vote as any)).map(x => x.Vote)
            .filter((v, i, a) => a.indexOf(v) === i);
        let withoutMarkNames = props.UsersList.filter(x => !x.HasVote)
            .map(x => x.Name).join(', ');

        const renderOneNonNumberMark = (vote: string) => {
            return <p key={'vote_res' + vote}>Оценка {vote}: {props.UsersList.filter(x => x.HasVote
                && x.Vote === vote)
                .map(x => x.Name).join(', ')}</p>
        }
        return <div>
            <div className="padding-10-top"></div>
            <div className="planing-poker-left-one-section">
                <p>Результат голосования</p>
                <p>Максимальная оценка: {props.VoteInfo.MaxVote} - {maximumNames}</p>
                <p>Минимальная оценка: {props.VoteInfo.MinVote} - {minimumNames}</p>
                <p>Среднняя оценка: {props.VoteInfo.AverageVote}</p>
                {notNumberMarks.map(x => renderOneNonNumberMark(x))}
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

            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultNotify("Сохранено");
            window.G_AddAbsoluteAlertToState(alert);
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


    const roomMainActionButton = () => {
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
                <div className='room-action-btn' onClick={() => props.StartEditRoom()}
                    title='Редактировать комнату'>
                    <img className='persent-100-width-height' src="/images/pencil-edit.png" />
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
        let showVoteTitle = 'Скрыть оценки';
        if (hideVoteState) {
            showVoteImage = 'eye1.png';
            showVoteTitle = 'Показать оценки';
        }

        let hideVotesSetting = <></>
        if (currentUserIsAdmin) {
            hideVotesSetting = <div>
                <div className="padding-10-top"></div>
                <div className="planning-vote-settings">
                    <label>Оценки</label>
                    <div className='planing-vote-show-but'
                        title={showVoteTitle} onClick={() => setHideVoteState(prevState => {
                            return !hideVoteState;
                        })}>
                        <img className='persent-100-width-height' src={"/images/" + showVoteImage} />
                    </div>
                </div>
            </div>
        }


        return <div>
            {/* <p>Пользователь</p> */}
            <div className='planing-name-block'>
                <div className='planing-name-block-input-block'>
                    <input type="text" className="persent-100-width form-control"
                        onChange={(e) => {
                            setUserNameLocalState(prevState => {
                                return e.target.value;
                            });
                        }}
                        value={userNameLocalState}></input>
                </div>
                <div className='planing-name-change-but'
                    title='Изменить имя'
                    onClick={() => changeCurrentUserName()}>
                    <img className='persent-100-width-height' src="/images/pencil-edit.png" />
                </div>
            </div>



            {hideVotesSetting}
        </div>
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

    return <div className='container'>
        {/* что бы кратинки прогрузились и не пришлось из грузить при нажатии кнопки */}
        <img className='visibility-hidden size-0' src='/images/eye5.png' />
        <img className='visibility-hidden size-0' src='/images/eye1.png' />
        {props.EditRoom ? <AdditionalWindow CloseWindow={() => props.EndEditRoom()}
            IsHeightWindow={true}
            Title='Редактирование комнаты'
            InnerContent={() => <EditRoom
                MyHubConnection={props.MyHubConnection}></EditRoom>}></AdditionalWindow> : <></>}

        <div className='planing-room-header planing-poker-left-one-section'>

            <div className='room-top-info'>
                <h1>{props.RoomInfo.Name}</h1>
                <RoomTimer
                    DieDate={props.DieRoomTimeInitial}
                    AliveRoom={aliveRoom}
                    ForceLeaveFromRoom={forceLeaveFromRoom} />
                {roomMainActionButton()}
                {renderNotAuthMessage()}

            </div>
            <div className='room-image'>
                <img className='persent-100-width-height'
                    src={props.RoomInfo.ImagePath || G_EmptyImagePath}
                    alt='Аватар группы' title='Аватар группы' />
            </div>
        </div>




        <div className="row">
            <div className="planit-room-left-part col-12 col-md-9">
                <div>
                    {renderVotePlaceIfNeed()}
                    {renderVoteResultIfNeed()}
                </div>
                {/* <div>оценки</div> */}
                <StoriesSection
                    MyHubConnection={props.MyHubConnection}
                    IsAdmin={currentUserIsAdmin}
                />
            </div>
            <div className="planit-room-right-part col-12 col-md-3">
                <div>
                    {settingsUpUserListRender()}
                </div>
                <div className="padding-10-top"></div>
                <div className='people-room-header'>
                    <span>Участники</span>
                    <div className='planing-people-refresh'
                        title='Обновить список пользователей'
                        onClick={() => props.UpdateAllUsers(props.RoomInfo.Name, props.UserInfo.UserConnectionId)}>
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



// and that function returns the connected, wrapper component:
export default connectToStore(Room);

