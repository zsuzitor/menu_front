import * as React from "react";
// var HeaderLogo = require('./HeaderLogo.jsx');
import {HeaderLogo} from './HeaderLogo';
import {HeaderUserMenu} from './HeaderUserMenu';

export interface IHeaderMainProps {
     AuthInfo: IAuthState;
    // AuthInfo: any;
    // children: JSX.Element;//указав так, можно рендерить компонент вкладывая в него другой <HelloComponent name="foo"><h1>Hello World</h1></HelloComponent>
}

export class HeaderMain extends React.Component<IHeaderMainProps, {}> {

    constructor(props:IHeaderMainProps) {
        super(props);
    }
    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;

        return <div className='main-header'>
            <div className='main-header-inner container'>
                <div className='main-header-row row'>
                    <HeaderLogo />
                    <div className='d-none d-md-inline-block col-md-7'></div>
                    <HeaderUserMenu AuthInfo={this.props.AuthInfo}/>
                </div>
            </div>
        </div>
    }
}
// </helloprops>