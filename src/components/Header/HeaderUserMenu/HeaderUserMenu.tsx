import * as React from "react";
import { IAuthState } from '../../../Models/Models/AuthState';


import {
    Link,
    BrowserRouter
} from "react-router-dom";


require('./HeaderUserMenu.css');


export interface IHeaderUserMenuProps {
    AuthInfo: IAuthState;
}


export class HeaderUserMenu extends React.Component<IHeaderUserMenuProps, {}> {

    constructor(props: IHeaderUserMenuProps) {
        super(props);


        this.LogginedUserRender = this.LogginedUserRender.bind(this);

    }

    componentDidMount() {
        //TODO стучимся в апи, устанавливаем стейт
    }

    UserImageRender(imgPath: string) {
        let path = imgPath;
        if (!path) {
            path = G_PathToBaseImages + 'user_empty_image.png';
        }

        return <img className='header-user-img' src={path}></img>
    }


    LogginedOrNotRender(loggined: boolean) {
        if (loggined) {
            return this.LogginedUserRender();
        }

        return this.NotLogginedUserRender();
    }


    LogginedUserRender() {
        return <div className='header-user-block-inner'>
            <div className='dropdown-toggle header-user-dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className='header-user-name-text d-inline-block'>{this.props.AuthInfo.User.Name}</span>
                <span className='d-inline-block header-user-img'>
                    {this.UserImageRender(this.props.AuthInfo.User.Image)}
                </span>
            </div>
            <div className="dropdown-menu header-user-menu">
                <Link className="dropdown-item" to="/menu/auth/login/">Войти</Link>
                <Link className="dropdown-item" to="/menu/auth/register/">Зарегистрироваться</Link>
                {/* <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a> */}
            </div>
        </div>
    }


    NotLogginedUserRender() {
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



    render() {
        return <div className='header-user-block col-5 col-md-3 nopadding '>
            {this.LogginedOrNotRender(this.props.AuthInfo.AuthSuccess)}
        </div>
    }
}
