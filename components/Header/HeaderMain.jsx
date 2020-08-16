// var React = require('react');
import React from 'react'
// var HeaderLogo = require('./HeaderLogo.jsx');
import HeaderLogo from './HeaderLogo.jsx'
import MainUserMenu from './HeaderUserMenu.jsx'

//export default 
export default class MainHeader extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
    }

    // onTextChanged(e){
    //     var text = e.target.value.trim();   // удаляем пробелы
    //     this.props.filter(text); // передаем введенный текст в родительский компонент
    // }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;

        return <div className='main-header'>
            <div className='main-header-inner container'>
                <div className='main-header-row row'>
                    <HeaderLogo />
                    <div className='d-none d-md-inline-block col-md-7'></div>
                    <MainUserMenu />
                </div>
            </div>
        </div>
    }
}

// module.exports = MainHeader;