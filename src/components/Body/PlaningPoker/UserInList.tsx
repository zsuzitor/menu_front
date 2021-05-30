import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { UserInRoom } from './Models/RoomInfo';


class UserInListProp {
    User: UserInRoom;
}


const UserInList = (props: UserInListProp) => {


    return <div>
        <p>{props.User.Name}</p>
        <p>{props.User.Id}</p>
        <hr/>
    </div>


}




export default UserInList;
