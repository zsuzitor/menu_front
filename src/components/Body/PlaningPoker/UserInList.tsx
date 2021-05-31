import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { UserInRoom } from './Models/RoomInfo';


class UserInListProp {
    User: UserInRoom;
    TryToRemoveUserFromRoom: (userId: string) => void;
    RenderForAdmin: boolean;
}


const UserInList = (props: UserInListProp) => {

    let delButton = <div></div>
    if (props.RenderForAdmin) {
        delButton = <div>
            <button onClick={() => props.TryToRemoveUserFromRoom(props.User.Id)}>Выгнать</button>

        </div>
    }


    return <div>
        <p>{props.User.Name}</p>
        <p>{props.User.Id}</p>
        <p>оценка: {props.User.Vote ? props.User.Vote : ""}</p>
        {delButton}
        <hr />
    </div>


}




export default UserInList;
