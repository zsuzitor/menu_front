import * as React from "react";

export interface IRegisterState {
    Login:string;
    Password:string;
    ConfirmPassword:string;
}

export class Register extends React.Component<{}, IRegisterState> {

    constructor(props:any) {
        super(props);

        let newState: IRegisterState= {
            Login:null,
            Password:null,
            ConfirmPassword:null,
        };

        this.state = newState;

        this.LoginOnChange = this.LoginOnChange.bind(this);
        this.PasswordOnChange = this.PasswordOnChange.bind(this);
        this.ConfirmPasswordOnChange = this.ConfirmPasswordOnChange.bind(this);
        this.TryRegister = this.TryRegister.bind(this);

    }

    LoginOnChange(e:any) {
        var newLogin = e.target.value.trim();
        let newState = {...this.state};
        newState.Login = newLogin;

        this.setState(newState);
    }

    PasswordOnChange(e:any) {
        var newPassword = e.target.value.trim();
        // let newState = Object.assign({}, this.state);
        let newState = {...this.state};
        newState.Password = newPassword;

        this.setState(newState);
    }

    ConfirmPasswordOnChange(e:any) {
        var newPassword = e.target.value.trim();
        let newState = {...this.state};
        newState.ConfirmPassword = newPassword;

        this.setState(newState);
    }


    TryRegister() {
        //TODO отправляем запрос и чистим state
    }
    //style={{align:"center"}}
    render() {
        return <div className='persent-100-width'>
            <div className='persent-100-width'>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='text' placeholder='login' onChange={this.LoginOnChange}></input>
                </div>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='password' placeholder='password' onChange={this.PasswordOnChange}></input>
                </div>
                <div className='persent-100-width padding-10-top'>
                    <input className='form-control persent-100-width' type='password' placeholder='confirm password' onChange={this.ConfirmPasswordOnChange}></input>
                </div>
                <button className='btn persent-100-width' onClick={this.TryRegister}>Зарегистрироваться</button>
            </div>


        </div>
    }
}
// </helloprops>