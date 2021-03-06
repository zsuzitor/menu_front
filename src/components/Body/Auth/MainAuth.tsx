import * as React from "react";
import { Login } from './Login';
import { Register } from './Register';


import {
    Link,
    BrowserRouter
} from "react-router-dom";


export interface IMainAuthProps {
    LoginPage: boolean;
}

export class MainAuth extends React.Component<IMainAuthProps, {}> {

    constructor(props: IMainAuthProps) {
        super(props);
       
        this.SwithLogic = this.SwithLogic.bind(this);
        this.Switcher = this.Switcher.bind(this);
    }

    SwithLogic() {
        // console.log(this.props);
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
                    <Link className={('auth-switcher-link btn' + (this.props.LoginPage ? ' btn-primary' : ' btn-light'))} to="/menu/auth/login/">Вход</Link>
            </div>
            <div className='col-sm-6'>
                    <Link className={('auth-switcher-link btn' + (!this.props.LoginPage ? ' btn-primary' : ' btn-light'))} to="/menu/auth/register/">Регистарция</Link>
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
