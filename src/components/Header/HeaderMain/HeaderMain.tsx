import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Link,
    BrowserRouter
} from "react-router-dom";


import HeaderLogo from '../HeaderLogo/HeaderLogo';
import HeaderUserMenu from '../HeaderUserMenu/HeaderUserMenu';
import { AppItem } from '../../../Models/Entity/AppItem';
import { AppState } from '../../../Models/Entity/State/AppState';

require('./HeaderMain.css');



interface HeaderMainOwnProps {
    Apps: AppItem[];

}

interface HeaderMainStateToProps {
}

interface HeaderMainDispatchToProps {

}

interface IHeaderMainProps extends HeaderMainStateToProps, HeaderMainOwnProps, HeaderMainDispatchToProps {
}




const HeaderMain = (props: IHeaderMainProps) => {

    const [showMenu, setShowMenu] = useState(false);

    let menuClass = 'main-header-menu-hide';
    if (showMenu) {
        menuClass = 'main-header-menu-show';
    }

    return <div className='main-header'>
        <div className={'main-header-menu ' + menuClass}>

            <div key='menu-home' className='main-header-menu-line'
                onClick={() => setShowMenu(false)}>
                {/* <a href="/menu">Home</a> */}
                <Link
                    to="/menu">Home</Link>
            </div>
            <hr />
            {props.Apps.map(x => <div key={x.Name} className='main-header-menu-line'
                onClick={() => setShowMenu(false)}>
                {/* <a href={x.Path}>{x.Name}</a> */}
                <Link
                    to={x.Path}>{x.Name}</Link></div>)}
        </div>
        <div className='main-header-inner'>
            <div className='main-header-row'>
                <HeaderLogo
                    ShowMenu={() => setShowMenu(!showMenu)}
                    MenuShowed={showMenu}
                />
                {/* <div className='d-none d-md-inline-block col-md-7'></div> */}
                <HeaderUserMenu />
            </div>
        </div>
    </div>
}




const mapStateToProps = (state: AppState, ownProps: HeaderMainOwnProps) => {
    let res = {} as HeaderMainStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: HeaderMainOwnProps) => {
    let res = {} as HeaderMainDispatchToProps;


    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(HeaderMain);