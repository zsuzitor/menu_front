
import React from 'react'


export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.Login = null;
        this.state.Password = null;

        this.loginOnChange = this.loginOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.tryLogin = this.tryLogin.bind(this);

    }

    loginOnChange(e) {
        var newLogin = e.target.value.trim();
        let newState = Object.assign({}, this.state);
        newState.Login = newLogin;

        this.setState(newState);
    }

    passwordOnChange(e) {
        var newPassword = e.target.value.trim();
        let newState = Object.assign({}, this.state);
        newState.Password = newPassword;

        this.setState(newState);
    }


    tryLogin() {
        //TODO отправляем запрос и чистим state
    }
    //style={{align:"center"}}
    render() {
        return <div className='persent-100-width'>
            <div className='persent-100-width'>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='text' placeholder='login' onChange={this.loginOnChange}></input>
                </div>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='password' placeholder='password' onChange={this.passwordOnChange}></input>
                </div>
                <button className='btn persent-100-width' onClick={this.tryLogin}>Войти</button>
            </div>


        </div>
    }

}