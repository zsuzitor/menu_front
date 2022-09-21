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


    // return <MainAuth login={true}/>
    // return <BodyCardsListMain />
    //TODO попробовать достучаться незалогиненным по ссылкам и поправить то что вылезет
    // return <BodyCardsListMain/> 
    return <AppList
        Apps={props.Apps} />
    // <Switch>
    //     <Route exact path="/menu" component={AppList} />

    // </Switch>
}

export default MenuMain;
