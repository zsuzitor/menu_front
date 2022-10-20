import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { AlertData } from '../../../../Models/Models/AlertData';
import { IAuthState } from '../../../../Models/Models/AuthState';
import { PlaningPokerUserInfo, RoomStatus } from '../../../../Models/Models/PlaningPoker/RoomInfo';
import { AppState } from '../../../../Models/Models/State/AppState';


require('./PersonSettings.css');

interface PersonSettingsOwnProps {
    AuthInfo: IAuthState;
}

interface PersonSettingsStateToProps {
}

interface PersonSettingsDispatchToProps {
    // SetUserName: ((newName: string) => void);
    // ChangeRoomPassword: (roomname: string, userConnectionId: string, oldPassword: string, newPassword: string) => void;
}

interface PersonSettingsProps extends PersonSettingsStateToProps, PersonSettingsOwnProps, PersonSettingsDispatchToProps {
}

const PersonSettings = (props: PersonSettingsProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [name, setName] = useState('');


    let alertFactory = new AlertData();


    useEffect(() => {
    }, []);



    const changePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            let alert = alertFactory.GetDefaultError("Пароли не совпадают");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        // props.ChangeRoomPassword(props.RoomName, props.UserInfo.UserConnectionId, oldPassword, newPasswordConfirm);
        window.G_UsersController.ChangePassword(oldPassword
            , newPassword, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (data?.result) {
                    let alert = alertFactory.GetDefaultNotify("Пароль изменен");
                    window.G_AddAbsoluteAlertToState(alert);
                }
                else {
                    let alert = alertFactory.GetDefaultError("Что то пошло не так, попробуйте позже");
                    window.G_AddAbsoluteAlertToState(alert);

                }
            });
    }

    const changeName = () => {
        if (!name) {

            let alert = alertFactory.GetDefaultError("Имя не заполнено");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        window.G_UsersController.ChangeName(name, (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (data?.result) {
                let alert = alertFactory.GetDefaultNotify("Имя изменено");
                window.G_AddAbsoluteAlertToState(alert);
            }
            else {
                let alert = alertFactory.GetDefaultError("Что то пошло не так, попробуйте позже");
                window.G_AddAbsoluteAlertToState(alert);

            }
        })
    }



    return <div className='person-settings-outer'>
        <div>
            <input type='text' className='persent-100-width form-control'
                onChange={(e) => setName(e.target.value)}
                placeholder='Имя пользователя' value={name}></input>
            <button className='btn btn-b-light' onClick={() => changeName()}>Изменить имя</button>
        </div>
        <div>

        </div>

        <div className='person-settings-passwords'>
            <label>Старый пароль</label>
            <input type='password' className='persent-100-width form-control'
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder='Старый пароль' value={oldPassword}></input>
            <label>Новый пароль</label>
            <input type='password' className='persent-100-width form-control'
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Новый пароль' value={newPassword}></input>
            <label>Подтвердите новый пароль</label>
            <input type='password' className='persent-100-width form-control'
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder='Новый пароль' value={newPasswordConfirm}></input>
            <button className='btn btn-b-light' onClick={() => changePassword()}>Изменить пароль</button>
        </div>
    </div>
}






const mapStateToProps = (state: AppState, ownProps: PersonSettingsOwnProps) => {
    let res = {} as PersonSettingsStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: PersonSettingsOwnProps) => {
    let res = {} as PersonSettingsDispatchToProps;
    // res.ChangeRoomPassword = (roomname: string, userConnectionId: string, oldPassword: string, newPassword: string) => {
    //     dispatch(window.G_PlaningPokerController.ChangeRoomPasswordRedux(roomname, userConnectionId, oldPassword, newPassword));
    // }

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(PersonSettings);
