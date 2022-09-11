import * as React from "react";
import { MainErrorObjectBack } from "../../../Models/BackModel/ErrorBack";
import { AlertData } from "../../../Models/Models/AlertData";
/// <reference path="../../../typings/globals.d.ts" />

export interface ILoginState {
    Login: string;
    Password: string;
    ShowForgetPassword: boolean;
}






export class Login extends React.Component<{}, ILoginState> {

    constructor(props: any) {
        super(props);

        let newState: ILoginState = {
            Login: '',
            Password: '',
            ShowForgetPassword: false,
        };

        this.state = newState;

        this.LoginOnChange = this.LoginOnChange.bind(this);
        this.PasswordOnChange = this.PasswordOnChange.bind(this);
        this.TryLogin = this.TryLogin.bind(this);
        this.SetForgetPassword = this.SetForgetPassword.bind(this);
        this.SendMessageForgotPassword = this.SendMessageForgotPassword.bind(this);
    }

    LoginOnChange(e: any) {
        var newLogin = e.target.value.trim();
        let newState = { ...this.state };//Object.assign({}, this.state);
        newState.Login = newLogin;

        this.setState(newState);
    }

    PasswordOnChange(e: any) {
        var newPassword = e.target.value.trim();
        let newState = { ...this.state };//Object.assign({}, this.state);
        newState.Password = newPassword;

        this.setState(newState);
    }


    async TryLogin() {
        let data = {
            Email: this.state.Login,
            Password: this.state.Password,
        };

        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                document.location.href = "/menu";
            }
        }

        window.G_AuthenticateController.Login(data, onSuccess);

    }

    SetForgetPassword() {
        let newState = { ...this.state };//Object.assign({}, this.state);
        newState.ShowForgetPassword = !newState.ShowForgetPassword;
        this.setState(newState);
    }

    SendMessageForgotPassword() {

        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                alert('Сообщение отправлено');
                document.location.href = "/menu/auth/password-recovery/";
            }
        }

        window.G_AuthenticateController.SendMessageForgotPassword(this.state.Login, onSuccess);
    }

    render() {
        return <div className='persent-100-width'>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='text'
                        placeholder='email' onChange={this.LoginOnChange}
                        value={this.state.Login}></input>
                </div>
                {this.state.ShowForgetPassword ? <>
                    <button className='btn persent-100-width' onClick={this.SetForgetPassword}>Войти</button>
                    <button className='btn persent-100-width'
                        onClick={this.SendMessageForgotPassword}>Отправить письмо на почту</button>
                </> : <>
                    <div className='persent-100-width padding-10-top'>
                        <input className='form-control persent-100-width'
                            type='password' placeholder='password' onChange={this.PasswordOnChange}
                            value={this.state.Password}></input>
                    </div>
                    <button className='btn persent-100-width' onClick={this.TryLogin}>Войти</button>
                    <button className='btn persent-100-width' onClick={this.SetForgetPassword}>Восстановить пароль</button>
                </>}


            </div>
    }
}
