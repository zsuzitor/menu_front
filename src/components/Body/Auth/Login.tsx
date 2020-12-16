import * as React from "react";

export interface ILoginState {
    Login: string;
    Password: string;
}




export class Login extends React.Component<{}, ILoginState> {

    constructor(props: any) {
        super(props);

        let newState: ILoginState = {
            Login: null,
            Password: null,
        };

        this.state = newState;

        this.LoginOnChange = this.LoginOnChange.bind(this);
        this.PasswordOnChange = this.PasswordOnChange.bind(this);
        this.TryLogin = this.TryLogin.bind(this);

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


    TryLogin() {
        //TODO отправляем запрос и чистим state
        let data = {
            'Email' : "asdasd@mail.ru",
            'Password' : "Password"
        };

        // $.post(G_PathToServer + 'api/Authenticate/login/',data,()=>{}, headers:);
        
        $.ajax({
            type: "POST",
            url: G_PathToServer + 'api/Authenticate/login/',
            data: data,
            // secure: true,
            dataType: 'jsonp',//'jsonp',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            
            contentType:'application/json',
            

            success: (plain, textStatus,jqXHR )=>{
                debugger;
                alert();
            },
            complete:()=>{
                debugger;
                alert();
            },
            // cors: true,

          });



        // $.ajax({
        //     url: G_PathToServer + 'api/Authenticate/login/',
        //     method: 'post',
        //     data: {
        //         'Email' : "asdasd@mail.ru",
        //         'Password' : "Password"
        //     },
        //         headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     dataType: 'jsonp',
        //     success: function (data) {
        //         console.info(data);
        //     }
        // });



        // $.ajax({
        //     url: 'https://localhost:44305/' + 'api/Authenticate/login/',
        //     method: 'post',
        //     data: {
        //         'Easdail' : "asdasru",
        //         'Passasddword' : "Passcczxword"
        //     },headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     dataType: 'json',
        //     success: function (data) {
        //         console.info(data);
        //     }
        // });


        // $.ajax({
        //     url: 'http://localhost:3000/',
        //     method: 'post',
        //     data: {
        //         'Easdail' : "asdasru",
        //         'Passasddword' : "Passcczxword"
        //     },headers: {
        //         'Access-Control-Allow-Origin': '*',
        //     },
        //     dataType: 'json',
        //     success: function (data) {
        //         console.info(data);
        //     }
        // });



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
                <button className='btn persent-100-width' onClick={this.TryLogin}>Войти</button>
            </div>


        </div>
    }
}
// </helloprops>