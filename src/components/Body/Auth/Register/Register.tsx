import React, { useState, useEffect } from 'react';

import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { AlertData } from '../../../../Models/Models/AlertData';
require('./Register.css');

export interface IRegisterState {
    Login: string;
    Password: string;
    ConfirmPassword: string;
}

export interface IRegisterProps {
}


let alertFactory = new AlertData();

const Register = (props: IRegisterProps) => {
    let defaultState: IRegisterState = {
        Login: '',
        Password: '',
        ConfirmPassword: '',
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

    const confirmPasswordOnChange = (e: any) => {
        var newPassword = e.target.value.trim();
        setState(st => {
            let newState = { ...st };
            newState.ConfirmPassword = newPassword;
            return newState;
        });
    }




    const tryRegister = () => {
        if (state.Password !== state.ConfirmPassword) {
            let alert = alertFactory.GetDefaultError("Пароли не совпадают");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }
        let data = {
            Email: state.Login,
            Password: state.Password,
            ConfirmPassword: state.ConfirmPassword,
        };

        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                document.location.href = "/menu";
            }
        }

        window.G_AuthenticateController.Register(data, onSuccess);
    }

    return <div className='persent-100-width'>
        <div className='register-form persent-100-width'>
            <div className='persent-100-width'>
                <input className='form-input persent-100-width'
                    value={state.Login}
                    type='text' placeholder='Email' onChange={loginOnChange}></input>
            </div>
            <div className='persent-100-width'>
                <input className='form-input persent-100-width'
                    value={state.Password}
                    type='password' placeholder='Пароль' onChange={passwordOnChange}></input>
            </div>
            <div className='persent-100-width'>
                <input className='form-input persent-100-width'
                    value={state.ConfirmPassword}
                    type='password' placeholder='Подтвердите пароль' onChange={confirmPasswordOnChange}></input>
            </div>
            <button className='button button-blue persent-100-width' onClick={tryRegister}>Зарегистрироваться</button>
        </div>
    </div>

}

export default Register;
