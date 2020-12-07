import * as React from "react";
import {Login} from './Login'
import {Register} from './Register'


import {
    Link,
    BrowserRouter
} from "react-router-dom";


export interface IMainAuthProps {
LoginPage:boolean;
}

export class MainAuth extends React.Component<IMainAuthProps, {}> {

    constructor(props:any) {
        super(props);

        // this.state = {
        //     login: true,
        // };
    }

    SwithLogic() {
        if (this.props.LoginPage) {
            return <Login />;
        }
        else {
            return <Register />;
        }
    }

    Switcher() {

        return <div className='row auth-switcher'>
            <div className='col-sm-6'>
                <BrowserRouter>
                    <Link className={('auth-switcher-link btn' + (this.props.LoginPage ? ' btn-primary' : ' btn-light'))} to="/auth/login/">Вход</Link>
                </BrowserRouter>
                {/* <button className={('btn' + (this.props.login ? ' btn-primary' : ''))}>Вход</button> */}
            </div>
            <div className='col-sm-6'>
                <BrowserRouter>
                    <Link className={('auth-switcher-link btn' + (!this.props.LoginPage ? ' btn-primary' : ' btn-light'))} to="/auth/register/">Регистарция</Link>
                </BrowserRouter>
                {/* <button className={('btn' + ((!this.props.login) ? ' btn-primary' : ''))}>Регистрация</button> */}
            </div>
        </div>
    }

    
    render() {
        return <div className='main-auth-container'>
            <div className='auth-container-inner col-sm-6 col-md-5 col-lg-4 offset-sm-3 offset-lg-4'>
                {this.Switcher()}{this.SwithLogic()}
            </div>
        </div>
    }
}
// </helloprops>