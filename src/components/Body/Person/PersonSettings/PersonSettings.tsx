import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SetAuthActionCreator } from '../../../../Models/Actions/App/Actions';
import { BoolResultBack, StringResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { AlertData } from '../../../../Models/Models/AlertData';
import { IAuthState } from '../../../../Models/Models/AuthState';
import { AppState } from '../../../../Models/Models/State/AppState';
import cloneDeep from 'lodash/cloneDeep';


require('./PersonSettings.css');

interface PersonSettingsOwnProps {
}

interface PersonSettingsStateToProps {
    AuthInfo: IAuthState;

}

interface PersonSettingsDispatchToProps {
    SetAuth: ((data: IAuthState) => void);
}

interface PersonSettingsProps extends PersonSettingsStateToProps, PersonSettingsOwnProps, PersonSettingsDispatchToProps {
}

const PersonSettings = (props: PersonSettingsProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [name, setName] = useState('');
    // const [passwordsBlockShow, setPasswordsBlockShow] = useState(false);

    const [showSection, setShowSection] = useState(1);


    let alertFactory = new AlertData();


    useEffect(() => {
    }, []);


    useEffect(() => {
        setName(props.AuthInfo?.User?.Name || '');
        // console.log(props.AuthInfo?.User?.Name || '-');
    }, [props.AuthInfo?.User?.Name]);


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
                    setOldPassword('');
                    setNewPassword('');
                    setNewPasswordConfirm('');
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
                let auth = cloneDeep(props.AuthInfo);
                auth.User.Name = name;
                props.SetAuth(auth);
                let alert = alertFactory.GetDefaultNotify("Имя изменено");
                window.G_AddAbsoluteAlertToState(alert);
            }
            else {
                let alert = alertFactory.GetDefaultError("Что то пошло не так, попробуйте позже");
                window.G_AddAbsoluteAlertToState(alert);
            }
        });
    }

    const loadImage = () => {
        var img = ($('#main_image_input')[0] as HTMLInputElement).files[0];
        if (!img) {
            alert('Выберите изображение');
            return;
        }

        updateImage(img);
    }

    const removeImage = () => {
        updateImage(null);
    }

    const updateImage = (img: File) => {
        window.G_UsersController.UpdateImage(img, (error: MainErrorObjectBack, data: StringResultBack) => {
            if (data) {
                let auth = cloneDeep(props.AuthInfo);
                auth.User.Image = data.result;
                props.SetAuth(auth);
                let alert = alertFactory.GetDefaultNotify("Изображение изменено");
                window.G_AddAbsoluteAlertToState(alert);
            }
            else {
                let alert = alertFactory.GetDefaultError("Что то пошло не так, попробуйте позже");
                window.G_AddAbsoluteAlertToState(alert);
            }
        })
    }


    let sectionContent = <></>

    if (showSection == 1) {
        sectionContent = <>
            <div className='person-settings-inner'>
                <div>
                    <div>
                        <input type='text' className='person-settings-username form-control'
                            autoComplete="us-name"
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Имя пользователя' value={name}></input>
                        <button className='btn btn-b-light'
                            type="button"
                            onClick={() => changeName()}>Изменить имя</button>
                    </div>
                </div>
                <div className='person-settings-inner-right'>
                    <div className='person-settings-image-block'>
                        <div className='person-settings-image'>
                            <img className='persent-100-width-height'
                                src={props.AuthInfo?.User?.Image || G_EmptyImagePath}
                                alt="Аватар" title='Аватар' />
                            {/* <div className='person-settings-image-hv'></div> */}

                        </div>
                        <input className='form-control' type='file' id='main_image_input'></input>
                        <button type="button" className='btn btn-b-light'
                            onClick={() => loadImage()}>Загрузить</button>
                        <button type="button" className='btn btn-b-light'
                            onClick={() => removeImage()}>Удалить</button>
                    </div>
                </div>
            </div></>
    }
    else if (showSection == 2) {
        sectionContent = <><div className='person-settings-passwords'>
            <label>Старый пароль</label>
            <input type='password' className='persent-100-width form-control'
                autoComplete="old-password"
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
            <button className='btn btn-b-light'
                type="button"
                onClick={() => changePassword()}>Изменить пароль</button>
        </div></>
    }


    return <div className='person-settings-outer'>
        <div>
            <div className='edit-person-sections-block'>
                <div onClick={() => setShowSection(1)}>Информация профиля</div>
                <div onClick={() => setShowSection(2)}>Безопасность</div>
            </div>
            <hr></hr>
            {sectionContent}

        </div>

    </div>
}






const mapStateToProps = (state: AppState, ownProps: PersonSettingsOwnProps) => {
    let res = {} as PersonSettingsStateToProps;
    res.AuthInfo = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: PersonSettingsOwnProps) => {
    let res = {} as PersonSettingsDispatchToProps;
    res.SetAuth = (data: IAuthState) => {
        dispatch(SetAuthActionCreator(data));
    }

    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(PersonSettings);
