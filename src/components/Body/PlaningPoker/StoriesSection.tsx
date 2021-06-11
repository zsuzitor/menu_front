import React, { useState, useEffect, Fragment } from 'react';
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { StoriesHelper, Story } from './Models/RoomInfo';






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
    IsAdmin: boolean;
    SetClearTmpFuncForStories: (func: () => void) => void;
}

class StoriesSectionState {
    CurrentStoryNameChange: string;
    CurrentStoryDescriptionChange: string;

    NameForAdd: string;
    DescriptionForAdd: string;

    constructor() {
        this.NameForAdd = "";
        this.DescriptionForAdd = "";
        this.CurrentStoryNameChange = "";
        this.CurrentStoryDescriptionChange = "";
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
        props.SetClearTmpFuncForStories(() => {
            ResetCurrentStoryById();
        });

    }, []);





    const cancelChangeCurrentStory = () => {
        let newState = { ...storiesState };
        let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        if (!story) {
            return;
        }

        newState.CurrentStoryDescriptionChange = story.Description;
        newState.CurrentStoryNameChange = story.Name;
        setStoriesState(newState);
    }


    const changeCurrentStory = () => {
        props.MyHubConnection.send("ChangeCurrentStory",
            props.RoomName, props.CurrentStoryId,
            storiesState.CurrentStoryNameChange,
            storiesState.CurrentStoryDescriptionChange);
    }




    const ResetCurrentStoryById = () => {
        if (props.CurrentStoryId < 0) {
            let newState = { ...storiesState };
            newState.CurrentStoryDescriptionChange = "";
            newState.CurrentStoryNameChange = "";
            setStoriesState(newState);

            return;
        }

        let newState = { ...storiesState };
        let story = storiesHelper.GetStoryById(props.Stories, props.CurrentStoryId);
        if (!story) {
            return;
        }

        newState.CurrentStoryDescriptionChange = story.Description;
        newState.CurrentStoryNameChange = story.Name;
        setStoriesState(newState);
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
            </div>
        }

        return <div className="planing-current-story-main">
            <p>описание текущей задачи</p>
            <div>
                <p>{story.Id}</p>
                <input className="persent-100-width form-control"
                    placeholder="Название"
                    value={storiesState.CurrentStoryNameChange}
                    type="text" onChange={(e) => {
                        let newState = { ...storiesState };
                        newState.CurrentStoryNameChange = e.target.value;
                        setStoriesState(newState);
                    }}></input>
                <input className="persent-100-width form-control"
                    placeholder="Описание"
                    value={storiesState.CurrentStoryDescriptionChange}
                    type="text" onChange={(e) => {
                        let newState = { ...storiesState };
                        newState.CurrentStoryDescriptionChange = e.target.value;
                        setStoriesState(newState);
                    }}></input>
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
        }

        return <div className="planing-stories-list-main">
            <p>истории</p>
            <div>
                {props.Stories.map(x => <div key={x.Id}>
                    <p>{x.Id}</p>
                    <p>{x.Name}</p>
                    <p>{x.Description}</p>
                    {adminButtonInList(x.Id)}
                </div>)}
            </div>
            <div>
                <input className="persent-100-width form-control"
                    placeholder="Название"
                    value={storiesState.NameForAdd}
                    type="text" onChange={(e) => {
                        let newState = { ...storiesState };
                        newState.NameForAdd = e.target.value;
                        setStoriesState(newState);
                    }}></input>
                <textarea className="persent-100-width form-control"
                    placeholder="Описание"
                    value={storiesState.DescriptionForAdd}
                    onChange={(e) => {
                        let newState = { ...storiesState };
                        newState.DescriptionForAdd = e.target.value;
                        setStoriesState(newState);
                    }}
                >
                </textarea>
                {adminButtonNotInList}

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
