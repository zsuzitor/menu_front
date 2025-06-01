import * as React from "react";
import MainAuth from '../Body/Auth/MainAuth/MainAuth';


import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
// import { BodyMain } from "./Body/BodyMain";
import MenuMain from "../Body/Menu/MenuMain/MenuMain";
import Recovery from "../Body/Auth/Recovery/Recovery";
import { AppItem } from "../../Models/Entity/AppItem";
import PersonSettings from "../Body/Person/PersonSettings/PersonSettings";
import TaskManagementMain from "../../Apps/TaskManagementApp/Components/TaskManagementMain/TaskManagementMain";
import { MenuAppMain } from "../../Apps/MenuApp/Components/MenuAppMain";
import { WordsCardsAppMain } from "../../Apps/WordsCardsApp/Components/WordsCardsAppMain";
import PlaningPokerMain from "../../Apps/PlaningPoker/Components/PlaningPokerMain";
import VaultMain from "../../Apps/Vault/Components/VaultMain/VaultMain";
import { IAuthState } from "../../Models/Entity/AuthState";


require('./AppRouter.css');

class AppRouterProps {
    AuthInfo: IAuthState;
    Apps: AppItem[];

}

const AppRouter = (props: AppRouterProps) => {
    return <div className="all-apps-wrapper">
        <Routes>
            <Route path="/menu" element={<MenuMain Apps={props.Apps} />} />
            <Route path="/menu-app/*" element={<MenuAppMain />} />
            <Route path="/words-cards-app/*" element={<WordsCardsAppMain />} />
            <Route path="/planing-poker/*" element={<PlaningPokerMain />} />
            <Route path="/task-management/*" element={<TaskManagementMain />} />

            <Route path="/menu/auth/login/*" element={<MainAuth LoginPage={true} />} />
            <Route path="/menu/auth/register/*" element={<MainAuth LoginPage={false} />} />
            <Route path="/menu/auth/password-recovery/*" element={<Recovery />} />
            <Route path="/menu/person-settings/*" element={<PersonSettings />} />
            <Route path="/vault-app/*" element={<VaultMain />} />



            {/* <Route component={NotFound} /> */}
        </Routes>
    </div>
}

export default AppRouter;