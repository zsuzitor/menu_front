/// <reference path="../../typings/globals.d.ts" />

import * as React from "react";

import { IAuthState, IAuthUserState } from './_ComponentsLink/Models/AuthState';

import { HeaderMain } from './Header/HeaderMain';
// import { BodyMain } from './Body/BodyMain';
import { FooterMain } from './Footer/FooterMain';
import { MainAlertAbsolute } from './Alerts/MainAlertAbsolute';

import { BrowserRouter } from "react-router-dom";
import { AlertData, AlertDataStored } from "./_ComponentsLink/Models/AlertData";
import { AppRouter } from "./AppRouter";
import { MainErrorObjectBack } from "./_ComponentsLink/BackModel/ErrorBack";
import { UserShortBack } from "./_ComponentsLink/BackModel/UserShort";



export interface MainComponentProps {
}

export interface IMainComponentState {
    Auth: IAuthState;
    AbsoluteAlerts: AlertDataStored[];
    MaxIdMainAlert: number;
}





export class MainComponent extends React.Component<MainComponentProps, IMainComponentState> {

    constructor(props: MainComponentProps) {
        super(props);

        let localState: IMainComponentState = {
            Auth: {
                AuthSuccess: false,
                User: null,
            },
            AbsoluteAlerts: [],
            MaxIdMainAlert: 0,
        };

        this.state = localState;

        this.AddMainALert = this.AddMainALert.bind(this);
        this.RemoveMainALert = this.RemoveMainALert.bind(this);
        this.LogOutHandler = this.LogOutHandler.bind(this);

        window.G_AddAbsoluteAlertToState = this.AddMainALert;
        let thisRef = this;
        // window.addEventListener("logout", function (e) { thisRef.LogOutHandler() });

    }

    LogOutHandler() {
        let auth: IAuthState = {
            AuthSuccess: false,
            User: null,
        };

        // localStorage.setItem('header_auth', JSON.stringify(auth));
        localStorage.removeItem("header_auth");

        this.setState({
            Auth: auth,
            AbsoluteAlerts: [],
        });
    }

    AddMainALert(alert: AlertData) {
        // console.log('1-AddMainALert');
        let storedAlert = new AlertDataStored();
        storedAlert.FillByAlertData(alert);

        let newState = { ...this.state };
        // let maxKey = Math.max.apply(Math, newState.AbsoluteAlerts.map(function (el) { return el.Key; }));
        // if ((!maxKey && maxKey !== 0) || maxKey < 0) {
        //     maxKey = 0;
        // }
        // else {
        //     maxKey++;
        // }
        storedAlert.Key = ++newState.MaxIdMainAlert;
        newState.AbsoluteAlerts.push(storedAlert);
        this.setState(newState);
    }


    RemoveMainALert(alertId: number) {
        let newState = { ...this.state };
        // if (newState.AbsoluteAlerts.length == 0) {
        //     newState.MaxIdMainAlert = 0;
        // }

        for (let i = 0; i < newState.AbsoluteAlerts.length; ++i) {
            if (newState.AbsoluteAlerts[i].Key == alertId) {
                newState.AbsoluteAlerts.splice(i, 1);
                if (newState.AbsoluteAlerts.length == 0) {
                    newState.MaxIdMainAlert = 0;
                }
                this.setState(newState);
                return;
            }
        }


    }

    async componentDidMount() {

        let authStoredJson = localStorage.getItem('header_auth');
        let authStored = JSON.parse(authStoredJson) as IAuthUserState;
        if (authStoredJson && authStored) {
            let auth: IAuthState = {
                AuthSuccess: true,
                User: {
                    Name: authStored.Name,
                    Image: authStored.Image,
                }
            };

            this.setState({
                Auth: auth,
                AbsoluteAlerts: [],
            });

            return;
        }

        if (window.location.pathname.startsWith('/menu/auth/')) {
            return;
        }

        let success = (error: MainErrorObjectBack, data: UserShortBack) => {
            if (error) {
                return;
            }

            let auth: IAuthState = {
                AuthSuccess: true,
                User: {
                    Name: data.name,
                    Image: data.main_image_path
                }
            };

            localStorage.setItem('header_auth', JSON.stringify(auth.User));
            this.setState({
                Auth: auth,
                AbsoluteAlerts: [],
            });

        }

        window.G_UsersController.GetShortestUSerInfo(success);
       

        //TODO запрос для определения?


    }


    render() {
        return <div>
            <BrowserRouter>
                <HeaderMain AuthInfo={this.state.Auth} />
                {/* <BodyMain /> */}
                <AppRouter />
                <FooterMain />
                <MainAlertAbsolute Data={this.state.AbsoluteAlerts} RemoveALert={this.RemoveMainALert} />
            </BrowserRouter>
        </div>
    }
}
