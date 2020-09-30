
import React from 'react'
import HeaderMain from './Header/HeaderMain.jsx'
import BodyMain from './Body/BodyMain.jsx'
import FooterMain from './Footer/FooterMain.jsx'


export default class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.Auth = {};
        this.state.Auth.AuthSuccess = false;
        this.state.Auth.User = null;
    }


    componentDidMount() {
        //TODO запрос для определения?
        var auth = {};
        auth.AuthSuccess = false;
        auth.User = {};
        auth.User.Name = "Тестовое имя";
        auth.User.Image = "../../images/user_empty_image.png";

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