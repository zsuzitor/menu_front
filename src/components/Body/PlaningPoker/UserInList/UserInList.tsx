import React, { useState, useEffect } from 'react';
import { RoomStatus, UserInRoom, UserRoles } from '../../../../Models/Models/PlaningPoker/RoomInfo';


require('./UserInList.css');


class UserInListProp {
    User: UserInRoom;
    TryToRemoveUserFromRoom: (userId: string) => void;
    RenderForAdmin: boolean;
    HideVote: boolean;
    HasVote: boolean;
    RoomStatus: RoomStatus;
    MinVote: number;
    MaxVote: number;
    RoomName: string;

    MyHubConnection: signalR.HubConnection;
    // HubConnected: boolean;
}


const UserInList = (props: UserInListProp) => {

    const [selectedEditRole, changeSelectedEditRoleState] = useState("-");



    // useEffect(() => {
    //     if (props.HubConnected) {
    //     }
    // }, [props.HubConnected]);



    const addNewRoleToUser = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.AddNewRoleToUser, props.RoomName, props.User.Id, selectedEditRole);

    }

    const removeRoleUser = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.RemoveRoleUser, props.RoomName, props.User.Id, selectedEditRole);

    }





    let delButton = <div></div>
    let statusChange = <div></div>
    if (props.RenderForAdmin) {
        delButton = <div className='user-list-del-but'
            onClick={() => props.TryToRemoveUserFromRoom(props.User.Id)}>
            {/* <button className="btn btn-danger"
                onClick={() => props.TryToRemoveUserFromRoom(props.User.Id)}>Выгнать</button> */}
            <img className='persent-100-width-height' src="/images/delete-icon.png" />

        </div>

        statusChange = <div>
            <select className="form-control" value={selectedEditRole} onChange={(e) => {

                // changeSelectedEditRoleState(e.target.value)
                changeSelectedEditRoleState(prevState => {
                    return e.target.value;
                });
            }}>
                <option value="-">Не выбрано</option>
                <option value={UserRoles.User}>{UserRoles.User}</option>
                <option value={UserRoles.Admin}>{UserRoles.Admin}</option>
                <option value={UserRoles.Observer}>{UserRoles.Observer}</option>
            </select>
            <div className='user-list-role-but'>
                <div className='user-role-but user-role-but-add'
                    onClick={() => addNewRoleToUser()}>+</div>
                <div className='user-role-but user-role-but-del'
                    onClick={() => removeRoleUser()}>-</div>
            </div>
            {/* <button className="btn btn-success"
                onClick={() => addNewRoleToUser()}>Добавить роль</button>
            <button className="btn btn-danger"
                onClick={() => removeRoleUser()}>Удалить роль</button> */}
        </div>
    }






    let vote = "отсутствует";
    if (props.User.Vote && !props.HideVote) {
        vote = props.User.Vote + "";
    }
    else if (props.HasVote) {

        vote = "скрыта";
    }

    if (!props.User.CanVote()) {
        vote = "без права голоса";
    }


    let classColorize = " planing-user-not-voted";//что бы белый не перебивать
    if (props.RoomStatus === RoomStatus.AllCanVote) {
        //подсвечиваем проголосовавших
        if (props.HasVote || !props.User.CanVote()) {
            classColorize = " planing-user-voted";
        }
        else {
            classColorize = " planing-user-not-voted";
        }
    }
    else if (props.RoomStatus === RoomStatus.CloseVote) {
        //подсвечиваем min max
        if (props.User.Vote && !isNaN(+props.User.Vote)) {
            if (props.MinVote == +props.User.Vote) {
                classColorize = " planing-user-voted-min";
            }
            else if (props.MaxVote == +props.User.Vote) {
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
            <p>Роли: {props.User.Roles.join(',')}</p>
            {statusChange}
        </div>
        <div className="padding-10-top"></div>
    </div>


}




export default UserInList;


