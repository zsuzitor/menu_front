import * as React from "react";

require('./HeaderLogo.css');



export interface IHeaderLogoProps {
    ShowMenu: () => void;
}

export class HeaderLogo extends React.Component<IHeaderLogoProps, {}> {

    constructor(props: IHeaderLogoProps) {
        super(props);
    }

    render() {
        return <div className='main-header-logo'>
            <div className="main-header-logo-text"
                onClick={() => this.props.ShowMenu()}
            >M</div>

            {/* <a href="/menu" className="main-header-logo-a">
                <div className="main-header-logo-text">M</div>
            </a> */}
        </div>
    }
}
