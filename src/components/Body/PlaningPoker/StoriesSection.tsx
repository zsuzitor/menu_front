import React, { useState, useEffect, Fragment } from 'react';
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { RoomStatus, StoriesHelper, Story } from './Models/RoomInfo';






class StoriesSectionProp {
    Stories: Story[];
    CurrentStoryId: number;

    // storiesInfo:StoriesInfo;
    MyHubConnection: signalR.HubConnection;
    // HubConnected: boolean;
    // ChangeCurrentStory:;
    MakeCurrentStory: (id: number) => void;
    DeleteStory: (id: number) => void;
    RoomName: string;
    RoomStatus: RoomStatus;
    IsAdmin: boolean;
    // SetClearTmpFuncForStories: (func: () => void) => void;
    CurrentStoryNameChange: string;
    CurrentStoryNameOnChange: (str: string) => void;
    CurrentStoryDescriptionChange: string;
    CurrentStoryDescriptionOnChange: (str: string) => void;
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
        // props.SetClearTmpFuncForStories(() => {
        //     ResetCurrentStoryById();
        // });

    }, []);





    const cancelChangeCurrentStory = () => {
        // let newState = { ...storiesState };
        // let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        // if (!story) {
        //     return;
        // }

        // newState.CurrentStoryDescriptionChange = story.Description;
        // newState.CurrentStoryNameChange = story.Name;
        // setStoriesState(newState);

        let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        props.CurrentStoryDescriptionOnChange(story.Description);
        props.CurrentStoryNameOnChange(story.Name);

        // setStoriesState(prevState => {
        //     let newState = { ...prevState };
        //     let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        //     if (!story) {
        //         return newState;
        //     }

        //     // newState.CurrentStoryDescriptionChange = story.Description;
        //     // newState.CurrentStoryNameChange = story.Name;
        //     return newState;
        // });
    }


    const changeCurrentStory = () => {
        props.MyHubConnection.send("ChangeCurrentStory",
            props.RoomName, props.CurrentStoryId,
            props.CurrentStoryNameChange,
            props.CurrentStoryDescriptionChange);
    }




    const ResetCurrentStoryById = () => {
        if (props.CurrentStoryId < 0) {
            // let newState = { ...storiesState };
            // newState.CurrentStoryDescriptionChange = "";
            // newState.CurrentStoryNameChange = "";
            // setStoriesState(newState);

            props.CurrentStoryDescriptionOnChange("");
            props.CurrentStoryNameOnChange("");
            // setStoriesState(prevState => {
            //     let newState = { ...prevState };
            //     newState.CurrentStoryDescriptionChange = "";
            //     newState.CurrentStoryNameChange = "";
            //     return newState;
            // });

            return;
        }


        // let newState = { ...storiesState };
        // let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        // if (!story) {
        //     return;
        // }

        // newState.CurrentStoryDescriptionChange = story.Description;
        // newState.CurrentStoryNameChange = story.Name;
        // setStoriesState(newState);

        let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        props.CurrentStoryDescriptionOnChange(story.Description);
        props.CurrentStoryNameOnChange(story.Name);
        // setStoriesState(prevState => {
        //     let newState = { ...prevState };
        //     let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        //     if (!story) {
        //         return newState;
        //     }

        //     newState.CurrentStoryDescriptionChange = story.Description;
        //     newState.CurrentStoryNameChange = story.Name;
        //     return newState;
        // });
    }


    const tryMakeStoryComplete = () => {
        //если не задан voteInfo как то уведомить что оценки не запишутся
        let save = true;
        if (props.RoomStatus !== RoomStatus.CloseVote) {//todo возможно тут стоит не на статус завязаться а на voteinfo
            save = confirm('Комната не в статусе <закрытого голосования>, История будет сохранена без оценок. Сохранить?')
        }

        if (save) {
            props.MyHubConnection.send("MakeStoryComplete", props.RoomName,
                props.CurrentStoryId);
        }
    }




    const currentStoryDescriptionRender = () => {
        if (props.CurrentStoryId < 0) {
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
                        // let newState = { ...storiesState };
                        // newState.CurrentStoryNameChange = e.target.value;
                        // setStoriesState(newState);

                        props.CurrentStoryNameOnChange(e.target.value);
                        // setStoriesState(prevState => {
                        //     let newState = { ...prevState };
                        //     newState.CurrentStoryNameChange = e.target.value;
                        //     return newState;
                        // });

                    }}></input>
                    <input className="persent-100-width form-control"
                        placeholder="Описание"
                        value={props.CurrentStoryDescriptionChange}
                        type="text" onChange={(e) => {
                            // let newState = { ...storiesState };
                            // newState.CurrentStoryDescriptionChange = e.target.value;
                            // setStoriesState(newState);

                            props.CurrentStoryDescriptionOnChange(e.target.value);

                            // setStoriesState(prevState => {
                            //     let newState = { ...prevState };
                            //     newState.CurrentStoryDescriptionChange = e.target.value;
                            //     return newState;
                            // });
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
        props.MyHubConnection.send("AddNewStory", props.RoomName,
            storiesState.NameForAdd, storiesState.DescriptionForAdd);
    }

    const storiesListRender = () => {
        let adminButtonInList = (id: number) => {
            return <Fragment></Fragment>
        };
        //todo как то норм назвать
        let addNewForm = <div></div>
        let adminButtonNotInList = <div></div>
        if (props.IsAdmin) {
            adminButtonInList = (id: number) => {
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
                        // let newState = { ...storiesState };
                        // newState.NameForAdd = e.target.value;
                        // setStoriesState(newState);

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
                        // let newState = { ...storiesState };
                        // newState.DescriptionForAdd = e.target.value;
                        // setStoriesState(newState);

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
            }} type="checkbox"></input>
            <div>
                {props.Stories.filter(x => x.Completed === storiesState.ShowOnlyCompleted).map(x => <div key={x.Id}>
                    <p>Id: {x.Id}</p>
                    <p>Название: {x.Name}</p>
                    <p>Описание: {x.Description}</p>
                    {adminButtonInList(x.Id)}
                    <hr />
                </div>)}
                <div>
                    <button onClick={() => alert("todo")}>Загрузить прошлые</button>
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
        <div>
            {storiesListRender()}
        </div>
    </div>


}




export default StoriesSection;
