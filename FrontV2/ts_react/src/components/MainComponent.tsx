import * as React from "react";

import {IAuthState} from './_ComponentsLink/AuthState';

import {HeaderMain} from './Header/HeaderMain';
import {BodyMain} from './Body/BodyMain';
import {FooterMain} from './Footer/FooterMain';

// import css from '../../style/main.css'
require('../../style/main.css');
require('../../style/auth.css');
require('../../style/body.css');
require('../../style/footer.css');
require('../../style/header.css');

export interface MainComponentProps {
}

export interface IMainComponentState {
    Auth: IAuthState;
}





export class MainComponent extends React.Component<MainComponentProps, IMainComponentState> {

    constructor(props: MainComponentProps) {
        super(props);
        let localState: IMainComponentState = {
            Auth: {
                AuthSuccess: false,
                User: null
            }
        };

        this.state = localState;
    }

    componentDidMount() {
        //TODO запрос для определения?
        let auth: IAuthState = {
            AuthSuccess: false,
            User: {
                Name: "Тестовое имя",
                Image: "../../images/user_empty_image.png"
            }
        };

        this.setState({
            Auth: auth,
            // FollowedCards: followed,
            // NotFollowedCards: notFollowed,
        });

    }


    render() {
        return <div>
            <HeaderMain AuthInfo={this.state.Auth} />
            <BodyMain />
            <FooterMain />
        </div>
    }
}
// </helloprops>