import * as React from "react";

require('./HeaderLogo.css');



export interface IHeaderLogoProps {
    ShowMenu: () => void;
    MenuShowed: boolean;
}

const HeaderLogo = (props: IHeaderLogoProps) => {

    let logoBurgerClass = 'main-header-logo-burger';
    let burgerLineClass = 'header-burger-line';
    if (props.MenuShowed) {
        logoBurgerClass += ' main-header-logo-burger-opened';
        burgerLineClass += ' header-burger-line-opened';
    }
    else {
        burgerLineClass += ' header-burger-line-closed';

    }



    return <div className='main-header-logo'>
        {/* <div className="main-header-logo-text"
                onClick={() => this.props.ShowMenu()}
            >M</div> */}
        <div className={logoBurgerClass}
            onClick={() => props.ShowMenu()}
        >
            <div className={burgerLineClass}></div>
            <div className={burgerLineClass}></div>
            <div className={burgerLineClass}></div>
        </div>

        {/* <a href="/menu" className="main-header-logo-a">
                <div className="main-header-logo-text">M</div>
            </a> */}
    </div>
}


export default HeaderLogo;