import * as React from "react";
import { BodyCardsListMain } from './Body/MenuApp/CardsList/BodyCardsListMain';
import { OneCardDetailMain } from './Body/MenuApp/OneCardDetail/OneCardDetailMain';
import { MainAuth } from './Body/Auth/MainAuth';
// export interface IHeaderLogoProps {
// }

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
// import { BodyMain } from "./Body/BodyMain";
import { MenuMain } from "./Body/Menu/MenuMain";
import { MenuAppMain } from "./Body/MenuApp/MenuAppMain";
import { WordsCardsAppMain } from "./Body/WordsCardsApp/WordsCardsAppMain";
import PlaningPokerMain from "./Body/PlaningPoker/PlaningPokerMain";
import { IAuthState } from "./_ComponentsLink/Models/AuthState";

// 

class AppRouterProps {
    AuthInfo: IAuthState;
}

export class AppRouter extends React.Component<AppRouterProps, {}> {

    constructor(props: AppRouterProps) {
        super(props);
    }

    render() {
        // return <MainAuth login={true}/>
        // return <BodyCardsListMain />
        //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
        // return <BodyCardsListMain/> 
        // let props1 = this.props;
        return <Routes>
            <Route path="/menu" element={<MenuMain />} />
            <Route path="/menu-app/*" element={<MenuAppMain />} />
            <Route path="/words-cards-app/*" element={<WordsCardsAppMain />} />
            <Route path="/planing-poker/*" element={<PlaningPokerMain AuthInfo={this.props.AuthInfo} />} />

            <Route path="/menu/auth/login/*" element={<MainAuth LoginPage={true} />} />
            <Route path="/menu/auth/register/*" element={<MainAuth LoginPage={false} />} />
            {/* <Route component={NotFound} /> */}
        </Routes>

    }
}
// </helloprops>