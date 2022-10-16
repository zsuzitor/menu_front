import React, { useState, useEffect } from 'react';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import { HeaderUserMenu } from '../HeaderUserMenu/HeaderUserMenu';
import { IAuthState } from '../../../Models/Models/AuthState';
import { AppItem } from '../../../Models/Models/Poco/AppItem';

require('./HeaderMain.css');



export interface IHeaderMainProps {
    Apps: AppItem[];
    AuthInfo: IAuthState;
}

const HeaderMain = (props: IHeaderMainProps) => {

    const [showMenu, setShowMenu] = useState(false);

    let menuClass = 'main-header-menu-hide';
    if (showMenu) {
        menuClass = 'main-header-menu-show';
    }

    return <div className='main-header'>
        <div className={'main-header-menu ' + menuClass}>
            <a href="/menu">Home</a>
            <hr />
            {props.Apps.map(x => <div key={x.Name} className='main-header-menu-line'>
                <a href={x.Path}>{x.Name}</a></div>)}
        </div>
        <div className='main-header-inner'>
            <div className='main-header-row'>
                <HeaderLogo
                    ShowMenu={() => setShowMenu(!showMenu)}
                    MenuShowed={showMenu}
                />
                {/* <div className='d-none d-md-inline-block col-md-7'></div> */}
                <HeaderUserMenu AuthInfo={props.AuthInfo} />
            </div>
        </div>
    </div>
}

export default HeaderMain;

