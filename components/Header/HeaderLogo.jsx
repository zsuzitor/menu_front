// var React = require('react');
import React from 'react'

//export default 
export default class HeaderLogo extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-header-logo nopadding col-4  col-md-2'>
            <img className='main-header-logo-img' src="../../images/Header_logo.jpg" alt="menu" />
        </div>
    }
}

//  module.exports = HeaderLogo;
//  export default HeaderLogo;