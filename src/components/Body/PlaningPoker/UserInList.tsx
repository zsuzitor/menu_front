import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { RoomSatus, UserInRoom } from './Models/RoomInfo';


class UserInListProp {
    User: UserInRoom;
    TryToRemoveUserFromRoom: (userId: string) => void;
    RenderForAdmin: boolean;
    HideVote: boolean;
    HasVote: boolean;
    RoomStatus: RoomSatus;
    MinVote: number;
    MaxVote: number;
}


const UserInList = (props: UserInListProp) => {

    let delButton = <div></div>
    if (props.RenderForAdmin) {
        delButton = <div>
            <button onClick={() => props.TryToRemoveUserFromRoom(props.User.Id)}>Выгнать</button>

        </div>
    }

    let vote = "отсутствует";
    if (props.User.Vote && !props.HideVote) {
        vote = props.User.Vote + "";
    }
    else if (props.HasVote) {

        vote = "скрыта";
    }


    let classColorize = "";
    if (props.RoomStatus === RoomSatus.AllCanVote) {
        //подсвечиваем проголосовавших
        if (props.HasVote) {
            classColorize = " planing-user-voted";
        }
        else {
            classColorize = " planing-user-not-voted";
        }
    }
    else if (props.RoomStatus === RoomSatus.CloseVote) {
        //подсвечиваем min max
        if (props.User.Vote) {
            if (props.MinVote === props.User.Vote) {
                classColorize = " planing-user-voted-min";
            }
            else if (props.MaxVote === props.User.Vote) {
                classColorize = " planing-user-voted-max";
            }
        }

    }

    props.HasVote

    return <div>
        <div className={"planing-user" + classColorize}>
            <p>{props.User.Name}</p>
            {/* <p>{props.User.Id}</p> */}
            <p>оценка: {vote}</p>
            {delButton}
            {/* <hr /> */}
        </div>
        <div className="padding-10-top"></div>
    </div>


}




export default UserInList;
