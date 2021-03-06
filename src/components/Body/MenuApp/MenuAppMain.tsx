import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { IHelloProps } from "../Menu/MenuMain";
import { BodyCardsListMain } from "./CardsList/BodyCardsListMain";
import { OneCardDetailMain } from "./OneCardDetail/OneCardDetailMain";


export class MenuAppMain extends React.Component<IHelloProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        // return <BodyCardsListMain/> 
        return <Switch>
            <Route exact path="/menu-app" component={BodyCardsListMain} />
            <Route path="/menu-app/detail" component={OneCardDetailMain} />

            {/* <Route path="/menu/auth/login" render={(props) => (
                <MainAuth {...props} LoginPage={true} />
            )} />
            <Route path="/menu/auth/register" render={(props) => (
                <MainAuth {...props} LoginPage={false} />
            )} /> */}
            {/* <Route component={NotFound} /> */}
        </Switch>

    }
}
