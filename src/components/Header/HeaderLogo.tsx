import * as React from "react";

export interface IHeaderLogoProps {
}

export class HeaderLogo extends React.Component<IHeaderLogoProps, {}> {

    constructor(props: IHeaderLogoProps) {
        super(props);
    }

    render() {
        return <div className='main-header-logo nopadding col-4  col-md-2'>
            <a href="/menu">
                <img className='main-header-logo-img' src={G_PathToBaseImages + "Header_logo.png"} alt="menu" />
            </a>
        </div>
    }
}
