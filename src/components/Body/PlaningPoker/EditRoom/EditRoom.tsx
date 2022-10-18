import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { PlaningPokerUserInfo, RoomStatus } from '../../../../Models/Models/PlaningPoker/RoomInfo';
import { AppState } from '../../../../Models/Models/State/AppState';


require('./EditRoom.css');

interface EditRoomOwnProps {
    MyHubConnection: signalR.HubConnection;

}

interface EditRoomStateToProps {
    RoomName: string;
    UserInfo: PlaningPokerUserInfo;
    RoomStatus: RoomStatus;
    Cards: (string | number)[];
}

interface EditRoomDispatchToProps {
    // SetUserName: ((newName: string) => void);
    // ChangeRoomPassword: (roomname: string, userConnectionId: string, oldPassword: string, newPassword: string) => void;
}

interface EditRoomProps extends EditRoomStateToProps, EditRoomOwnProps, EditRoomDispatchToProps {
}

const EditRoom = (props: EditRoomProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const stringCards = props.Cards.join(';');
    const [cards, setCards] = useState(stringCards);


    useEffect(() => {
        setCards(stringCards);
    }, [stringCards]);


    const changePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            alert('Пароли не совпадают');
            return;
        }

        // props.ChangeRoomPassword(props.RoomName, props.UserInfo.UserConnectionId, oldPassword, newPasswordConfirm);
        window.G_PlaningPokerController.ChangeRoomPassword(props.RoomName
            , props.UserInfo.UserConnectionId, oldPassword, newPassword, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (data?.result) {
                    alert('Пароль изменен');
                }
                else {
                    alert('Что то пошло не так, попробуйте позже');

                }
            })
    }

    const changeCards = () => {
        if (props.RoomStatus != RoomStatus.CloseVote) {
            alert('Необходимо закрыть текущее голосование');
            return;
        }
        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.SetRoomCards, props.RoomName, cards);

    }

    return <div>
        <label>Старый пароль</label>
        <input type='password' className='persent-100-width form-control'
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder='Старый пароль' value={oldPassword}></input>
        <label>Новый пароль</label>
        <input type='password' className='persent-100-width form-control'
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Новый пароль' value={newPassword}></input>
        <label>Новый пароль</label>
        <input type='password' className='persent-100-width form-control'
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            placeholder='Новый пароль' value={newPasswordConfirm}></input>
        <button className='btn btn-b-light' onClick={() => changePassword()}>Изменить пароль</button>
        <hr></hr>

        <label>Оценки через ;</label>
        <input type='text' className='persent-100-width form-control'
            onChange={(e) => setCards(e.target.value)}
            placeholder='Оценки' value={cards}></input>
        <button className='btn btn-b-light' onClick={() => changeCards()}>Изменить оценки</button>
    </div>
}






const mapStateToProps = (state: AppState, ownProps: EditRoomProps) => {
    let res = {} as EditRoomStateToProps;
    res.RoomName = state.PlaningPokerApp.RoomInfo?.Name;
    res.UserInfo = state.PlaningPokerApp.User;
    res.RoomStatus = state.PlaningPokerApp.RoomStatus;
    res.Cards = state.PlaningPokerApp.RoomCards;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: EditRoomOwnProps) => {
    let res = {} as EditRoomDispatchToProps;
    // res.ChangeRoomPassword = (roomname: string, userConnectionId: string, oldPassword: string, newPassword: string) => {
    //     dispatch(window.G_PlaningPokerController.ChangeRoomPasswordRedux(roomname, userConnectionId, oldPassword, newPassword));
    // }

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(EditRoom);
