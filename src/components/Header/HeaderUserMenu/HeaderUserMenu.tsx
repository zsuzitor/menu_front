import React, { useState } from "react";
import { connect } from 'react-redux';

import { IAuthState } from '../../../Models/Models/AuthState';


import {
    Link,
    BrowserRouter
} from "react-router-dom";
import { AppState } from "../../../Models/Models/State/AppState";
import { MainErrorObjectBack } from "../../../Models/BackModel/ErrorBack";
import { BoolResultBack } from "../../../Models/BackModel/BoolResultBack";
import { AlertData } from "../../../Models/Models/AlertData";


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

    const [showMenu, setShowMenu] = useState(false);

    let menuClass = 'header-user-menu header-user-menu-hide';
    if (showMenu) {
        menuClass = 'header-user-menu header-user-menu-show';
    }

    const UserImageRender = (imgPath: string) => {
        let path = imgPath;
        if (!path) {
            path = G_EmptyImagePath;
        }

        return <img className='' src={path}></img>
    }


    const LogginedOrNotRender = (loggined: boolean) => {
        if (loggined) {
            return LogginedUserRender();
        }

        return NotLogginedUserRender();
    }

    const exitApp = () => {
        window.G_AuthenticateController.Logout((error: MainErrorObjectBack, data: BoolResultBack) => {
            if (data?.result) {
                location.href = '/menu/auth/login/';
            }
            else {
                let alertFactory = new AlertData();
                let alert = alertFactory.GetDefaultNotify("Не удалось");
                window.G_AddAbsoluteAlertToState(alert);
            }
        });
    }


    const LogginedUserRender = () => {
        return <>
            <div className='header-user-dropdown' onClick={() => setShowMenu(!showMenu)}>
                <div className='header-user-name-text'>{props.Auth.User.Name}</div>
                <div className='header-user-img'>
                    {UserImageRender(props.Auth.User.Image)}
                </div>
            </div>
            <div className={menuClass}>
                {/* <div>
                    <a href="/menu/auth/login/">Войти</a>
                </div>
                <div>
                    <a href="/menu/auth/register/">Зарегистрироваться</a>
                </div> */}
                <div onClick={() => location.href = '/menu/person-settings/'}
                    className='header-user-menu-line'>
                    Настройки
                    {/* <Link className="" to="/menu/person-settings/">Настройки</Link> */}
                    {/* <a href="/menu/person-settings/">Настройки</a> */}
                </div>
                <div onClick={() => exitApp()}
                    className='header-user-menu-line'>
                    Выход
                </div>

            </div>
        </>
    }


    const NotLogginedUserRender = () => {
        return <>
            <div className='header-auth-dropdown' onClick={() => setShowMenu(!showMenu)}>
                Авторизация
            </div>
            <div className={menuClass}>
                <div onClick={() => location.href = '/menu/auth/login/'}
                    className='header-user-menu-line'>
                    Войти
                    {/* <Link className="" to="/menu/auth/login/">Войти</Link> */}
                    {/* <a href="/menu/auth/login/">Войти</a> */}

                </div>
                <div onClick={() => location.href = '/menu/auth/register/'}
                    className='header-user-menu-line'>
                    Зарегистрироваться
                    {/* <Link className="" to="/menu/auth/register/">Зарегистрироваться</Link> */}
                    {/* <a href="/menu/auth/register/">Зарегистрироваться</a> */}

                </div>
            </div>
        </>
    }

    return <div className='header-user-block-inner'>
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