import React, { useState, useEffect } from 'react';
import { RoomStatus } from '../../Models/Entity/State/RoomInfo';
import cloneDeep from 'lodash/cloneDeep';
import { StoriesHelper } from '../../Models/PlaningPokerHelper';
import { Story } from '../../Models/Entity/State/Story';
import Paggination from '../../../../components/Body/Paggination/Paggination';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import connectToStore, { StoriesSectionProps, StoriesSectionState, ListStoryType } from './StoriesSectionSetup';


require('./StoriesSection.css');



const StoriesSection = (props: StoriesSectionProps) => {

    const initStories = new StoriesSectionState();
    const [storiesState, setStoriesState] = useState(initStories);
    const [listStoryTypeState, setListStoryTypeState] = useState(ListStoryType.Actual);
    const [showNewStoryForm, setShowNewStoryForm] = useState(false);
    const [storiesPageNumber, setstoriesPageNumber] = useState(1);
    let storyHelper = new StoriesHelper();
    let currentStory = storyHelper.GetStoryById(props.Stories, props.CurrentStoryId);
    const [currentStoryNameChange, setCurrentStoryNameChange] = useState(currentStory?.Name || '');
    const [currentStoryDescriptionChange, setCurrentStoryDescriptionChange] = useState(currentStory?.Description || '');



    const countStoriesOnPage = 15;


    const storiesHelper = new StoriesHelper();

    useEffect(() => {
        // ResetCurrentStoryById();
        setCurrentStoryNameChange(currentStory?.Name || '');
        setCurrentStoryDescriptionChange(currentStory?.Description || '');
        // if (currentStory) {
        // }


    }, [props.CurrentStoryId]);

    useEffect(() => {
        setCurrentStoryNameChange(currentStory?.Name || '');

    }, [currentStory?.Name]);

    useEffect(() => {
        setCurrentStoryDescriptionChange(currentStory?.Description || '');

    }, [currentStory?.Description]);


    useEffect(() => {
    }, []);



    useEffect(() => {
        props.LoadOldStories(props.RoomName, props.UserInfo.UserConnectionId, storiesPageNumber, countStoriesOnPage);

    }, [props.RoomName, props.UserInfo.UserConnectionId, storiesPageNumber, countStoriesOnPage]);


    const cancelChangeCurrentStory = () => {
        setCurrentStoryNameChange(currentStory?.Name || '');
        setCurrentStoryDescriptionChange(currentStory?.Description || '');
    }


    const changeCurrentStory = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.ChangeCurrentStory,
            props.RoomName, props.CurrentStoryId,
            currentStoryNameChange,
            currentStoryDescriptionChange);
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

    const deleteStory = (id: string) => {
        if (!confirm('Удалить историю?')) {
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.DeleteStory, props.RoomName, id);
    }


    const makeCurrentStory = (id: string) => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.MakeCurrentStory, props.RoomName, id);
    }




    const currentStoryDescriptionRender = () => {
        if (!props.CurrentStoryId) {
            return <></>
        }

        const story = currentStory;
        //storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);

        if (!story) {
            return <></>
        }

        let adminButton = <></>

        if (props.IsAdmin) {
            let adminButtonsWhenHasChange = <></>
            if (currentStoryNameChange !== story.Name
                || currentStoryDescriptionChange !== story.Description) {
                adminButtonsWhenHasChange = <>
                    <div className='stories-action-btn' onClick={() => changeCurrentStory()}
                        title='Изменить'>
                        <img className='persent-100-width-height' src="/images/save-icon.png" />
                    </div>
                    <div className='stories-action-btn' onClick={() => cancelChangeCurrentStory()}
                        title='Отменить изменения'>
                        <img className='persent-100-width-height' src="/images/cancel.png" />
                    </div></>
            }
            adminButton = <div className='stories-current-buttons'>
                {adminButtonsWhenHasChange}
                <div className='stories-action-btn' onClick={() => tryMakeStoryComplete()}
                    title='Отметить как выполненную'>
                    <img className='persent-100-width-height' src="/images/vote4.png" />
                </div>
                <div className='stories-del-but'
                    title='Удалить'
                    onClick={() => deleteStory(story.Id)}>
                    <img className='persent-100-width-height' src="/images/delete-icon.png" />

                </div>
            </div>
        }


        const storyBodyRender = () => {
            if (props.IsAdmin) {
                return <div><input className="persent-100-width form-control"
                    placeholder="Название"
                    value={currentStoryNameChange}
                    type="text" onChange={(e) => {
                        setCurrentStoryNameChange(e.target.value);
                    }}></input>
                    <textarea className="persent-100-width form-control"
                        placeholder="Описание"
                        value={currentStoryDescriptionChange}
                        onChange={(e) => {
                            setCurrentStoryDescriptionChange(e.target.value);
                        }}
                    >
                    </textarea>
                </div>
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
                {/* <p>Id: {story.Id}</p> */}
                {storyBodyRender()}
            </div>
            {adminButton}
        </div>

    }


    const AddNewStory = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.AddNewStory, props.RoomName,
            storiesState.NameForAdd, storiesState.DescriptionForAdd);
        setStoriesState(prevState => {
            // let newState = { ...prevState };
            let newState = cloneDeep(prevState);
            newState.DescriptionForAdd = '';
            newState.NameForAdd = '';
            return newState;
        });
    }




    const storiesListRender = () => {
        let adminButtonInList = (id: string) => {
            return <></>
        };
        let addNewForm = <></>
        if (props.IsAdmin && listStoryTypeState === ListStoryType.Actual) {
            adminButtonInList = (id: string) => {
                return <div className='stories-but-block'>
                    <div className='stories-action-btn' onClick={() => makeCurrentStory(id)}
                        title='Сделать текущей'>
                        <img className='persent-100-width-height' src="/images/vote2.png" />
                    </div>
                    <div className='stories-del-but'
                        title='Удалить'
                        onClick={() => deleteStory(id)}>
                        <img className='persent-100-width-height' src="/images/delete-icon.png" />

                    </div>
                </div>
            };

            addNewForm = listStoryTypeState !== ListStoryType.Actual ? <></> : <div>
                <button className='btn btn-b-light'
                    onClick={() => setShowNewStoryForm(!showNewStoryForm)}>Добавить историю</button>
            </div>
        }

        const completedStoryInfo = (story: Story) => {
            if (!story.Completed) {
                return <></>
            }
            <br />
            return <div>
                <span>Оценка: {story.Vote + "   "}</span>
                <span>Дата оценки: {story.Date}</span>
                {/* <br /> */}

            </div>
        }



        let storiesForRender: Story[] = [];

        let paggination = <></>
        if (listStoryTypeState === ListStoryType.Old) {
            if (props.TotalNotActualStoriesCount > countStoriesOnPage) {
                paggination = <Paggination
                    ElementsCount={props.TotalNotActualStoriesCount}
                    PageNumber={storiesPageNumber}
                    ElementsOnPage={countStoriesOnPage}
                    SetPageNumber={setstoriesPageNumber}></Paggination>
            }

            storiesForRender = props.NotActualStories;

        }
        else {
            storiesForRender = props.Stories
                .filter(x => (!x.Completed && listStoryTypeState === ListStoryType.Actual)
                    || (x.Completed && listStoryTypeState === ListStoryType.ThisSession && x.ThisSession)
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

            <div className='room-stories-type-selector'>
                <div className={'type-section' + (listStoryTypeState === ListStoryType.Actual ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(ListStoryType.Actual)}>Актуальные истории</div>
                <div className={'type-section' + (listStoryTypeState === ListStoryType.ThisSession ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(ListStoryType.ThisSession)}>Оцененные истории</div>
                <div className={'type-section' + (listStoryTypeState === ListStoryType.Old ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(ListStoryType.Old)}>Все истории</div>
            </div>
            <div>
                {addNewForm}
            </div>
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
            </div>

        </div>
    }



    return <div>
        <div className='planing-current-story'>

            {currentStoryDescriptionRender()}

        </div>
        <div className="padding-10-top"></div>
        <div>
            {storiesListRender()}
        </div>
    </div>


}




// and that function returns the connected, wrapper component:
export default connectToStore(StoriesSection);

