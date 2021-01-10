/// <reference path="../../typings/globals.d.ts" />

import * as React from "react";

import { IAuthState } from './_ComponentsLink/Models/AuthState';

import { HeaderMain } from './Header/HeaderMain';
import { BodyMain } from './Body/BodyMain';
import { FooterMain } from './Footer/FooterMain';
import { MainAlertAbsolute } from './Alerts/MainAlertAbsolute';

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { AlertData, AlertDataStored } from "./_ComponentsLink/Models/AlertData";



export interface MainComponentProps {
}

export interface IMainComponentState {
    Auth: IAuthState;
    AbsoluteAlerts: AlertDataStored[];
}





export class MainComponent extends React.Component<MainComponentProps, IMainComponentState> {

    constructor(props: MainComponentProps) {
        super(props);

        let localState: IMainComponentState = {
            Auth: {
                AuthSuccess: false,
                User: null
            },
            AbsoluteAlerts: [],
        };

        this.state = localState;

        this.AddMainALert = this.AddMainALert.bind(this);
    }

    AddMainALert(alert: AlertData) {
        let storedAlert = new AlertDataStored();
        storedAlert.FillByAlertData(alert);

        let newState = { ...this.state };
        let maxKey = Math.max.apply(Math, newState.AbsoluteAlerts.map(function (el) { return el.Key; }));
        storedAlert.Key = maxKey + 1;
        this.setState(newState);
    }


    componentDidMount() {
        //TODO запрос для определения?
        let auth: IAuthState = {
            AuthSuccess: false,
            User: {
                Name: "Тестовое имя",
                Image: G_EmptyImagePath
            }
        };

        this.setState({
            Auth: auth,
            AbsoluteAlerts:[],
        });

    }

    
    render() {
        return <div>
            <BrowserRouter>
                <HeaderMain AuthInfo={this.state.Auth} />
                <BodyMain />
                <FooterMain />
                <MainAlertAbsolute Data={this.state.AbsoluteAlerts} />
            </BrowserRouter>
        </div>
    }
}
