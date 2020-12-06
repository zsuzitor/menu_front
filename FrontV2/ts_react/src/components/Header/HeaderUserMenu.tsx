import * as React from "react";
import {IAuthState} from '../_ComponentsLink/AuthState';

export interface IHeaderUserMenuProps {
    AuthInfo: IAuthState;
}

export class HeaderUserMenu extends React.Component<IHeaderUserMenuProps, {}> {

    constructor(props:IHeaderUserMenuProps) {
        super(props);
    }

    componentDidMount() {
        //TODO стучимся в апи, устанавливаем стейт
    }

    userImage(imgPath: string) {
        let path = imgPath;
        if (!path) {
            path = '../../images/user_empty_image.png';
            // return <img className='header-user-img' src='../../images/user_empty_image.png'></img>
        }

        return <img className='header-user-img' src={path}></img>
    }


    logginedOrNot(loggined:boolean) {
        if (loggined) {
            return this.logginedUser();
        }
        else {
            return this.notLogginedUser();
        }
    }


    logginedUser() {
        return <div className='header-user-block-inner'><div className='dropdown-toggle header-user-dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className='header-user-name-text d-inline-block'>{this.props.AuthInfo.User.Name}</span>
            <span className='d-inline-block header-user-img'>
                {this.userImage(this.props.AuthInfo.User.Image)}
            </span>
        </div>
            <div className="dropdown-menu" style={{ backgroundColor: 'greenyellow' }}>
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <a className="dropdown-item" href="#">Something else here</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
            </div>
        </div>
    }


    notLogginedUser() {
        return <div className='header-user-block-inner'><div className='dropdown-toggle header-auth-dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Авторизация
        </div>
            <div className="dropdown-menu" style={{ backgroundColor: 'greenyellow' }}>
                {/* TODO не уверен что так можно и что это будет работать  -- <BrowserRouter> */}
                <a className="dropdown-item" href="/auth/login">Войти</a>
                <a className="dropdown-item" href="/auth/register/">Зарегистрироваться</a>
                {/* <BrowserRouter>
                    <Link className="dropdown-item" to="/auth/login/">Войти</Link>
                     </BrowserRouter>
                <BrowserRouter>
                    <Link className="dropdown-item" to="/auth/register/">Зарегистрироваться</Link> 
                    </BrowserRouter> */}
            </div>
        </div>
    }



    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='header-user-block col-8 col-md-3 nopadding '>
            {this.logginedOrNot(this.props.AuthInfo.AuthSuccess)}

        </div>
    }
}
// </helloprops>