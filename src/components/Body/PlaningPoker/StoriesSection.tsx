import React, { useState, useEffect, Fragment } from 'react';
import { IStoryReturn } from '../../_ComponentsLink/BackModel/PlaningPoker/StoryReturn';
import { RoomStatus, StoriesHelper, Story } from './Models/RoomInfo';






class StoriesSectionProp {
    Stories: Story[];
    CurrentStoryId: string;

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
    StoriesLoaded: (stories: IStoryReturn[]) => void;
}

class StoriesSectionState {
    // CurrentStoryNameChange: string;
    // CurrentStoryDescriptionChange: string;

    NameForAdd: string;
    DescriptionForAdd: string;
    ShowOnlyCompleted: boolean;

    constructor() {
        this.NameForAdd = "";
        this.DescriptionForAdd = "";
        this.ShowOnlyCompleted = false;
        // this.CurrentStoryNameChange = "";
        // this.CurrentStoryDescriptionChange = "";
    }
}





const StoriesSection = (props: StoriesSectionProp) => {

    const initStories = new StoriesSectionState();
    const [storiesState, setStoriesState] = useState(initStories);

    const storiesHelper = new StoriesHelper();

    useEffect(() => {
        ResetCurrentStoryById();


    }, [props.CurrentStoryId])



    useEffect(() => {


    }, []);





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
        props.MyHubConnection.invoke(G_PlaningPokerController.EndPoints.EndpointsBack.LoadNotActualStories,
            props.RoomName).then(data => {
                var dataTyped = data as IStoryReturn[];
                props.StoriesLoaded(dataTyped);
            });
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



    const completedStoryInfo = (story: Story) => {
        if (!storiesState.ShowOnlyCompleted) {
            return <div></div>
        }

        return <div>
            <p>Дата оценки: {story.Date}</p>
            <p>Оценка: {story.Vote + ""}</p>
        </div>
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
            return <Fragment></Fragment>
        };
        //todo как то норм назвать
        let addNewForm = <div></div>
        let adminButtonNotInList = <div></div>
        if (props.IsAdmin && !storiesState.ShowOnlyCompleted) {
            adminButtonInList = (id: string) => {
                return <div>
                    <button className="btn btn-success" onClick={() => props.MakeCurrentStory(id)}>Сделать текущей</button>
                    <button className="btn btn-danger" onClick={() => props.DeleteStory(id)}>Удалить</button>
                </div>
            };

            adminButtonNotInList = <div>
                <button className="btn btn-success" onClick={() => AddNewStory()}>Добавить</button>
            </div>

            addNewForm = <div>
                <p>Добавить новую:</p>
                <span>Название:</span>
                <input className="persent-100-width form-control"
                    placeholder="Название"
                    value={storiesState.NameForAdd}
                    type="text" onChange={(e) => {

                        setStoriesState(prevState => {
                            let newState = { ...prevState };
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
                            let newState = { ...prevState };
                            newState.DescriptionForAdd = e.target.value;
                            return newState;
                        });
                    }}
                >
                </textarea>
                {adminButtonNotInList}
            </div>
        }





        return <div className="planing-stories-list-main planing-poker-left-one-section">
            <p>Истории:</p>
            <span>Показать выполненные: </span>
            <input onClick={() => {
                setStoriesState(prevState => {
                    let newState = { ...prevState };
                    newState.ShowOnlyCompleted = !newState.ShowOnlyCompleted;
                    return newState;
                });
            }} type="checkbox" defaultChecked={storiesState.ShowOnlyCompleted}></input>
            <div>
                <div className="stories-data-list">
                    {props.Stories.filter(x => x.Completed === storiesState.ShowOnlyCompleted).map(x => <div
                        className={"planing-story-in-list " + (x.Completed ? "completed-story" : "not-completed-story")}
                        key={x.Id}>
                        <p>Id: {x.Id}</p>
                        <p>Название: {x.Name}</p>
                        <p>Описание: {x.Description}</p>
                        {completedStoryInfo(x)}

                        {adminButtonInList(x.Id)}
                        <hr />
                    </div>)}
                </div>
                <div>
                    {storiesState.ShowOnlyCompleted ?
                        <button className="btn btn-primary" onClick={() => loadOldStories()}>Загрузить прошлые</button>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div>
                {addNewForm}

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
