import React, { useState, useEffect } from 'react';
import { PlaningPokerUserInfo, RoomStatus, UserInRoom, UserRoles } from '../../../../Models/Models/PlaningPoker/RoomInfo';
import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { IAuthState } from '../../../../Models/Models/AuthState';




require('./UserInList.css');


interface UserInListOwnProps {
    User: UserInRoom;
    RenderForAdmin: boolean;
    HideVote: boolean;
    HasVote: boolean;
    MyHubConnection: signalR.HubConnection;
    CurrentUserIsAdmin: boolean;

}


interface UserInListStateToProps {

    RoomStatus: RoomStatus;

    MinVote: number;
    MaxVote: number;
    RoomName: string;
    AuthInfo: IAuthState;
    PlaningUserInfo: PlaningPokerUserInfo;

}

interface UserInListDispatchToProps {

}

interface UserInListProps extends UserInListStateToProps, UserInListOwnProps, UserInListDispatchToProps {

}



const UserInList = (props: UserInListProps) => {

    const [selectedEditRole, changeSelectedEditRoleState] = useState("-");

    const addNewRoleToUser = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.AddNewRoleToUser, props.RoomName, props.User.Id, selectedEditRole);

    }

    const removeRoleUser = () => {
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.RemoveRoleUser, props.RoomName, props.User.Id, selectedEditRole);

    }


    const tryToRemoveUserFromRoom = () => {
        if (!props.CurrentUserIsAdmin) {
            return;
        }

        if (props.PlaningUserInfo.UserId === props.User.Id) {
            if (!confirm('Вы уверены что хотите выгнать себя?')) {
                return;
            }
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.KickUser, props.RoomName, props.User.Id);
    };




    let userButton = <></>
    let statusChange = <></>
    if (props.RenderForAdmin) {
        userButton = <div className='user-list-buttons'>
            <div className='user-list-role-but'>
                <div className='user-role-but user-role-but-add' title='Добавить роль'
                    onClick={() => addNewRoleToUser()}>+</div>
                <div className='user-role-but user-role-but-del' title='Удалить роль'
                    onClick={() => removeRoleUser()}>-</div>
            </div>
            <div className='user-list-del-but'
                title='Выгнать пользователя'
                onClick={() => tryToRemoveUserFromRoom()}>
                <img className='persent-100-width-height' src="/images/delete-icon.png" />
            </div>
        </div>

        statusChange = <div>
            <select className="form-control" value={selectedEditRole} onChange={(e) => {
                changeSelectedEditRoleState(prevState => {
                    return e.target.value;
                });
            }}>
                <option value="-">Не выбрано</option>
                <option value={UserRoles.User}>{UserRoles.User}</option>
                <option value={UserRoles.Admin}>{UserRoles.Admin}</option>
                <option value={UserRoles.Observer}>{UserRoles.Observer}</option>
            </select>

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
            <div className='planing-user-img'>
                <img className='persent-100-width-height'
                    src={props.User.ImageLink || G_EmptyImagePath}
                    alt="Аватар" title='Аватар' />
            </div>
            <span>{props.User.Name}</span>
            <p>оценка: {vote}</p>
            {/* <hr /> */}
            <span>Роли: {props.User.Roles.join(', ')}</span>
            {statusChange}
            {userButton}
        </div>
        <div className="padding-10-top"></div>
    </div>


}




const mapStateToProps = (state: AppState, ownProps: UserInListOwnProps) => {
    let res = {} as UserInListStateToProps;
    res.RoomName = state.PlaningPokerApp.RoomInfo?.Name;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.MaxVote = state.PlaningPokerApp.VoteInfo?.MaxVote;
    res.MinVote = state.PlaningPokerApp.VoteInfo?.MinVote;
    res.AuthInfo = state.Auth;
    res.PlaningUserInfo = state.PlaningPokerApp.User;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: UserInListOwnProps) => {
    let res = {} as UserInListDispatchToProps;

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(UserInList);

