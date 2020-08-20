
import React from 'react'
import BodyCardsListMain from './CardsList/BodyCardsListMain.jsx'
import BodyOneCardDetailMain from './OneCardDetail/BodyOneCardDetailMain.jsx'
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
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        // return <BodyCardsListMain />
        return <Router>
            <Switch>
                <Route exact path="/" component={BodyCardsListMain} />
                <Route path="/detail" component={BodyOneCardDetailMain} />
                {/* <Route component={NotFound} /> */}
            </Switch>
        </Router>
    }
}

// module.exports = MainHeader;