import * as React from "react";
import { AppItem } from "../../../../Models/Models/Poco/AppItem";
// import { Switch, Route } from "react-router-dom";
import AppList from "../AppList/AppList";



export interface IMenuMainProps {
    Apps: AppItem[];
}

const MenuMain = (props: IMenuMainProps) => {

    return <AppList
        Apps={props.Apps} />
   
}

export default MenuMain;
