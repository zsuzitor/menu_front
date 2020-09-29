
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
        var newLogin = e.target.value.trim();
        let newState = Object.assign({}, this.state);
        newState.Login = newLogin;

        this.setState(newState);
    }


    tryLogin() {
        //TODO отправляем запрос и чистим state
    }

    render() {
        return <div className='row'>
            <div className='col-sm-6 offset-sm-3' style={{align:"center"}}>
            <div ><input style={{width:'100%'}} type='text' placeholder='login' onChange={this.loginOnChange}></input></div>
            <div ><input style={{width:'100%'}} type='password' placeholder='password' onChange={this.passwordOnChange}></input></div>
            <button style={{width:'100%'}} onClick={this.tryLogin}>Войти</button>
            </div>
            

        </div>
    }

}