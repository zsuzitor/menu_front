import React, { useState, useEffect } from 'react';

import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
/// <reference path="../../../typings/globals.d.ts" />

export interface ILoginState {
    Login: string;
    Password: string;
    ShowForgetPassword: boolean;
}

export interface ILoginProps {

}




const Login = (props: ILoginProps) => {
    let defaultState: ILoginState = {
        Login: '',
        Password: '',
        ShowForgetPassword: false,
    };
    const [state, setState] = useState(defaultState);


    const loginOnChange = (e: any) => {
        var newLogin = e.target.value.trim();
        setState(st => {
            let newState = { ...st };
            newState.Login = newLogin;
            return newState;
        });
    }

    const passwordOnChange = (e: any) => {
        var newPassword = e.target.value.trim();
        setState(st => {
            let newState = { ...st };
            newState.Password = newPassword;
            return newState;
        });
    }

    const tryLogin = () => {
        let data = {
            Email: state.Login,
            Password: state.Password,
        };

        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                document.location.href = "/menu";
            }
        }

        window.G_AuthenticateController.Login(data, onSuccess);

    }

    const setForgetPassword = () => {
        setState(st => {
            let newState = { ...st };
            newState.ShowForgetPassword = !newState.ShowForgetPassword;
            return newState;
        });

    }

    const sendMessageForgotPassword = () => {

        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                alert('Сообщение отправлено');
                document.location.href = "/menu/auth/password-recovery/";
            }
        }

        window.G_AuthenticateController.SendMessageForgotPassword(state.Login, onSuccess);
    }

    return <div className='persent-100-width'>
        <div className='persent-100-width padding-10-top'>
            <input className='form-control persent-100-width' type='text'
                placeholder='email' onChange={loginOnChange}
                value={state.Login}></input>
        </div>
        {state.ShowForgetPassword ? <>
            <button className='btn persent-100-width' onClick={setForgetPassword}>Войти</button>
            <button className='btn persent-100-width'
                onClick={sendMessageForgotPassword}>Отправить письмо на почту</button>
        </> : <>
            <div className='persent-100-width padding-10-top'>
                <input className='form-control persent-100-width'
                    type='password' placeholder='password' onChange={passwordOnChange}
                    value={state.Password}></input>
            </div>
            <button className='btn persent-100-width' onClick={tryLogin}>Войти</button>
            <button className='btn persent-100-width' onClick={setForgetPassword}>Восстановить пароль</button>
        </>}


    </div>

}

export default Login;
