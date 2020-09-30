
import React from 'react'
import BodyCardsListMain from './CardsList/BodyCardsListMain.jsx'
import BodyOneCardDetailMain from './OneCardDetail/BodyOneCardDetailMain.jsx'
import MainAuth from './Auth/MainAuth.jsx'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

//export default 
export default class BodyMain extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);
    }


  


    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        return <Router>
            <Switch>
                <Route exact path="/" component={BodyCardsListMain} />
                <Route path="/detail" component={BodyOneCardDetailMain} />
                <Route path="/auth/login" component={MainAuth} login={true} />
                <Route path="/auth/register" component={MainAuth} login={false} />
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Router>
    }
}

// module.exports = MainHeader;