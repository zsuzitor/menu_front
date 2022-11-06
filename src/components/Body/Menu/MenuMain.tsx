import * as React from "react";
import { AppItem } from "../../../Models/Models/Poco/AppItem";
// import { Switch, Route } from "react-router-dom";
import AppList from "./AppList";

// export interface IHelloProps {
//     compiler: string;
//     framework: string;
// }

export interface IMenuMainProps {
    Apps: AppItem[];
}

const MenuMain = (props: IMenuMainProps) => {

    return <AppList
        Apps={props.Apps} />
   
}

export default MenuMain;
