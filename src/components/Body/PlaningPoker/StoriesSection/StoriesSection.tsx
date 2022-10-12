import React, { useState, useEffect, Fragment } from 'react';
import { IStoryReturn } from '../../../../Models/BackModel/PlaningPoker/StoryReturn';
import { PlaningPokerUserInfo, RoomStatus, StoriesHelper, Story } from '../../../../Models/Models/PlaningPoker/RoomInfo';
import cloneDeep from 'lodash/cloneDeep';
import AdditionalWindow from '../../AdditionalWindow/AdditionalWindow';
import Paggination from '../../Paggination/Paggination';
import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';


require('./StoriesSection.css');



interface StoriesSectionOwnProps {
    MyHubConnection: signalR.HubConnection;
    Stories: Story[];
    CurrentStoryId: string;
    TotalNotActualStoriesCount: number;
    CurrentStoryNameChange: string;
    CurrentStoryDescriptionChange: string;
    IsAdmin: boolean;


}


interface StoriesSectionStateToProps {
    UserInfo: PlaningPokerUserInfo;
    RoomName: string;
    RoomStatus: RoomStatus;
    NotActualStories: Story[];

}

interface StoriesSectionDispatchToProps {
    MakeCurrentStory: (id: string) => void;
    DeleteStory: (id: string) => void;
    CurrentStoryNameOnChange: (str: string) => void;
    CurrentStoryDescriptionOnChange: (str: string) => void;
    LoadOldStories: (roomname: string, userConnectionId: string
        , storiesPageNumber: number, countStoriesOnPage: number) => void;
}

interface StoriesSectionProps extends StoriesSectionStateToProps, StoriesSectionOwnProps, StoriesSectionDispatchToProps {

}




class StoriesSectionState {
    NameForAdd: string;
    DescriptionForAdd: string;
    SortByDateAsc: boolean;



    constructor() {
        this.NameForAdd = "";
        this.DescriptionForAdd = "";
        this.SortByDateAsc = false;
    }
}





const StoriesSection = (props: StoriesSectionProps) => {

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
        props.LoadOldStories(props.RoomName, props.UserInfo.UserConnectionId, storiesPageNumber, countStoriesOnPage);

    }, [props.RoomName, props.UserInfo.UserConnectionId, storiesPageNumber, countStoriesOnPage]);





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
            return <></>
        }

        const story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);

        if (!story) {
            return <></>
        }

        let adminButton = <></>
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
        if (props.IsAdmin && listStoryTypeState === 1) {
            adminButtonInList = (id: string) => {
                return <div className='stories-but-block'>
                    <div className='stories-action-btn' onClick={() => props.MakeCurrentStory(id)}
                        title='Сделать текущей'>
                        <img className='persent-100-width-height' src="/images/vote2.png" />
                    </div>
                    <div className='stories-del-but'
                        title='Удалить'
                        onClick={() => props.DeleteStory(id)}>
                        <img className='persent-100-width-height' src="/images/delete-icon.png" />

                    </div>
                </div>
            };

            addNewForm = listStoryTypeState !== 1 ? <></> : <div>
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
        if (listStoryTypeState === 3) {
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
                .filter(x => (!x.Completed && listStoryTypeState === 1)
                    || (x.Completed && listStoryTypeState === 2 && x.ThisSession)
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
                <div className={'type-section' + (listStoryTypeState === 1 ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(1)}>Актуальные истории</div>
                <div className={'type-section' + (listStoryTypeState === 2 ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(2)}>Оцененные истории</div>
                <div className={'type-section' + (listStoryTypeState === 3 ? ' type-section-select' : '')}
                    onClick={() => setListStoryTypeState(3)}>Все истории</div>
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




const mapStateToProps = (state: AppState, ownProps: StoriesSectionOwnProps) => {
    let res = {} as StoriesSectionStateToProps;
    res.RoomName =state.PlaningPokerApp.;
    res.RoomStatus =;
    res.UserInfo =;
    res.NotActualStories = state.PlaningPokerApp.NotActualStories;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: StoriesSectionOwnProps) => {
    let res = {} as StoriesSectionDispatchToProps;
    res.CurrentStoryDescriptionOnChange = ;
    res.CurrentStoryNameOnChange = ;
    res.DeleteStory = ;
    res.MakeCurrentStory =;
    res.LoadOldStories = (roomname: string, userConnectionId: string
        , storiesPageNumber: number, countStoriesOnPage: number) => {
        // console.log(JSON.stringify(props));
        dispatch(window.G_PlaningPokerController.GetNotActualStoriesRedux(roomname, userConnectionId, storiesPageNumber, countStoriesOnPage));

    };
    //     ownProps.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.KickUser, roomname, userId);
    // };
    // res.AddTaskToProject = (newTaskName: string, newTaskCreator: number, newTaskReviwer: number, projectId: number) => {
    //     dispatch(window.G_CodeReviewTaskController.AddTaskToProjectRedux(newTaskName, newTaskCreator, newTaskReviwer, projectId));
    // };

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(StoriesSection);

