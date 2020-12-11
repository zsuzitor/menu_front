import * as React from "react";
import { BodyCardsListMain } from './CardsList/BodyCardsListMain';
import { BodyOneCardDetailMain } from './OneCardDetail/BodyOneCardDetailMain';
import { MainAuth } from './Auth/MainAuth';
// export interface IHeaderLogoProps {
// }

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";



export class BodyMain extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        // return <BodyCardsListMain/> 
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
// </helloprops>