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

        return <div className='row auth-switcher'>
            <div className='col-sm-6'>
                <Link className={('auth-switcher-link btn' + (props.LoginPage ? ' btn-primary' : ' btn-light'))}
                    to="/menu/auth/login/">Вход</Link>
            </div>
            <div className='col-sm-6'>
                <Link className={('auth-switcher-link btn' + (!props.LoginPage ? ' btn-primary' : ' btn-light'))}
                    to="/menu/auth/register/">Регистарция</Link>
            </div>
        </div>
    }


    return <div className='main-auth-container'>
        <div className='auth-container-inner col-sm-6 col-md-5 col-lg-4 offset-sm-3 offset-lg-4'>
            {switcher()}{swithLogic()}
        </div>
    </div>

}


export default MainAuth;
