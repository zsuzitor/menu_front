// import * as React from "react";
import React, { useState, useEffect } from 'react';
import { RoomInfo, UserInRoom, RoomStatus, PlaningPokerUserInfo, VoteInfo, Story, StoriesHelper } from './Models/RoomInfo';


import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';
import { IUserInRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/UserInRoomReturn';
import UserInList from './UserInList';
import OneVoteCard from './OneVoteCard';
import { IEndVoteInfoReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/EndVoteInfoReturn';
import { IOneRoomReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/OneRoomReturn';
import { AlertData, AlertTypeEnum } from '../../_ComponentsLink/Models/AlertData';
import { IStoryReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/StoryReturn';
import StoriesSection from './StoriesSection';
import { IRoomInfoReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/RoomInfoReturn';


class RoomProps {
    // InRoom: boolean;
    UserInfo: PlaningPokerUserInfo;
    RoomInfo: RoomInfo;

    MyHubConnection: signalR.HubConnection;
    HubConnected: boolean;

    RoomNameChanged: (name: string) => void;
    ChangeUserName: ((newName: string) => void);
    ClearUserId: () => void;
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



class StoriesInfo {
    Stories: Story[];
    // ClearTmpFuncForStories: () => void;//todo не очень конечно решение

    CurrentStoryId: number;
    // CurrentStoryName: string;
    CurrentStoryNameChange: string;
    // CurrentStoryDescription: string;
    CurrentStoryDescriptionChange: string;

    // NameForAdd: string;
    // DescriptionForAdd: string;

    constructor() {
        this.Stories = [];
        this.CurrentStoryId = -1;
        // this.ClearTmpFuncForStories = null;
        // this.NameForAdd = "";
        // this.DescriptionForAdd = "";
        // this.CurrentStoryName = "";
        // this.CurrentStoryDescription = "";
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
    const [roomStatusState, setRoomStatusState] = useState(RoomStatus.None);
    const [selectedVoteCard, setSelectedVoteCard] = useState(-1);
    const [hideVoteState, setHideVoteState] = useState(false);
    const [userNameLocalState, setUserNameLocalState] = useState(props.UserInfo.UserName);//для редактирования
    const initStories = new StoriesInfo();
    const [storiesState, setStoriesState] = useState(initStories);


    const storiesHelper = new StoriesHelper();


    const currentUserIsAdmin = CurrentUserIsAdmin(localState.UsersList, props.UserInfo.UserId);

    // const [roomIsGoodState, setRoomIsGoodState] = useState(false);

    // console.log("room");
    // console.log(localState);

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
                let newUsersData = data.room.users.map(x => {
                    let us = new UserInRoom();
                    us.FillByBackModel(x);
                    return us;
                });
                // let newState = { ...localState };
                // //реинициализировать нельзя, почему то отваливается
                // newState.UsersList.splice(0, newState.UsersList.length);
                // newState.UsersList.push(...newUsersData);
                // // newState.RoomStatus = data.status;
                // // newState.UsersList = newUsersData;
                // setRoomStatusState(data.room.status);

                // fillVoteInfo(newState, data.end_vote_info);
                // setLocalState(newState);

                setRoomStatusState(prevState => {
                    // let newState = { ...prevState };
                    return data.room.status;
                    // return newState;
                });

                setLocalState(prevState => {
                    let newState = { ...prevState };
                    newState.UsersList.splice(0, newState.UsersList.length);
                    newState.UsersList.push(...newUsersData);
                    // newState.RoomStatus = data.status;
                    // newState.UsersList = newUsersData;


                    fillVoteInfo(newState, data.end_vote_info);

                    return newState;
                });

                // let newStoriesState = { ...storiesState };
                // newStoriesState.CurrentStoryId = data.room.current_story_id;
                // newStoriesState.Stories = data.room.actual_stories.map(x => {
                //     let st = new Story();
                //     st.FillByBackModel(x);
                //     return st;
                // });
                // setStoriesState(newStoriesState);
                setStoriesState(prevState => {
                    let newStoriesState = { ...prevState };
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


        props.MyHubConnection.on("NewUserInRoom", function (data) {
            if (!data) {
                return;
            }


            let dataTyped = data as IUserInRoomReturn;
            let us = new UserInRoom();
            us.FillByBackModel(dataTyped);
            // let newState = { ...localState };
            // newState.UsersList.push(us);
            // setLocalState(newState);

            setLocalState(prevState => {
                let newState = { ...prevState };
                var existUser = GetUserById(newState.UsersList, dataTyped.id);
                if (!existUser) {
                    newState.UsersList.push(us);
                }

                return newState;
            });
            //         console.log("newuser");
            // console.log(newState);
        });



        props.MyHubConnection.on("UserNameChanged", function (userId, newUserName) {
            if (!userId) {
                return;
            }

            // let newState = { ...localState };
            // let user = GetUserById(newState.UsersList, userId);
            // if (!user) {
            //     return;
            // }

            // user.Name = newUserName;
            // setLocalState(newState);

            setLocalState(prevState => {
                let newState = { ...prevState };
                let user = GetUserById(newState.UsersList, userId);
                if (!user) {
                    return newState;
                }

                user.Name = newUserName;

                return newState;
            });
        });


        props.MyHubConnection.on("UserLeaved", function (userId) {
            if (!userId) {
                return;
            }

            if (userId == props.UserInfo.UserId) {
                alert("you kicked or leave");//TODO может как то получше сделать, и хорошо бы без перезагрузки\редиректа
                window.location.href = "/planing-poker";
                props.ClearUserId();

                return;
            }

            // let newState = { ...localState };
            // let userIndex = GetUserIndexById(newState.UsersList, userId);
            // if (userIndex < 0) {
            //     return;
            // }

            // newState.UsersList.splice(userIndex, 1);
            // setLocalState(newState);
            setLocalState(prevState => {
                let newState = { ...prevState };
                let userIndex = GetUserIndexById(newState.UsersList, userId);
                if (userIndex < 0) {
                    return newState;
                }

                newState.UsersList.splice(userIndex, 1);

                return newState;
            });
        });


        props.MyHubConnection.on("VoteChanged", function (userId, vote) {
            if (!userId) {
                return;
            }

            // let newState = { ...localState };
            // let user = GetUserById(newState.UsersList, userId);
            // if (!user) {
            //     return;
            // }

            // user.HasVote = true;

            // if (!isNaN(vote)) {
            //     user.Vote = vote;
            // }
            // // else{
            // // }
            // setLocalState(newState);

            setLocalState(prevState => {
                let newState = { ...prevState };
                let user = GetUserById(newState.UsersList, userId);
                if (!user) {
                    return newState;
                }

                user.HasVote = true;

                if (!isNaN(vote)) {
                    user.Vote = vote;
                }

                return newState;
            });
        });


        props.MyHubConnection.on("UserRoleChanged", function (userId, changeType, role) {
            if (!userId) {
                return;
            }


            // let newState = { ...localState };
            // let user = GetUserById(newState.UsersList, userId);
            // if (!user) {
            //     return;
            // }

            // if (changeType === 1) {
            //     //добавлен
            //     user.Roles.push(role);
            // }
            // else {
            //     //удален
            //     let index = user.Roles.findIndex(x => x === role);
            //     if (index >= 0) {
            //         user.Roles.splice(index, 1);
            //     }
            // }

            // setLocalState(newState);

            setLocalState(prevState => {
                let newState = { ...prevState };
                let user = GetUserById(newState.UsersList, userId);
                if (!user) {
                    return newState;
                }

                if (changeType === 1) {
                    //добавлен
                    user.Roles.push(role);
                }
                else {
                    //удален
                    let index = user.Roles.findIndex(x => x === role);
                    if (index >= 0) {
                        user.Roles.splice(index, 1);
                    }
                }

                return newState;
            });
        });



        props.MyHubConnection.on("VoteStart", function () {


            // let newState = { ...localState };
            // newState.RoomStatus = RoomSatus.AllCanVote;
            // newState.SelectedVoteCard = -1;
            // setSelectedVoteCard(-1);
            setSelectedVoteCard(prevState => {
                return -1;
            });
            // newState.UsersList.forEach(x => {
            //     x.Vote = null;
            //     x.HasVote = false;
            // });
            // newState.VoteInfo = new VoteInfo();

            // setLocalState(newState);

            setLocalState(prevState => {
                let newState = { ...prevState };
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


        props.MyHubConnection.on("VoteEnd", function (data: IEndVoteInfoReturn) {

            // fillVoteInfo(null, data);
            setLocalState(prevState => {
                let newState = { ...prevState };

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



        props.MyHubConnection.on("AddedNewStory", function (data: IStoryReturn) {
            // let newState = { ...storiesState };
            // let newStory = new Story();
            // newStory.FillByBackModel(data);
            // newState.Stories.push(newStory);
            // setStoriesState(newState);

            setStoriesState(prevState => {
                let newState = { ...prevState };
                let newStory = new Story();
                newStory.FillByBackModel(data);
                newState.Stories.push(newStory);
                return newState;
            });
        });

        props.MyHubConnection.on("NewCurrentStory", function (id: number) {
            //изменении в целом объекта текущей истории
            // let newState = { ...storiesState };
            // newState.CurrentStoryId = id;
            // setStoriesState(newState);

            setStoriesState(prevState => {
                let newState = { ...prevState };
                newState.CurrentStoryId = id;
                return newState;
            });
        });

        props.MyHubConnection.on("CurrentStoryChanged", function (id: number, newName: string, newDescription: string) {
            //изменение данных текущей истории
            // let newState = { ...storiesState };
            // let story = storiesHelper.GetStoryById(newState.Stories, id);

            // if (story) {
            //     newState.CurrentStoryId = id;
            //     story.Name = newName;
            //     story.Description = newDescription;
            //     setStoriesState(newState);
            //     if (storiesState.ClearTmpFuncForStories) {
            //         storiesState.ClearTmpFuncForStories();
            //     }
            // }

            setStoriesState(prevState => {
                let newState = { ...prevState };
                let story = storiesHelper.GetStoryById(newState.Stories, id);

                newState.CurrentStoryNameChange = newName;
                newState.CurrentStoryDescriptionChange = newDescription;
                if (story) {
                    newState.CurrentStoryId = id;
                    story.Name = newName;
                    story.Description = newDescription;
                    // if (storiesState.ClearTmpFuncForStories) {
                    //     storiesState.ClearTmpFuncForStories();
                    // }
                }
                return newState;
            });

        });

        props.MyHubConnection.on("DeletedStory", function (id: number) {
            //изменение данных текущей истории
            // let newState = { ...storiesState };
            // let storyIndex = storiesHelper.GetStoryIndexById(newState.Stories, id);
            // if (storyIndex < 0) {
            //     return;
            // }

            // newState.Stories.splice(storyIndex, 1);
            // if (newState.CurrentStoryId == id) {
            //     newState.CurrentStoryId = -1;
            // }

            // setStoriesState(newState);


            setStoriesState(prevState => {
                let newState = { ...prevState };
                let storyIndex = storiesHelper.GetStoryIndexById(newState.Stories, id);
                if (storyIndex < 0) {
                    return newState;
                }

                newState.Stories.splice(storyIndex, 1);
                if (newState.CurrentStoryId == id) {
                    newState.CurrentStoryId = -1;
                }
                return newState;
            });
        });




        props.MyHubConnection.on("MovedStoryToComplete", function (id: number) {

            setStoriesState(prevState => {
                let newState = { ...prevState };
                let story = storiesHelper.GetStoryById(newState.Stories, id);


                if (story) {
                    story.Completed = true;
                    if (newState.CurrentStoryId === id) {
                        newState.CurrentStoryId = -1;
                    }

                    newState.CurrentStoryDescriptionChange = "";
                    newState.CurrentStoryNameChange = "";
                }
                return newState;
            });

        });



        return function cleanUp() {
            props.MyHubConnection.off("MovedStoryToComplete");
            props.MyHubConnection.off("DeletedStory");
            props.MyHubConnection.off("CurrentStoryChanged");
            props.MyHubConnection.off("NewCurrentStory");
            props.MyHubConnection.off("AddedNewStory");
            props.MyHubConnection.off("VoteEnd");
            props.MyHubConnection.off("VoteStart");
            props.MyHubConnection.off("UserRoleChanged");
            props.MyHubConnection.off("VoteChanged");
            props.MyHubConnection.off("UserLeaved");
            props.MyHubConnection.off("UserNameChanged");
            props.MyHubConnection.off("NewUserInRoom");

        };
    }, []);



    const fillVoteInfo = (state: RoomState, data: IEndVoteInfoReturn) => {
        // let newState = state || { ...localState };
        // setSelectedVoteCard(-1);
        setSelectedVoteCard(prevState => {
            return -1;
        });
        state.UsersList.forEach(x => {
            let userFromRes = data.users_info.find(x1 => x1.id === x.Id);
            if (userFromRes) {
                x.Vote = userFromRes.vote;
            }
        });

        state.VoteInfo.MaxVote = data.max_vote;
        state.VoteInfo.MinVote = data.min_vote;
        state.VoteInfo.AverageVote = data.average_vote;

    }




    if (!props.RoomInfo.InRoom) {
        return <h1>пытаемся войти</h1>
    }





    const tryToRemoveUserFromRoom = (userId: string) => {
        // let isAdmin = CurrentUserIsAdmin(localState.UsersList, props.UserInfo.UserId);
        if (!currentUserIsAdmin) {
            return;
        }

        props.MyHubConnection.send("KickUser", props.RoomInfo.Name, userId);


    }


    const doVote = async (voteCardBlock: any) => {//number
        // console.log(vote);
        // console.dir(vote);
        if (!voteCardBlock?.target?.dataset?.vote) {
            return;
        }

        if (!CurrentUserCanVote(localState.UsersList, props.UserInfo.UserId)) {
            let alert = new AlertData();
            alert.Text = "У обсерверов нет прав голосовать";
            alert.Type = AlertTypeEnum.Error;
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        let voted = await props.MyHubConnection.invoke("Vote", props.RoomInfo.Name, +voteCardBlock.target.dataset.vote);
        if (!voted) {
            return;
        }


        // newState.SelectedVoteCard = +voteCardBlock.target.dataset.vote;
        // setSelectedVoteCard(+voteCardBlock.target.dataset.vote);
        setSelectedVoteCard(prevState => {
            return +voteCardBlock.target.dataset.vote;
        });

    }


    const renderVotePlaceIfNeed = () => {

        //TODO UNCOMMENT
        if (roomStatusState !== RoomStatus.AllCanVote) {
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

    const renderVoteResultIfNeed = () => {

        //UNCOMMENT
        if (roomStatusState !== RoomStatus.CloseVote) {
            return <div></div>
        }

        return <div>
            <div className="padding-10-top"></div>
            <div className="planing-poker-left-one-section">
                <p>vote result</p>
                <p>Max: {localState.VoteInfo.MaxVote}</p>
                <p>Min: {localState.VoteInfo.MinVote}</p>
                <p>Average: {localState.VoteInfo.AverageVote}</p>

            </div>
        </div>

    }

    const tryStartVote = () => {
        props.MyHubConnection.send("StartVote", props.RoomInfo.Name);


    }

    const tryEndVote = () => {
        props.MyHubConnection.send("EndVote", props.RoomInfo.Name);


    }






    const makeCurrentStory = (id: number) => {
        props.MyHubConnection.send("MakeCurrentStory",
            props.RoomInfo.Name, id);
    }

    const deleteStory = (id: number) => {
        props.MyHubConnection.send("DeleteStory",
            props.RoomInfo.Name, id);
    }



    // const setClearTmpFuncForStories = (func: () => void) => {
    //     // let newState = { ...storiesState };
    //     // newState.ClearTmpFuncForStories = func;
    //     // setStoriesState(newState);

    //     setStoriesState(prevState => {
    //         let newState = { ...prevState };
    //         newState.ClearTmpFuncForStories = func;
    //         return newState;
    //     });

    // }

    const currentStoryDescriptionOnChange = (str: string) => {
        setStoriesState(prevState => {
            let newState = { ...prevState };
            newState.CurrentStoryDescriptionChange = str;
            return newState;
        });
    }

    const currentStoryNameOnChange = (str: string) => {
        setStoriesState(prevState => {
            let newState = { ...prevState };
            newState.CurrentStoryNameChange = str;
            return newState;
        });
    }





    const roomMainActionButton = () => {
        // let isAdmin = CurrentUserIsAdmin(localState.UsersList, props.UserInfo.UserId);
        if (currentUserIsAdmin) {
            return <div>
                <button className="btn btn-primary" onClick={() => tryStartVote()}>Начать голосование</button>
                <button className="btn btn-primary" onClick={() => tryEndVote()}>Закончить голосование</button>
            </div>
        }

        return <div></div>
    }


    const settingsUpUserListRender = () => {

        let hideVotesSetting = <div></div>
        // if (CurrentUserIsAdmin(localState.UsersList, props.UserInfo.UserId)) {
        if (currentUserIsAdmin) {
            hideVotesSetting = <div>
                <div className="padding-10-top"></div>
                <div className="planning-vote-settings">
                    <label>Скрывать оценки</label>
                    {/* className="form-control persent-100-width" */}
                    <input onClick={() => {
                        // setHideVoteState(!hideVoteState)
                        setHideVoteState(prevState => {
                            return !hideVoteState;
                        });
                    }} type="checkbox"></input>
                </div>
            </div>
        }


        const changeUserName = () => {
            props.MyHubConnection.invoke("UserNameChange", props.RoomInfo.Name, userNameLocalState).then(dt => {
                if (!dt) {
                    let alert = new AlertData();
                    alert.Text = "изменить имя не удалось";
                    alert.Type = AlertTypeEnum.Error;
                    window.G_AddAbsoluteAlertToState(alert);
                    return;
                }

                props.ChangeUserName(userNameLocalState)
            });


        }

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
                    // let newState = { ...localState };
                    // //реинициализировать нельзя, почему то отваливается
                    // newState.UsersList.splice(0, newState.UsersList.length);
                    // newState.UsersList.push(...newUsersData);
                    // // newState.UsersList = newUsersData;
                    // setLocalState(newState);

                    setLocalState(prevState => {
                        let newState = { ...prevState };
                        newState.UsersList.splice(0, newState.UsersList.length);
                        newState.UsersList.push(...newUsersData);

                        return newState;
                    });
                }

            };
            // console.log(JSON.stringify(props));
            window.G_PlaningPokerController.GetUsersIsRoom(props.RoomInfo.Name, props.UserInfo.UserConnectionId, loadedUsers);
        };


        return <div>
            <p>доп настройки</p>
            <input type="text" className="persent-100-width form-control"
                onChange={(e) => {
                    // setUserNameLocalState(e.target.value)
                    setUserNameLocalState(prevState => {
                        return e.target.value;
                    });
                }}
                value={userNameLocalState}></input>
            <button className="btn btn-primary"
                onClick={() => changeUserName()}>Изменить имя</button>
            <button className="btn btn-primary"
                onClick={() => updateAllUsers()}>Обновить список пользователей</button>
            {hideVotesSetting}
        </div>
    };








    return <div className="container">
        <div className="padding-10-top"></div>
        <h1>Room {props.RoomInfo.Name}</h1>
        <p>
            при обновлении страницы, вы подключаетесь как новый пользователь(исключение-вы авторизованы в основном приложении(TODO)).
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
                <StoriesSection
                    CurrentStoryId={storiesState.CurrentStoryId}
                    MyHubConnection={props.MyHubConnection}
                    RoomName={props.RoomInfo.Name}
                    Stories={storiesState.Stories}
                    DeleteStory={deleteStory}
                    MakeCurrentStory={makeCurrentStory}
                    IsAdmin={currentUserIsAdmin}
                    CurrentStoryDescriptionChange={storiesState.CurrentStoryDescriptionChange}
                    CurrentStoryNameChange={storiesState.CurrentStoryNameChange}
                    CurrentStoryDescriptionOnChange={currentStoryDescriptionOnChange}
                    CurrentStoryNameOnChange={currentStoryNameOnChange}
                    RoomStatus={roomStatusState}
                />
            </div>
            <div className="planit-room-right-part col-12 col-md-3">
                <div>
                    {settingsUpUserListRender()}

                </div>
                <div className="padding-10-top"></div>
                <div>люди</div>
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




export default Room;