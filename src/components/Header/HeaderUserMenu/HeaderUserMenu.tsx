import * as React from "react";
import { connect } from 'react-redux';

import { IAuthState } from '../../../Models/Models/AuthState';


import {
    Link,
    BrowserRouter
} from "react-router-dom";
import { AppState } from "../../../Models/Models/State/AppState";


require('./HeaderUserMenu.css');


interface HeaderUserMenuOwnProps {

}

interface HeaderUserMenuStateToProps {
    Auth: IAuthState;
}

interface HeaderUserMenuDispatchToProps {

}

interface HeaderUserMenuProps extends HeaderUserMenuStateToProps, HeaderUserMenuOwnProps, HeaderUserMenuDispatchToProps {
}



const HeaderUserMenu = (props: HeaderUserMenuProps) => {

    const UserImageRender = (imgPath: string) => {
        let path = imgPath;
        if (!path) {
            path = G_EmptyImagePath;
        }

        return <img className='header-user-img' src={path}></img>
    }


    const LogginedOrNotRender = (loggined: boolean) => {
        if (loggined) {
            return LogginedUserRender();
        }

        return NotLogginedUserRender();
    }


    const LogginedUserRender = () => {
        return <div className='header-user-block-inner'>
            <div className='dropdown-toggle header-user-dropdown'
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className='header-user-name-text d-inline-block'>{props.Auth.User.Name}</span>
                <span className='d-inline-block header-user-img'>
                    {UserImageRender(props.Auth.User.Image)}
                </span>
            </div>
            <div className="dropdown-menu header-user-menu">
                <Link className="dropdown-item" to="/menu/auth/login/">Войти</Link>
                <Link className="dropdown-item" to="/menu/auth/register/">Зарегистрироваться</Link>
                <Link className="dropdown-item" to="/menu/person-settings/">Настройки</Link>
                {/* <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a> */}
            </div>
        </div>
    }


    const NotLogginedUserRender = () => {
        return <div className='header-user-block-inner'>
            <div className='dropdown-toggle header-auth-dropdown' data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Авторизация
            </div>
            <div className="dropdown-menu header-user-menu">
                <Link className="dropdown-item" to="/menu/auth/login/">Войти</Link>
                <Link className="dropdown-item" to="/menu/auth/register/">Зарегистрироваться</Link>
            </div>
        </div>
    }

    return <div className='header-user-block col-5 col-md-3 nopadding '>
        {LogginedOrNotRender(props.Auth.AuthSuccess)}
    </div>

}




const mapStateToProps = (state: AppState, ownProps: HeaderUserMenuOwnProps) => {
    let res = {} as HeaderUserMenuStateToProps;
    res.Auth = state.Auth;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: HeaderUserMenuOwnProps) => {
    let res = {} as HeaderUserMenuDispatchToProps;
    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(HeaderUserMenu);