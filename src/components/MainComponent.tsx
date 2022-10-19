/// <reference path="../../typings/globals.d.ts" />

import React, { useEffect, useState } from "react";

import { IAuthState, IAuthUserState } from '../Models/Models/AuthState';

import HeaderMain from './Header/HeaderMain/HeaderMain';
// import { BodyMain } from './Body/BodyMain';
import FooterMain from './Footer/FooterMain/FooterMain';
import { MainAlertAbsolute } from './Alerts/MainAlertAbsolute';

import { BrowserRouter } from "react-router-dom";
import { AlertData, AlertDataStored } from "../Models/Models/AlertData";
import AppRouter from "./AppRouter";
import { MainErrorObjectBack } from "../Models/BackModel/ErrorBack";
import { UserShortBack } from "../Models/BackModel/UserShort";
import { AppItem } from "../Models/Models/Poco/AppItem";



export interface MainComponentProps {
}

export interface IMainComponentState {
    Auth: IAuthState;
    AbsoluteAlerts: AlertDataStored[];
    MaxIdMainAlert: number;
}






let MainComponent = (props: MainComponentProps) => {// extends React.Component<MainComponentProps, IMainComponentState> {

    let initState: IMainComponentState = {
        Auth: {
            AuthSuccess: false,
            User: null,
        },
        AbsoluteAlerts: [],
        MaxIdMainAlert: 0,
    };


    const [localState, setLocalState] = useState(initState);

    //todo есть способ это закешить реакт хуком
    const ApplacationsList: AppItem[] = [
        // new AppItem({ Logo: G_EmptyImagePath, Name: "MenuApp", Path: "/menu-app" }),
        // new AppItem({ Logo: G_EmptyImagePath, Name: "Dict", Path: "/words-cards-app" }),
        // new AppItem({ Logo: G_EmptyImagePath, Name: "TimeBooking", Path: "/menu-app" }),
        new AppItem({ Logo: "/images/poker_logo.jpg", Name: "PlaningPoker", Path: "/planing-poker" }),
        new AppItem({ Logo: "/images/code_review_logo.png", Name: "Code review", Path: "/code-review/" }),
    ];


    useEffect(() => {
        window.G_AddAbsoluteAlertToState = AddMainALert;
        // let thisRef = this;
        // window.addEventListener("logout", function (e) { thisRef.LogOutHandler() });
        window.addEventListener("tokens_was_refreshed", function (e) { ReloadUserState() });


        let authStoredJson = localStorage.getItem('header_auth');
        let authStored = JSON.parse(authStoredJson) as IAuthUserState;
        if (authStoredJson && authStored) {
            let auth: IAuthState = {
                AuthSuccess: true,
                User: {
                    Name: authStored.Name,
                    Image: authStored.Image,
                    Id: authStored.Id,
                    Email: authStored.Email,
                }
            };

            setLocalState(prevState => {
                let newState = { ...prevState };
                newState.Auth = auth;
                newState.AbsoluteAlerts = [];
                return newState;
            });

            return;
        }

        if (window.location.pathname.startsWith('/menu/auth/')) {
            return;
        }

        ReloadUserState();



    }, [])


    const LogOutHandler = () => {
        let auth: IAuthState = {
            AuthSuccess: false,
            User: null,
        };

        // localStorage.setItem('header_auth', JSON.stringify(auth));
        localStorage.removeItem("header_auth");

        setLocalState(prevState => {
            let newState = { ...prevState };
            newState.Auth = auth;
            newState.AbsoluteAlerts = [];
            return newState;
        });
    }

    const ReloadUserState = () => {
        let success = (error: MainErrorObjectBack, data: UserShortBack) => {
            if (error) {
                return;
            }

            let auth: IAuthState = {
                AuthSuccess: true,
                User: {
                    Name: data.name,
                    Image: data.main_image_path,
                    Email: data.email,
                    Id: data.id,
                }
            };

            localStorage.setItem('header_auth', JSON.stringify(auth.User));
            setLocalState(prevState => {
                let newState = { ...prevState };
                newState.Auth = auth;
                newState.AbsoluteAlerts = [];

                return newState;
            });

        }

        window.G_UsersController.GetShortestUserInfo(success);
    }

    const AddMainALert = (alert: AlertData) => {
        // console.log('1-AddMainALert');
        let storedAlert = new AlertDataStored();
        storedAlert.FillByAlertData(alert);


        setLocalState(prevState => {
            let newState = { ...prevState };

            storedAlert.Key = ++newState.MaxIdMainAlert;
            newState.AbsoluteAlerts.push(storedAlert);
            if (alert.Timeout) {
                setTimeout(() => {
                    RemoveMainALert(storedAlert.Key);
                }, alert.Timeout);
            }
            return newState;
        });
    }


    const RemoveMainALert = (alertId: number) => {

        setLocalState(prevState => {
            let newState = { ...prevState };
            for (let i = 0; i < newState.AbsoluteAlerts.length; ++i) {
                if (newState.AbsoluteAlerts[i].Key == alertId) {
                    newState.AbsoluteAlerts.splice(i, 1);
                    if (newState.AbsoluteAlerts.length == 0) {
                        newState.MaxIdMainAlert = 0;
                    }
                    // this.setState(newState);
                    break;
                }
            }

            return newState;
        });


    }


    return <div>
        {/* <React.StrictMode> */}
        <BrowserRouter>
            <HeaderMain AuthInfo={localState.Auth} Apps={ApplacationsList} />
            {/* <BodyMain /> */}
            <AppRouter AuthInfo={localState.Auth} Apps={ApplacationsList} />
            <FooterMain />
            <MainAlertAbsolute Data={localState.AbsoluteAlerts} RemoveALert={RemoveMainALert} />
        </BrowserRouter>
        {/* </React.StrictMode> */}
    </div>

}


export default MainComponent;
