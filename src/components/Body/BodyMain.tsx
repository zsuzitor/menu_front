import * as React from "react";
import { BodyCardsListMain } from './CardsList/BodyCardsListMain';
import { OneCardDetailMain } from './OneCardDetail/OneCardDetailMain';
import { MainAuth } from './Auth/MainAuth';
// export interface IHeaderLogoProps {
// }

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";



export class BodyMain extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        // return <BodyCardsListMain/> 
        return <Switch>
            <Route exact path="/menu" component={BodyCardsListMain} />
            <Route path="/menu/detail" component={OneCardDetailMain} />

            <Route path="/menu/auth/login" render={(props) => (
                <MainAuth {...props} LoginPage={true} />
            )} />
            <Route path="/menu/auth/register" render={(props) => (
                <MainAuth {...props} LoginPage={false} />
            )} />
            {/* <Route component={NotFound} /> */}
        </Switch>

    }
}
// </helloprops>