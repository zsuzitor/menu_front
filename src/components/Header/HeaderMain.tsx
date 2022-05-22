import * as React from "react";
import { HeaderLogo } from './HeaderLogo';
import { HeaderUserMenu } from './HeaderUserMenu';
import { IAuthState } from '../../Models/Models/AuthState';

export interface IHeaderMainProps {
    AuthInfo: IAuthState;
}

export class HeaderMain extends React.Component<IHeaderMainProps, {}> {

    constructor(props: IHeaderMainProps) {
        super(props);
    }
    render() {

        return <div className='main-header'>
            <div className='main-header-inner container'>
                <div className='main-header-row row'>
                    <HeaderLogo />
                    <div className='d-none d-md-inline-block col-md-7'></div>
                    <HeaderUserMenu AuthInfo={this.props.AuthInfo} />
                </div>
            </div>
        </div>
    }
}
