import React, { useState, useEffect, Fragment } from 'react';
import { IStoryReturn } from '../../../../Models/BackModel/PlaningPoker/StoryReturn';
import { PlaningPokerUserInfo, RoomStatus, StoriesHelper, Story } from '../../../../Models/Models/PlaningPoker/RoomInfo';
import cloneDeep from 'lodash/cloneDeep';
import AdditionalWindow from '../../AdditionalWindow/AdditionalWindow';
import Paggination from '../../Paggination/Paggination';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { INotActualStoriesReturn } from '../../../../Models/BackModel/PlaningPoker/RoomInfoReturn';


require('./StoriesSection.css');



class StoriesSectionProp {
    Stories: Story[];
    CurrentStoryId: string;
    TotalNotActualStoriesCount: number;
    UserInfo: PlaningPokerUserInfo;

    // storiesInfo:StoriesInfo;
    MyHubConnection: signalR.HubConnection;
    // HubConnected: boolean;
    // ChangeCurrentStory:;
    MakeCurrentStory: (id: string) => void;
    DeleteStory: (id: string) => void;
    RoomName: string;
    RoomStatus: RoomStatus;
    IsAdmin: boolean;
    // SetClearTmpFuncForStories: (func: () => void) => void;
    CurrentStoryNameChange: string;
    CurrentStoryNameOnChange: (str: string) => void;
    CurrentStoryDescriptionChange: string;
    CurrentStoryDescriptionOnChange: (str: string) => void;
    // StoriesLoaded: (stories: IStoryReturn[]) => void;
}

class StoriesSectionState {
    // CurrentStoryNameChange: string;
    // CurrentStoryDescriptionChange: string;

    NameForAdd: string;
    DescriptionForAdd: string;
    // ShowOnlyCompleted: boolean;
    // NotActualStoriesLoaded: boolean;

    SortByDateAsc: boolean;

    NotActualStories: Story[];


    constructor() {
        this.NameForAdd = "";
        this.DescriptionForAdd = "";
        // this.ShowOnlyCompleted = false;
        // this.NotActualStoriesLoaded = false;
        this.SortByDateAsc = false;
        this.NotActualStories = [];
    }
}





const StoriesSection = (props: StoriesSectionProp) => {

    const initStories = new StoriesSectionState();
    const [storiesState, setStoriesState] = useState(initStories);
    const [listStoryTypeState, setListStoryTypeState] = useState(1);
    const [showNewStoryForm, setShowNewStoryForm] = useState(false);
    const [storiesPageNumber, setstoriesPageNumber] = useState(1);


    const countStoriesOnPage = 3;


    const storiesHelper = new StoriesHelper();

    useEffect(() => {
        ResetCurrentStoryById();


    }, [props.CurrentStoryId])



    useEffect(() => {


    }, []);



    useEffect(() => {
        loadOldStories();

    }, [storiesPageNumber]);





    const cancelChangeCurrentStory = () => {


        let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        props.CurrentStoryDescriptionOnChange(story.Description);
        props.CurrentStoryNameOnChange(story.Name);


    }


    const changeCurrentStory = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.ChangeCurrentStory,
            props.RoomName, props.CurrentStoryId,
            props.CurrentStoryNameChange,
            props.CurrentStoryDescriptionChange);
    }

    const loadOldStories = () => {

        let loadedStories = (error: MainErrorObjectBack, data: INotActualStoriesReturn) => {
            if (error) {
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setStoriesState(prevState => {
                    // let newState = { ...prevState };
                    let newState = cloneDeep(prevState);
                    newState.NotActualStories = data.stories.map(x => {
                        let st = new Story();
                        st.FillByBackModel(x);
                        return st;
                    });
                    return newState;
                });
            }

        };
        // console.log(JSON.stringify(props));
        window.G_PlaningPokerController.GetNotActualStories(props.RoomName, props.UserInfo.UserConnectionId, storiesPageNumber, countStoriesOnPage, loadedStories);



    }


    const ResetCurrentStoryById = () => {
        if (!props.CurrentStoryId) {


            props.CurrentStoryDescriptionOnChange("");
            props.CurrentStoryNameOnChange("");


            return;
        }




        let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        props.CurrentStoryDescriptionOnChange(story.Description);
        props.CurrentStoryNameOnChange(story.Name);

    }


    const tryMakeStoryComplete = () => {
        //если не задан voteInfo как то уведомить что оценки не запишутся
        let save = true;
        if (props.RoomStatus !== RoomStatus.CloseVote) {//todo возможно тут стоит не на статус завязаться а на voteinfo
            save = confirm('Комната не в статусе <закрытого голосования>, История будет сохранена без оценок. Сохранить?')
        }

        if (save) {
            props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.MakeStoryComplete, props.RoomName,
                props.CurrentStoryId);
        }
    }





    const currentStoryDescriptionRender = () => {
        if (!props.CurrentStoryId) {
            return <div></div>
        }

        const story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);

        if (!story) {
            return <div></div>
        }

        let adminButton = <div></div>
        if (props.IsAdmin) {
            adminButton = <div>
                <button className="btn btn-success" onClick={() => changeCurrentStory()}>Изменить</button>
                <button className="btn btn-success" onClick={() => cancelChangeCurrentStory()}>Отменить</button>
                <button className="btn btn-success" onClick={() => tryMakeStoryComplete()}>Отметить как выполненную</button>
            </div>
        }


        const storyBodyRender = () => {
            if (props.IsAdmin) {
                return <div><input className="persent-100-width form-control"
                    placeholder="Название"
                    value={props.CurrentStoryNameChange}
                    type="text" onChange={(e) => {

                        props.CurrentStoryNameOnChange(e.target.value);


                    }}></input>
                    <input className="persent-100-width form-control"
                        placeholder="Описание"
                        value={props.CurrentStoryDescriptionChange}
                        type="text" onChange={(e) => {

                            props.CurrentStoryDescriptionOnChange(e.target.value);


                        }}></input></div>
            }
            else {
                return <div>
                    <p>Название: {story.Name}</p>
                    <p>Описание: {story.Description}</p>
                </div>
            }
        }


        return <div className="planing-current-story-main planing-poker-left-one-section">
            <p>Описание текущей задачи</p>
            <div>
                <p>Id: {story.Id}</p>
                {storyBodyRender()}
            </div>
            {adminButton}
        </div>

    }


    const AddNewStory = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.AddNewStory, props.RoomName,
            storiesState.NameForAdd, storiesState.DescriptionForAdd);
    }




    const storiesListRender = () => {
        let adminButtonInList = (id: string) => {
            return <></>
        };
        let addNewForm = <div></div>
        if (props.IsAdmin && listStoryTypeState === 1) {
            adminButtonInList = (id: string) => {
                return <div>
                    <button className="btn btn-success" onClick={() => props.MakeCurrentStory(id)}>Сделать текущей</button>
                    <button className="btn btn-danger" onClick={() => props.DeleteStory(id)}>Удалить</button>
                </div>
            };

            addNewForm = listStoryTypeState !== 1 ? <></> : <div>
                <button className='btn btn-b-light'
                    onClick={() => setShowNewStoryForm(!showNewStoryForm)}>Добавить историю</button>
            </div>
        }

        const completedStoryInfo = (story: Story) => {
            if (!story.Completed) {
                return <div></div>
            }
            <br />
            return <div>
                <span>Оценка: {story.Vote + "   "}</span>
                <span>Дата оценки: {story.Date}</span>
                {/* <br /> */}

            </div>
        }


        let sortByDateButton = <></>
        // if (listStoryTypeState === 2 || listStoryTypeState === 3) {
        //     sortByDateButton = <button className="btn btn-primary"
        //         onClick={(e) => {
        //             setStoriesState(prevState => {
        //                 let newState = cloneDeep(prevState);
        //                 newState.SortByDateAsc = !newState.SortByDateAsc;
        //                 return newState;
        //             });
        //         }}>Сортировка по дате</button>
        // }

        let storiesForRender: Story[] = [];

        let paggination = <></>
        if (listStoryTypeState === 3) {
            paggination = <Paggination
                ElementsCount={props.TotalNotActualStoriesCount}
                PageNumber={storiesPageNumber}
                ElementsOnPage={countStoriesOnPage}
                SetPageNumber={setstoriesPageNumber}></Paggination>

            storiesForRender = storiesState.NotActualStories;

        }
        else {
            storiesForRender = props.Stories
                .filter(x => (!x.Completed && listStoryTypeState === 1)
                    || (x.Completed && listStoryTypeState === 2 && x.ThisSession)
                    // || (x.Completed && listStoryTypeState === 3 && !x.ThisSession)
                )
                .sort((x1, x2) => {
                    let x1Date = new Date(x1.Date || 0);
                    let x2Date = new Date(x2.Date || 0);
                    if (storiesState.SortByDateAsc) {
                        return (x1Date.valueOf() - x2Date.valueOf());
                    }
                    else {
                        return (x2Date.valueOf() - x1Date.valueOf());
                    }
                });
        }




        return <div className="planing-stories-list-main planing-poker-left-one-section">
            {!showNewStoryForm ? <></> : <AdditionalWindow CloseWindow={() => setShowNewStoryForm(false)}
                IsHeightWindow={false}
                Title='Добавление истории'
                InnerContent={() => <div>
                    {/* <p>Добавить новую:</p> */}
                    <span>Название:</span>
                    <input className="persent-100-width form-control"
                        placeholder="Название"
                        value={storiesState.NameForAdd}
                        type="text" onChange={(e) => {

                            setStoriesState(prevState => {
                                // let newState = { ...prevState };
                                let newState = cloneDeep(prevState);
                                newState.NameForAdd = e.target.value;
                                return newState;
                            });
                        }}></input>
                    <span>Описание:</span>
                    <textarea className="persent-100-width form-control"
                        placeholder="Описание"
                        value={storiesState.DescriptionForAdd}
                        onChange={(e) => {

                            setStoriesState(prevState => {
                                // let newState = { ...prevState };
                                let newState = cloneDeep(prevState);
                                newState.DescriptionForAdd = e.target.value;
                                return newState;
                            });
                        }}
                    >
                    </textarea>
                    <div>
                        <button className="btn btn-success" onClick={() => AddNewStory()}>Добавить</button>
                    </div>
                </div>}></AdditionalWindow>

            }
            {/* <p>Истории:</p> */}
            <div className='room-stories-type-selector'>
                <div className={'type-section' + (listStoryTypeState === 1 ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(1)}>Актуальные истории</div>
                <div className={'type-section' + (listStoryTypeState === 2 ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(2)}>Оцененные истории</div>
                <div className={'type-section' + (listStoryTypeState === 3 ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(3)}>Все истории</div>
            </div>
            {/* <span>Показать выполненные: </span>
            <input onClick={() => {
                setStoriesState(prevState => {
                    // let newState = { ...prevState };
                    let newState = cloneDeep(prevState);
                    newState.ShowOnlyCompleted = !newState.ShowOnlyCompleted;
                    return newState;
                });
            }} type="checkbox" defaultChecked={storiesState.ShowOnlyCompleted}></input> */}
            <div>
                {addNewForm}
            </div>
            {sortByDateButton}
            {paggination}
            <div>
                <div className="stories-data-list">
                    {storiesForRender
                        .map(x =>
                            <div
                                className={"planing-story-in-list " + (x.Completed ? "completed-story" : "not-completed-story")}
                                key={x.Id}>
                                {/* <p>Id: {x.Id}</p> */}
                                <span>Название: {x.Name}</span>
                                <br />
                                <span>Описание: {x.Description}</span>
                                {completedStoryInfo(x)}

                                {adminButtonInList(x.Id)}
                                <hr />
                            </div>)}

                </div>
                {/* <div>
                    {storiesState.ShowOnlyCompleted && !storiesState.NotActualStoriesLoaded ?
                        <button className="btn btn-primary" onClick={() => loadOldStories()}>Загрузить прошлые</button>
                        :
                        <div></div>
                    }
                </div> */}
            </div>

        </div>
    }






    return <div>
        <div>

            {currentStoryDescriptionRender()}

        </div>
        <div className="padding-10-top"></div>
        <div>
            {storiesListRender()}
        </div>
    </div>


}




export default StoriesSection;
