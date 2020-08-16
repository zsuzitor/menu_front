// var React = require('react');
import React from 'react'


//export default 
export default class HeaderUserMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserName: 'Имя',
            UserImage: '',
            IsLoggined: true,
        };
    }

    componentDidMount() {
        //TODO стучимся в апи, устанавливаем стейт
    }


    userImage(img) {
        let path = img;
        if (!img) {
            path = '../../images/user_empty_image.png';
            // return <img className='header-user-img' src='../../images/user_empty_image.png'></img>
        }

        return <img className='header-user-img' src={path}></img>
    }

    logginedOrNot(loggined) {
        if (loggined) {
            return this.logginedUser();
        }
        else {
            return this.notLogginedUser();
        }
    }

    logginedUser() {
        return <div className='header-user-block-inner'><div className='dropdown-toggle header-user-dropdown' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className='header-user-name-text d-inline-block'>Имя</span>
            <span className='d-inline-block header-user-img'>
                {this.userImage(this.state.UserImage)}
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
                <a className="dropdown-item" href="#">Войти</a>
                <a className="dropdown-item" href="#">Зарегистрироваться</a>
            </div>
        </div>
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='header-user-block col-8 col-md-3 nopadding '>
            {this.logginedOrNot(this.state.IsLoggined)}

        </div>
    }
}

// module.exports = HeaderUserMenu;