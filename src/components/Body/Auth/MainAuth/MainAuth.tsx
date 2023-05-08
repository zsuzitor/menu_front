import * as React from "react";
import Login from '../Login/Login';
import Register from '../Register/Register';


import {
    Link,
    BrowserRouter
} from "react-router-dom";


require('./MainAuth.css');



export interface IMainAuthProps {
    LoginPage: boolean;
}


const MainAuth = (props: IMainAuthProps) => {
    const swithLogic = () => {
        // console.log(this.props);
        if (props.LoginPage) {
            return <Login />;
        }
        else {
            return <Register />;
        }
    }

    const switcher = () => {
        return <div className='auth-switcher'>
            <div>
                <Link className={('auth-switcher-link' + ' button' + (props.LoginPage ? ' button-blue' : ' button-grey'))}
                    to="/menu/auth/login/">Вход</Link>
            </div>
            <div>
                <Link className={('auth-switcher-link' + ' button' + (!props.LoginPage ? ' button-blue' : ' button-grey'))}
                    to="/menu/auth/register/">Регистрация</Link>
            </div>
        </div>
    }


    return <div className='main-auth-container'>
        <div className='auth-container-inner'>
            {switcher()}{swithLogic()}
        </div>
    </div>

}


export default MainAuth;
